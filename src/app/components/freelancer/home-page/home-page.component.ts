import { request } from './../../../models/request';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { ProfessionCategories } from '../../../models/profession_categ';
import { Locations } from '../../../models/locations';

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
  filtredRequestsByLocation: request[] = [];
  imageUrl: string = '';
  clientImageUrl: string = '';
  selectedCategory: string = '';
  selectedLocation: string = '';

  constructor(
    private requestsService: RequestsService,
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
        console.log('Successfully fetched requests:', true);
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
      }
    });
  }

  filterRequests() {
    this.filtredRequestsByCateg = this.requests;
    if (this.selectedCategory !== '') {
      this.filtredRequestsByCateg = this.requests.filter(request => request.categ_name === this.selectedCategory);

    } else if (this.selectedLocation !== '') {
      this.filtredRequestsByLocation = this.requests.filter(request => request.location === this.selectedLocation);
    } else if (this.selectedCategory !== '' && this.selectedLocation !== '') {
      this.filtredRequestsByCateg = this.requests.filter(request => request.categ_name === this.selectedCategory);
      this.filtredRequestsByLocation = this.requests.filter(request => request.location === this.selectedLocation);
    }
    // if (this.selectedLocation !== '') {
    //   this.filtredRequestsByLocation = this.filtredRequestsByCateg.filter(request => request.location === this.selectedLocation);
    // }
  }
  applyForRequest(requestId: number, clientId: number) {
    // Call the service method to apply for the request
    this.requestsService.applyForRequest(requestId, clientId).subscribe({
      next: (response) => {
        console.log('Successfully applied for the request:', response);
        this.ngOnInit();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error applying for the request:', error);
      }
    });
  }
  preparImages() {
    for (const request of this.requests) {
      request.imageUrl = `data:image/png;base64,` + request.image;  // Construct data URL with PNG format
      request.clientImageUrl = `data:image/png;base64,` + request.clientProfileImage;  // Construct data URL with PNG format
    }
  }
}
