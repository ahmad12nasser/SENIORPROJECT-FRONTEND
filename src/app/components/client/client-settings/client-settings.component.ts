import { client } from './../../../models/client';
import { Component } from '@angular/core';
import { ClientInfoService } from '../../../services/client/settings/clientInfo.service';
import { EditClientInfoService } from '../../../services/client/settings/editClientInfo.service';
import { LoginService } from '../../../services/authentication/login.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { Locations } from '../../../models/locations';

@Component({
  selector: 'app-client-settings',
  templateUrl: './client-settings.component.html',
  styleUrl: './client-settings.component.css'
})
export class ClientSettingsComponent {
  client: client[] = [];
  locationList = new Locations();
  editingClient: any = {}; // New property to store editing client data
  editMode: boolean = false; // Flag to toggle edit mode
  selectedFile: File | null = null;
  isAuthenticated: boolean | null = null;
  selectedLocation: string = '';
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
      },
      error: (error) => {
      }
    });
  }
  // Function to enable edit mode for a specific client
  editClient(client: any) {
    this.editingClient = { ...client };
    this.editMode = true;
    // Remove the 'invisible' class from the 'edit-form' element
    const profile = document.querySelector('.profile');
    if (profile) {
      profile.classList.add('d-none');
    }
  }


  saveClient() {
    const formData = new FormData();
    if(this.selectedLocation === '') {
      this.selectedLocation = this.editingClient.location;
    }
    formData.append('id', this.editingClient.id);
    formData.append('firstName', this.editingClient.firstName);
    formData.append('lastName', this.editingClient.lastName);
    formData.append('email', this.editingClient.email);
    formData.append('mobile', this.editingClient.mobile);
    formData.append('location', this.selectedLocation);
    formData.append('age', this.editingClient.age);
    formData.append('description', this.editingClient.description);

    this.editClientInfoService.updateClientInfo(formData).subscribe({
      next: (response) => {
        alert('Client info updated successfully');
        this.prepareImages();
        this.editingClient = {};
        this.editMode = false;
        window.location.reload();
      },
      error: (error) => {
        alert('Error updating client info');
      }
    });
  }
  changeImage(client_id: number) {
    const formData = new FormData();
    formData.append('client_id', client_id.toString());
    if (this.selectedFile) {
      formData.append('changedImage', this.selectedFile);
    }
    this.editClientInfoService.updateClientImage(formData).subscribe({
      next: (response) => {
        alert('Client image updated successfully');
        this.prepareImages();
        this.editingClient = {};
        window.location.reload();
      },
      error: (error) => {
        alert('Error updating client image');
      }
    });
  }

  prepareImages() {
    for (const client of this.client) {
      client.imageUrl = `data:image/jpg;base64,` + client.profileImg;
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
    const profile = document.querySelector('.profile');
    if (profile) {
      profile.classList.remove('d-none');
    }
  }
  logout() {
    this.authService.logout();
    this.loginService.logout();
  }
}
