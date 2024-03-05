import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    //const freelancerId = this.getFreelancerIdFromLocalStorage();
    const freelancerId = 1;
    // Fetch posts when the component initializes
    this.postsService.getMyPosts(freelancerId).subscribe({
      next: (data) => {
        this.posts = data;
               console.log('Successfully fetched posts:', true);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
      
    });
  }

  private getFreelancerIdFromLocalStorage(): number {
    return Number(localStorage.getItem('userId'));
  }
}
