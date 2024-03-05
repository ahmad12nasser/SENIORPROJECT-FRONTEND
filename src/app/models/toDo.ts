import { Post } from "./post";
import { request } from "./request";

export class toDo {
    id: number;
    freelancer_id: number;
    client_id: number;
    request: request;
    post: Post;
    status: string;

    constructor(){
        this.id = 0;
        this.freelancer_id = 0;
        this.client_id = 0;
        this.request = new request();
        this.post = new Post();
        this.status = "";
    }
}