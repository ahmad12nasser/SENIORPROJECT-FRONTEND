import { client } from './../../../models/client';
import { Component } from '@angular/core';
import { ClientInfoService } from '../../../services/client/settings/clientInfo.service';
import { EditClientInfoService } from '../../../services/client/settings/editClientInfo.service';
import { LoginService } from '../../../services/authentication/login.service';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-client-settings',
  templateUrl: './client-settings.component.html',
  styleUrl: './client-settings.component.css'
})
export class ClientSettingsComponent {
  client: client[] = [];
  editingClient: any = {}; // New property to store editing client data
  editMode: boolean = false; // Flag to toggle edit mode
  selectedFile: File | null = null;
  isAuthenticated: boolean | null = null;
  changeImageMode: boolean = false;

  constructor(
    private clientInfoService: ClientInfoService,
    private editClientInfoService: EditClientInfoService,
    private authService: AuthService,
    private loginService: LoginService
  ) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }


  ngOnInit() {
    const client_id = this.loginService.getLoggedInUserId() ?? 0;
    this.getClientInfo(client_id);
  }
  getClientInfo(client_id: number) {
    this.clientInfoService.getClientInfo(client_id).subscribe({
      next: (data) => {
        this.client = data;
        this.prepareImages();
        console.log('Successfully fetched client info:', data);
      },
      error: (error) => {
        console.error('Error fetching client info:', error);
      }
    });
  }
  // Function to enable edit mode for a specific client
  editClient(client: any) {
    this.editingClient = { ...client };
    this.editMode = true;
  }
  changeImageModdeOn(Client: any) {
    this.editingClient = { ...Client };
    this.changeImageMode = true;
  }
  saveClient() {
    const formData = new FormData();

    formData.append('id', this.editingClient.id);
    formData.append('firstName', this.editingClient.firstName);
    formData.append('lastName', this.editingClient.lastName);
    formData.append('email', this.editingClient.email);
    formData.append('mobile', this.editingClient.mobile);
    formData.append('location', this.editingClient.location);
    formData.append('age', this.editingClient.age);
    formData.append('description', this.editingClient.description);

    this.editClientInfoService.updateClientInfo(formData).subscribe({
      next: (response) => {
        console.log('Client info updated successfully:', response);
        this.prepareImages();
        this.editingClient = {};
        this.editMode = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating client info:', error);
      }
    });
  }
  changeImage() {
    const formData = new FormData();
    formData.append('client_id', this.editingClient.id);
    if (this.selectedFile) {
      formData.append('changedImage', this.selectedFile);
    }
    this.editClientInfoService.updateClientImage(formData).subscribe({
      next: (response) => {
        console.log('Freelancer image updated successfully:', response);
        this.prepareImages();
        this.editingClient = {};
        this.changeImageMode = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating freelancer image:', error);
      }
    });
  }

  prepareImages() {
    for (const client of this.client) {
      client.imageUrl = `data:image/png;base64,` + client.profileImg;  // Construct data URL with PNG format
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // hay el function ta 7atta tae3mol cancel lel edit
  cancelEdit() {
    this.editMode = false;
    this.editingClient = {}; // Clear lal data
  }
  cancelChangeImage() {
    this.editingClient = {};
    this.changeImageMode = false;
  }
  logout() {
    this.authService.logout();
    this.loginService.logout();
  }
}
