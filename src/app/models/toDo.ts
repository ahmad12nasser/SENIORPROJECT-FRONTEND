import { client } from "./client";
import { freelancer } from "./freelancer";
import { Post } from "./post";
import { request } from "./request";

export class toDo {

    public id: number;
    public freelancerId: number;
    public clientId: number;
    public appliedRequest_id: number;
    public hiredPost_id: number;
    public request_id: number;
    public post_id: number;
    public status: string;
    public client_first_name: string;
    public client_last_name: string;
    public client_profileImage: string;
    public request_title: string;
    public request_description: string;
    public request_deadLine: Date;
    public request_datePosted: Date;
    public request_categ_name: string;
    public request_location: Date;
    public request_price: number;
    public post_title: string;
    public post_description: string;
    public post_deadLine: Date;
    public post_datePosted: Date;
    public post_categ_name: string;
    public post_location: string;
    public post_price: number;
    public clientProfileImageUrl: string;
    public clientMobile: string;

    constructor() {
        this.id = 0;
        this.freelancerId = 0;
        this.clientId = 0;
        this.appliedRequest_id = 0;
        this.hiredPost_id = 0;
        this.request_id = 0;
        this.post_id = 0;
        this.status = "";
        this.client_first_name = "";
        this.client_last_name = "";
        this.client_profileImage = "";
        this.request_title = "";
        this.request_description = "";
        this.request_deadLine = new Date();
        this.request_datePosted = new Date();
        this.request_categ_name = "";
        this.request_location = new Date();
        this.request_price = 0;
        this.post_title = "";
        this.post_description = "";
        this.post_deadLine = new Date();
        this.post_datePosted = new Date();
        this.post_categ_name = "";
        this.post_location = "";
        this.post_price = 0;
        this.clientProfileImageUrl = "";
        this.clientMobile = "";
    }
}
