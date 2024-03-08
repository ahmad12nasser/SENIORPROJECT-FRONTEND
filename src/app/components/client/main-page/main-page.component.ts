import { throwError } from 'rxjs';
import { PostsService } from './../../../services/posts/posts.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  posts: any[] = [];
  constructor(private postsService: PostsService){}

  ngOnInit(){
    this.postsService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Successfully fetched posts:', true);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  HireInThisPost(postId: number, freelancerId: number){
    this.postsService.HireInSpecificPost(postId, freelancerId).subscribe({
      next: (response) => {
        console.log('Successfully hired in the post:', response);
        this.refreshPosts();
      },
      error: (error) => {
        console.error('Error hiring in the post:', error);
      }
    });
  }
  private refreshPosts() {
    this.postsService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('Error refreshing requests:', error);
        return throwError('No request selected.'); // Use throwError here
      }
    });
  }
}
