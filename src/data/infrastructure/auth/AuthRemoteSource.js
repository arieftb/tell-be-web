import axios from 'axios';

async function register (name, email, password) {
  const { data } = await axios.post('https://forum-api.dicoding.dev/v1/register', {
    name: name,
    email: email,
    password: password,
  });

  return data.data.user;
}

export { register };