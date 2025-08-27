import { ValidationError } from "./AuthExceptions.js";
import { Email } from "../../user/model/valueobject/Email.js";
import { Password } from "./valueobject/Password.js";

export default class LoginPayload {
  constructor({ email, password }) {
    this.email = new Email(email);
    this.password = new Password(password);

    this.validate();
  }

  validate() {
    if (!this.email.getValue()) {
      throw new ValidationError("Email is required.");
    }

    if (!this.password.getValue()) {
      throw new ValidationError("Password is required.");
    }
  }
}
