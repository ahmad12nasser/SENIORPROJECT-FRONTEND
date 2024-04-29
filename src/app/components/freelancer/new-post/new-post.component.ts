import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { Post } from '../../../models/post';
import { LoginService } from '../../../services/authentication/login.service'; // Assuming you have an AuthService to get the freelancer_id
import { DomSanitizer } from '@angular/platform-browser';
import { ProfessionCategories } from '../../../models/profession_categ';
import { Locations } from '../../../models/locations';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  categoryList = new ProfessionCategories();
  locations = new Locations();
  newPost: any = {};
  selectedImage: File | null = null;
  selectedCategory: string = '';
  selectedLocation: string = '';


  constructor(
    private postsService: PostsService,
    private loginService: LoginService
  ) { }

  submitPost() {
    this.newPost.categ_name = this.selectedCategory;
    this.newPost.location = this.selectedLocation;
    //hon 3am ya3mol set lal freelancer_id 3alshan yeb2a 3andak
    this.newPost.freelancer_id = this.loginService.getLoggedInUserId() ?? 0;
    const formData = new FormData();
    formData.append('freelancer_id', this.newPost.freelancer_id);
    formData.append('title', this.newPost.title);
    formData.append('description', this.newPost.description);
    formData.append('categ_name', this.newPost.categ_name);
    formData.append('location', this.newPost.location);
    formData.append('price', this.newPost.price);
    formData.append('dateposted', this.newPost.datePosted);
    formData.append('deadline', this.newPost.deadline);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    this.postsService.createPost(formData).subscribe({
      next: (data) => {
        console.log('Successfully submitted post:', data);
        // Clear the form after submitting
        this.newPost = new Post();
      },
      error: (error) => {
        console.error('Error submitting post:', error);
      }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.selectedImage = file;
    }
  }

}
