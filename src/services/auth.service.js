import axios from './axios-extender';
import TokenService from "./token.service";
import UserService from "@/services/user.service";

class AuthService {
  login({ username, password }) {
    return axios
      .post("/auth/login", {
        username,
        password
      })
      .then((response) => {
        let usr = response.data;
        usr.username = username;
        if (usr.accessToken) {
          TokenService.setUser(usr);
          UserService.getUserRoles().then(
            (response1) => {
              usr = TokenService.getUser();
              usr.roles = response1.data;
              TokenService.setUser(usr);
            });
        }

        return usr;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password }) {
    return axios.post("/auth/signup", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();

