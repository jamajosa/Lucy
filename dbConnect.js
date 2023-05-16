import axios from 'axios';

class dbConnect {

  async getBearerToken(name, pass) {
    try {
      const loginUrl = 'https://cultgo.azurewebsites.net/users/login'; // Replace with your actual login URL
      const response = await axios.post(loginUrl, {
        email: name,
        password: pass,
      });
      console.log(response.data);
      return response.data.token;
    } catch (error) {
      console.error('Error getting bearer token:', error);
      return null;
    }
  }
}

export default new dbConnect();