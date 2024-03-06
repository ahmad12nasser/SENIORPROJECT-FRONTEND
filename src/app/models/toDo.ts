import { client } from "./client";
import { freelancer } from "./freelancer";
import { Post } from "./post";
import { request } from "./request";

export class toDo {
    id: number;
    freelancer: freelancer;
    client: client;
    request: request;
    post: Post;
    status: string;

    constructor(){
        this.id = 0;
        this.freelancer = new freelancer();
        this.client = new client();
        this.request = new request();
        this.post = new Post();
        this.status = "";
    }
}