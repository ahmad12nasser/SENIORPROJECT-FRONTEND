export class client {

    public id: number;
    public  firstName: String;
    public lastName: String;
    public  email: String;
    public userName: string;
    public password: string;
    public confirmPassword: string;
    public mobile: String;
    public  location: String;
    public  description: String;
    public age: number;
    public imageUrl: string ;
    public profileImg: String;

    constructor(){
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.userName = "";
        this.password = "";
        this.confirmPassword = "";
        this.mobile = "";
        this.location = "";
        this.description = "";
        this.age = 0;
        this.imageUrl = "";
        this.profileImg="";
    }
}   