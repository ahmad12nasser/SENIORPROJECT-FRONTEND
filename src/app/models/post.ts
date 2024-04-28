export class Post {
  public id: number;
  public freelancerId: number;
  public title: string;
  public datePosted: Date;
  public deadline: Date;
  public location: string;
  public categName: string;
  public description: string;
  public image: string;
  public price: number;
  public imageUrl: string;
  public status: string;
  public freelancerProfileImge: string;
  public freelancerFirstName: string;
  public freelancerLastName: string;
  public freelancerImageUrl: string;
  public clientProfileImge: string;
  public clientFirstName: string;
  public clientLastName: string;
  public clientImageUrl: string;
  public post_id: number;

  constructor() {
    this.id = 0;
    this.freelancerId = 0;
    this.title = '';
    this.datePosted = new Date();
    this.deadline = new Date();
    this.location = '';
    this.categName = '';
    this.description = '';
    this.image = '';
    this.price = 0;
    this.imageUrl = '';
    this.status = '';
    this.freelancerFirstName = '';
    this.freelancerLastName = '';
    this.freelancerImageUrl = '';
    this.freelancerProfileImge = '';
    this.clientProfileImge = '';
    this.clientFirstName = '';
    this.clientLastName = '';
    this.clientImageUrl = '';
    this.post_id = 0;
  }
}
