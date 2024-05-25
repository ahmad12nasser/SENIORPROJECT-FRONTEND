import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/users/client.service';

@Component({
  selector: 'app-view-profile-client',
  templateUrl: './view-profile-client.component.html',
  styleUrl: './view-profile-client.component.css'
})
export class ViewProfileClientComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) { }

  client: any = {};
  clientId: number = 0;
  backPath: string = '';
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.clientId = params['client_id'];
      this.backPath = params['backPath'];
    })

    this.clientService.getClientById(this.clientId).subscribe({
      next: (data) => {
        this.client = data;
        this.prepareImage();
        console.log('Successfully fetched client:', true);
      },
      error: (error) => {
        console.error('Error fetching client:', error);
      }

    })
  }
  prepareImage() {
    for (const client of this.client) {
      client.imageUrl = `data:image/jpg;base64,` + client.profileImg;
    }
  }
  backToExplorePage() {
    this.router.navigate([this.backPath]);
  }
}
