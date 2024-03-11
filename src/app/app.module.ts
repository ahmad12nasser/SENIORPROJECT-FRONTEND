import { RegisterAsFreelancerComponent } from './authentication/register-as-freelancer/register-as-freelancer.component';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { LoginPageComponent } from "./authentication/login-page/login-page.component";
import { RegisterAsClientComponent } from './authentication/register-as-client/register-as-client.component';
import { NavBarComponent } from './components/freelancer/nav-bar/nav-bar.component';
import { HomePageComponent } from './components/freelancer/home-page/home-page.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NewPostComponent } from './components/freelancer/new-post/new-post.component';
import { MyPostsComponent } from './components/freelancer/my-posts/my-posts.component';
import { ToDoComponent } from './components/freelancer/to-do/to-do.component';
import { ClientNavBarComponent } from './components/client/client-nav-bar/client-nav-bar.component';
import { NewRequestComponent } from './components/client/new-request/new-request.component';
import { MyRequestsComponent } from './components/client/my-requests/my-requests.component';
import { MainPageComponent } from './components/client/main-page/main-page.component';
import { OperationRoomComponent } from './components/freelancer/operation-room/operation-room.component';
import { ControlRoomComponent } from './components/client/control-room/control-room.component';
@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        RegisterAsFreelancerComponent,
        RegisterAsClientComponent,
        NavBarComponent,
        HomePageComponent,
        NewPostComponent,
        MyPostsComponent,
        ToDoComponent,
        ClientNavBarComponent,
        NewRequestComponent,
        MyRequestsComponent,
        MainPageComponent,
        OperationRoomComponent,
        ControlRoomComponent

    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CarouselModule.forRoot()

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }