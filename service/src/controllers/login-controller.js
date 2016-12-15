export class LoginController {
  constructor() {
    this.users = {
      Ben: 'hi',
      Ann: 'hey'
    };
  }

  authorize(params) {
    console.dir(params);
    return this.users[params.username] === params.password;
  }
}