export class request {

     public id: number;
     public clientId: number;
     public categ_name: String;
     public description: String;
     public datePosted: Date;
     public deadline: Date;
     public location: String;
     public title: String;
     public price: number;
     public image: String;
     public status: String;
     public imageUrl: string;
     public clientProfileImage: string;
     public clientFirstName: string;
     public clientLastName: string;
     public clientImageUrl: string;
     public freelancer_id: number;
     public freelancerFirstName: String;
     public freelancerLastName: String;
     public freelancerProfileImage: String;
     public freelancerImageUrl: String;
     public request_id: number;
     public clientMobile: number;

     constructor() {
          this.id = 0;
          this.clientId = 0;
          this.title = "";
          this.datePosted = new Date();
          this.deadline = new Date();
          this.categ_name = "";
          this.location = "";
          this.description = "";
          this.image = "";
          this.price = 0;
          this.status = "";
          this.imageUrl = "";
          this.clientProfileImage = "";
          this.clientFirstName = "";
          this.clientLastName = "";
          this.clientImageUrl = "";
          this.freelancer_id = 0;
          this.freelancerFirstName = "";
          this.freelancerLastName = "";
          this.freelancerProfileImage = "";
          this.freelancerImageUrl= "";
          this.request_id= 0;
          this.clientMobile=0;
     }
}