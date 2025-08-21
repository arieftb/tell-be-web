import {Name} from '../../user/model/valueobject/Name.js';
import {Email} from '../../user/model/valueobject/Email.js';
import {Password} from './valueobject/Password.js';

class RegisterPayload {
  constructor({name, email, password}) {
    this.name = new Name(name);
    this.email = new Email(email);
    this.password = new Password(password);
  }
}

export default RegisterPayload;
