import { client } from "./client";

export class request{

     public id: number;
     public client: client;
     public title: String;
     public datePosted: Date;
     public deadLine: Date;
     public categName:String;
     public location: String;
     public description: String;
     public image: String;
     public price: number;

     constructor(){
           this.id = 0;
           this.client = new client();
           this.title = "";
           this.datePosted = new Date();
           this.deadLine = new Date();
           this.categName = "";
           this.location = "";
           this.description = "";
           this.image = "";
           this.price = 0;
      }
}