import GetAuthTokenUseCase from "./GetAuthTokenUseCase.js";

export default class IsLoggedInUseCase {
  constructor() {
    this.getAuthTokenUseCase = new GetAuthTokenUseCase();
  }

  execute() {
    return !!this.getAuthTokenUseCase.execute();
  }
}
