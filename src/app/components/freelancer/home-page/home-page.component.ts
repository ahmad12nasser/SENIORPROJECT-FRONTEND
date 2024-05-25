import { request } from './../../../models/request';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { ProfessionCategories } from '../../../models/profession_categ';
import { Locations } from '../../../models/locations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  categoryList = new ProfessionCategories();
  locationList = new Locations();
  requests: request[] = [];
  filtredRequestsByCateg: request[] = [];
  imageUrl: string = '';
  clientImageUrl: string = '';
  selectedCategory: string = '';

  constructor(
    private requestsService: RequestsService,
    private router: Router
  ) {
    this.filtredRequestsByCateg = this.requests;
  }

  ngOnInit() {
    // Fetch requests when the component initializes
    this.requestsService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.filterRequests(); // this line to filter requests 
        this.preparImages(); // this line to prepare images for the requests
      },
      error: (error) => {
      }
    });
  }

  filterRequests() {
    this.filtredRequestsByCateg = this.requests;
    if (this.selectedCategory !== '') {
      this.filtredRequestsByCateg = this.requests.filter(request => request.categ_name === this.selectedCategory);
    } 
  }
  applyForRequest(requestId: number, clientId: number) {
    // Call the service method to apply for the request
    this.requestsService.applyForRequest(requestId, clientId).subscribe({
      next: (response) => {
        this.ngOnInit();
        alert('Applied for the request successfully')
      },
      error: (error) => {
        alert('error while applying for the request')
      }
    });
  }
  preparImages() {
    for (const request of this.requests) {
      request.imageUrl = `data:image/png;base64,` + request.image;  // Construct data URL with PNG format
      request.clientImageUrl = `data:image/png;base64,` + request.clientProfileImage;  // Construct data URL with PNG format
    }
  }
  navigateToClientProfile(client_id: number, currentPath: string) {
    this.router.navigate(['freelancer/viewProfileClient'],{
      queryParams: {
        client_id: client_id,
        backPath: currentPath
      }
    })
  }
}
