import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { Post } from '../../../models/post';
import { LoginService } from '../../../services/authentication/login.service';
import { DeletePostService } from '../../../services/posts/deletePost.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private loginService: LoginService,
    private deletePostService: DeletePostService
  ) { }

  ngOnInit() {
    const freelancerId = this.loginService.getLoggedInUserId() ?? 0;
    // Fetch posts when the component initializes
    this.postsService.getMyPosts(freelancerId).subscribe({
      next: (data) => {
        this.posts = data;
        this.prepareImages();
        console.log('Successfully fetched posts:', true);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
  prepareImages(){
    for (const post of this.posts) {
      post.imageUrl = `data:image/png;base64,`+ post.image;  // Construct data URL with PNG format
    }
  }

  deletePost(post_id: number) {
   this.deletePostService.deletePost(post_id).subscribe({
      next: (data) => {
        console.log('Successfully deleted post:', true);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      }
    });
  }
}
