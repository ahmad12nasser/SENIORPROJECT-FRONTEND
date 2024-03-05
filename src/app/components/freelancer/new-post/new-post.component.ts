import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { Post } from '../../../models/post';
import { LoginService } from '../../../services/authentication/login.service'; // Assuming you have an AuthService to get the freelancer_id
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  newPost: Post = new Post();
  selectedImage: File | null = null;
  imageBase64: string | null = null; // Variable to store base64 string



  constructor(
    private postsService: PostsService,
     private loginService: LoginService,
       private sanitizer: DomSanitizer
       ) { }

  submitPost() {
    //hon 3am ya3mol set lal freelancer_id 3alshan yeb2a 3andak
    this.newPost.freelancer_id = this.loginService.getLoggedInUserId();

    this.postsService.createPost(this.newPost).subscribe({
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

  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      // Set the base64 string and sanitize it
      this.imageBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string) as string;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
    this.selectedImage = file;
    }
  }

}
