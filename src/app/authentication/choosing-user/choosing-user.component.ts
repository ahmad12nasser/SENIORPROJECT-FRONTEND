import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choosing-user',
  standalone: true,
  imports: [],
  templateUrl: './choosing-user.component.html',
  styleUrl: './choosing-user.component.css'
})
export class ChoosingUserComponent {

  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }

  isFreelancer(){
    this.router.navigate(['/register/freelancer']);
  }
  isClient(){
    this.router.navigate(['/register/client']);
  }
  login() {
    this.router.navigate(['/login']);
  }

}
