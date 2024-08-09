export default class UserModel{
    constructor(id,name,email,password,type){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        
    }
    static signUp(name,email,password,type){
        const existingUser = users.find(u => u.email === email && u.password==password);
        if (existingUser) {
            return null; // User already exists
        }
        const newUser = new UserModel(name, email, password, type);
        users.push(newUser);
        return newUser;
        }
    static signIn(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    return user;
  }

  static getAll(){
    return users;
  }

}
let users=[{
    id:1,
    name:"Seller user",
    email:"seller@com.com",
    password:"Password1",
    type:"seller",
},
{
    id:2,
    name:"Customer user",
    email:"customer@com.com",
    password:"Password2",
    type:"customer",
}]