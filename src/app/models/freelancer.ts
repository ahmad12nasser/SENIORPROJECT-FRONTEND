export class freelancer{
    public id: number;
    public firstName: String;
    public lastName: String;
    public email: String;
    public password: String;
    public repassword: String;
    public mobile: String;
    public profileImg: string;
    public location: String;
    public description: String;
    public professionCategName: String;
    public age: number;
    public imageUrl: string;


    constructor(){
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.mobile = '';
        this.profileImg = '';
        this.location = '';
        this.description= '';
        this.professionCategName = '';
        this.age = 0;
        this.imageUrl = '';
    }

}