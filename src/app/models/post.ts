export class Post {
  public id: number;
  public freelancer_id: number;
  public title: string;
  public datePosted: Date;
  public deadline: Date;
  public location: string;
  public categName: string;
  public description: string;
  public image: string;
  public price: number;

  constructor() {
    this.id = 0;
    this.freelancer_id = 0;
    this.title = '';
    this.datePosted = new Date();
    this.deadline = new Date();
    this.location = '';
    this.categName = '';
    this.description = '';
    this.image = '';
    this.price = 0;
  }
}
