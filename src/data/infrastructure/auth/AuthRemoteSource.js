import AxiosClient from '../api/AxiosClient.js';
import User from '../../../domain/user/model/User.js';

async function register (registerRequest) {
  const { data } = await AxiosClient.post('/register', registerRequest);
  return new User(data.data.user);
}

async function login (loginRequest) {
  const { data } = await AxiosClient.post('/login', loginRequest);
  return data.data;
}

export { register, login };
