export class User {
  public id: string;
  public email: string;
  public password1: string;
  public password2: string;
  public username: string;
  public role: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public phoneNumber: string;


  constructor(data) {
    this.id = data.id || null;
    this.email = data.email || null;
    this.password1 = data.password1 || null;
    this.password2 = data.password2 || null;
    this.username = data.username || null;
    this.role = data.role || null;
    this.firstName = data.firstName || null;
    this.lastName = data.lastName || null;
    this.city = data.city || null;
    this.phoneNumber = data.phoneNumber || null;
  }
}