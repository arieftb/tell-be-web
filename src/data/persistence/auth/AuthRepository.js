import { login, register } from "../../infrastructure/auth/AuthRemoteSource.js";
import {
  AuthenticationError,
  DuplicateEmailError,
  RegistrationError,
} from "../../../domain/auth/model/AuthExceptions.js";

export class AuthRepository {
  async registerUser(registerPayload) {
    try {
      return await register({
        name: registerPayload.name.getValue(),
        email: registerPayload.email.getValue(),
        password: registerPayload.password.getValue(),
      });
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "fail" && message === "Email is already taken") {
          throw new DuplicateEmailError("This email is already in use.");
        }
        throw new RegistrationError("Failed to register. Please try again.");
      }
      throw new RegistrationError(
        "Network error. Please check your connection.",
      );
    }
  }

  async loginUser(loginPayload) {
    try {
      const { token } = await login({
        email: loginPayload.email.getValue(),
        password: loginPayload.password.getValue(),
      });
      this.saveToken(token);
      return token;
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "fail" && message === "Invalid email or password") {
          throw new AuthenticationError("Invalid email or password.");
        }
        throw new AuthenticationError("Failed to login. Please try again.");
      }
      throw new AuthenticationError(
        "Network error. Please check your connection.",
      );
    }
  }

  saveToken(token) {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  removeToken() {
    localStorage.removeItem("accessToken");
  }
}
