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
        this.filterRequests();
        this.prepareImages();
      },
      error: (error) => {
      }
    });
  }
 
  filterRequests() {
    this.filtredPosts = this.posts;
    if (this.selectedCategory !== '') {
      this.filtredPosts = this.posts.filter(post => post.categName === this.selectedCategory);

    }else (
      this.filtredPosts = this.posts
    )
  }

  HireInThisPost(postId: number, freelancerId: number){
    this.hiringService.HireInSpecificPost(postId, freelancerId).subscribe({
      next: (response) => {
        console.log('Successfully hired in the post:', response);
        this.router.navigate(['client/controlRoom']);
      },
      error: (error) => {
      }
    });
  }

  prepareImages(){
    for (const post of this.posts) {
      post.imageUrl = `data:image/jpg;base64,`+ post.image;  // Construct data URL with jpg format
      post.freelancerImageUrl = `data:image/jpg;base64,`+ post.freelancerProfileImge;  // Construct data URL with jpg format
    }
  }

  navigateToFreelancerProfile(freelancer_id:number, currentPath: string){
    this.router.navigate(['client/viewProfileFreelancer'],{
      queryParams: {
        freelancer_id: freelancer_id,
        backPath: currentPath
      }
    });
  }
}
