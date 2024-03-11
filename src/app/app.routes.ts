import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { ChoosingUserComponent } from './authentication/choosing-user/choosing-user.component';
import { RegisterAsFreelancerComponent } from './authentication/register-as-freelancer/register-as-freelancer.component';
import { RegisterAsClientComponent } from './authentication/register-as-client/register-as-client.component';
import { HomePageComponent } from './components/freelancer/home-page/home-page.component';
import { NewPostComponent } from './components/freelancer/new-post/new-post.component';
import { MyPostsComponent } from './components/freelancer/my-posts/my-posts.component';
import { ToDoComponent } from './components/freelancer/to-do/to-do.component';
import { MainPageComponent } from './components/client/main-page/main-page.component';
import { MyRequestsComponent } from './components/client/my-requests/my-requests.component';
import { NewRequestComponent } from './components/client/new-request/new-request.component';
import { OperationRoomComponent } from './components/freelancer/operation-room/operation-room.component';
import { ControlRoomComponent } from './components/client/control-room/control-room.component';

const routes: Routes = [
    {
        path:'login',
        component: LoginPageComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: ChoosingUserComponent
    },
    {
        path: 'register/freelancer',
        component: RegisterAsFreelancerComponent
    },
    {
        path: 'register/client',
        component: RegisterAsClientComponent
    },
    {
        path: 'freelancer/home-page',
        component: HomePageComponent
    },
    {
        path: 'freelancer/new-post',
        component: NewPostComponent
    },
    {
        path: 'freelancer/my-posts',
        component: MyPostsComponent
    },
    {
        path: 'freelancer/toDo',
        component: ToDoComponent
    },
    {
        path: 'client/homePage',
        component: MainPageComponent
    },
    {
        path: 'client/myRequests',
        component: MyRequestsComponent
    },
    {
        path: 'client/newRequest',
        component: NewRequestComponent
    },
    {
        path: 'freelancer/operationRoom',
        component: OperationRoomComponent
    },
    {
        path: 'client/controlRoom',
        component: ControlRoomComponent
    }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })


export class AppRoutingModule { }
