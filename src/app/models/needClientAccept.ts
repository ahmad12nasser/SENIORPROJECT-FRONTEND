import { client } from './client';
export class NeedClientAccept {
    public id: number;
    public title: string;
    public datePosted: Date;
    public deadline: Date;
    public location: string;
    public categ_name: string;
    public description: string;
    public image: string;
    public price: number;
    public status: string;
    public client_id: number;
    public clientFirstName: string;
    public clientLastName: string;
    public clientProfileImage: string;

    constructor() {
        this.id = 0;
        this.title = '';
        this.datePosted = new Date();
        this.deadline = new Date();
        this.location = '';
        this.categ_name = '';
        this.description = '';
        this.image = '';
        this.price = 0;
        this.status = '';
        this.client_id = 0;
        this.clientFirstName = '';
        this.clientLastName = '';
        this.clientProfileImage = '';
    }
}
