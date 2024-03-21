import { Component } from '@angular/core';
import { request } from '../../../models/request';
import { RequestsService } from '../../../services/requests/requests.service';
import { LoginService } from '../../../services/authentication/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})
export class NewRequestComponent {
  newRequest: request = new request();
  selectedFile: File | null = null;
  fileBase64: string | null = null;

  constructor(
    private requestService: RequestsService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer
  ) { }
    //ra7 a3mol temporary setting la client_id handly 3ashan ba3ed login msh she8al 
   // this.newRequest.client_id = 1;
  
   submitRequest() {
    // Set the client_id from the logged in user 
    //this.newRequest.client_id = this.loginService.getLoggedInUserId();
    // Submit the request to the backend
    this.newRequest = {
      ...this.newRequest,
      client_id: 1,
      image: String(this.fileBase64)
    };
    this.requestService.createRequest(this.newRequest).subscribe({
      next: (data) => {
        console.log('Successfully submitted request:', data);
        this.newRequest = new request();
      },
      error: (error) => {
        console.error('Error submitting request:', error);
      }
    });
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.fileBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string) as string;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.selectedFile = file;
      this.convertFileToBase64(file);
    }
  }
}
