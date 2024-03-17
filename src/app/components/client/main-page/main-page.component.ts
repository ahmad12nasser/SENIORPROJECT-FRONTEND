import { throwError } from 'rxjs';
import { PostsService } from './../../../services/posts/posts.service';
import { Component } from '@angular/core';
import { HiringService } from '../../../services/posts/hiringThroughPost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  posts: any[] = [];
  constructor(
    private postsService: PostsService,
    private hiringService: HiringService,
    private router: Router
  ){}

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
    this.hiringService.HireInSpecificPost(postId, freelancerId).subscribe({
      next: (response) => {
        console.log('Successfully hired in the post:', response);
        this.refreshPosts();
        //navigate to controlRoom page 
        this.router.navigate(['client/controlRoom']);
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
