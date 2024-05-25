import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { Post } from '../../../models/post';
import { LoginService } from '../../../services/authentication/login.service'; // Assuming you have an AuthService to get the freelancer_id
import { ProfessionCategories } from '../../../models/profession_categ';
import { Locations } from '../../../models/locations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  categoryList = new ProfessionCategories();
  locations = new Locations();
  newPost: FormGroup = new FormGroup({});
  selectedImage: File | null = null;
  selectedCategory: string = '';
  selectedLocation: string = '';
  submitted = false;

  constructor(
    private postsService: PostsService,
    private loginService: LoginService,
    private FormBuilder: FormBuilder
  ) { }
  ngOnInit(){
    this.initPostForm();
  }
  initPostForm(){
    this.newPost = this.FormBuilder.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      categ_name: ['',Validators.required],
      location: ['',Validators.required],
      price: ['',Validators.required],
      deadline: ['',Validators.required],
      image: ['']
    });
  }
  get accessToFormFields() {
    return this.newPost.controls;
  }
  submitPost() {
    this.submitted = true;
    if (this.newPost.invalid) {
      return;
    }
    if(this.newPost.valid) {
      const formData = new FormData();
      //hon 3am ya3mol set lal freelancer_id 3alshan yeb2a 3andak
      const freelancer_id = this.loginService.getLoggedInUserId() ?? 0;
      formData.append('freelancer_id', freelancer_id.toString());
      formData.append('title', this.newPost.value.title);
      formData.append('description', this.newPost.value.description);
      formData.append('categ_name', this.selectedCategory);
      formData.append('location', this.selectedLocation);
      formData.append('price', this.newPost.value.price);
      formData.append('deadline', this.newPost.value.deadline);
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      this.postsService.createPost(formData).subscribe({
        next: (data) => {
          // Clear the form after submitting

          alert('Post created successfully');
          this.newPost.reset();
        },
        error: (error) => {
          alert('An error occurred while creating the post');
        }
      });
    }
    
  }
  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.selectedImage = file;
    }
  }
  onCategorySelected(event: any){
    this.selectedCategory = event.target.value;
  }
  onLocationSelected(event: any){
    this.selectedLocation = event.target.value;
  }

}
