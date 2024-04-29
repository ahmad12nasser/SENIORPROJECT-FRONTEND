import { throwError } from 'rxjs';
import { PostsService } from './../../../services/posts/posts.service';
import { Component } from '@angular/core';
import { HiringService } from '../../../services/posts/hiringThroughPost.service';
import { Router } from '@angular/router';
import { Post } from '../../../models/post';
import { ProfessionCategories } from '../../../models/profession_categ';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  categoryList = new ProfessionCategories();
  posts: Post[] = [];
  imageUrl: String = '';
  freelancerImageUrl: String = '';
  filtredPosts: Post[] = [];
  selectedCategory: string = '';
  constructor(
    private postsService: PostsService,
    private hiringService: HiringService,
    private router: Router
  ){
    this.filtredPosts = this.posts; 

  }

  ngOnInit(){
    this.postsService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.prepareImages();
        this.filterRequests();
        console.log('Successfully fetched posts:', true);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
  filterRequests() {
    if (this.selectedCategory === '') {
      this.filtredPosts = this.posts; // Show all requests if no category selected
    } else {
      this.filtredPosts = this.posts.filter(post => post.categName === this.selectedCategory);
    }
  }

  HireInThisPost(postId: number, freelancerId: number){
    this.hiringService.HireInSpecificPost(postId, freelancerId).subscribe({
      next: (response) => {
        console.log('Successfully hired in the post:', response);
        this.router.navigate(['client/controlRoom']);
      },
      error: (error) => {
        console.error('Error hiring in the post:', error);
      }
    });
  }

  prepareImages(){
    for (const post of this.posts) {
      post.imageUrl = `data:image/png;base64,`+ post.image;  // Construct data URL with PNG format
      post.freelancerImageUrl = `data:image/png;base64,`+ post.freelancerProfileImge;  // Construct data URL with PNG format
    }
  }
}
