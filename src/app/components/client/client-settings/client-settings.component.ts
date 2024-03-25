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

  constructor(
    private clientInfoService: ClientInfoService,
    private editClientInfoService: EditClientInfoService,
    private authService: AuthService,
    private loginService: LoginService
  ) { }

  client: any[] = [];
  editingClient: any = {}; // New property to store editing client data
  editMode: boolean = false; // Flag to toggle edit mode

  ngOnInit() {
    //temp client_id for testing
    const client_id = 1;
    // const client_id = localStorage.getItem('client_id');
    this.getClientInfo(client_id);
  }
  getClientInfo(client_id: number) {
    this.clientInfoService.getClientInfo(client_id).subscribe({
      next: (data) => {
        this.client = data;
        console.log('Successfully fetched client info:', data);
      },
      error: (error) => {
        console.error('Error fetching client info:', error);
      }
    });
  }
  // Function to enable edit mode for a specific client
  editClient(client: any) {
    this.editingClient = { ...client }; // Make a copy of the client for editing
    this.editMode = true; // Set edit mode to true
  }

  // Function to save edited client data
  saveClient() {
    this.editClientInfoService.updateClientInfo(this.editingClient).subscribe({
      next: (response) => {
        console.log('Client info updated successfully:', response);
        this.editingClient = {};
        this.editMode = false;
        this.refreshClientInfo();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating client info:', error);
      }
    });
  }

  // hay el function ta 7atta tae3mol cancel lel edit
  cancelEdit() {
    this.editMode = false; 
    this.editingClient = {}; // Clear lal data
  }

  // Function ta na3mel refresh lel client info
  refreshClientInfo() {
    const client_id = 1;
    // const client_id = localStorage.getItem('client_id');
    this.getClientInfo(client_id);
  }
  logout(){
    this.authService.logout();
    this.loginService.logout();
  }
}
