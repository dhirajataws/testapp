export default class CustomError {
  errorMessage: string;
  line: string;
  constructor(message: string, line: string) {
    this.errorMessage = message;
  }
  get message() {
    return this.errorMessage
  }
  set message(message: string) {
    this.message = message;
  }
}