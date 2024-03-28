export class request {

     //public id: number;
     public client_id: number;
     public categ_name: String;
     public description: String;
     public datePosted: Date;
     public deadline: Date;
     public location: String;
     public title: String;
     public price: number;
     public image: String;
     public imageUrl: string;

     constructor() {
          //    this.id = 0;
          this.client_id = 0;
          this.title = "";
          this.datePosted = new Date();
          this.deadline = new Date();
          this.categ_name = "";
          this.location = "";
          this.description = "";
          this.image = "";
          this.price = 0;
          this.imageUrl = "";
     }
}