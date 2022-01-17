import axios from "axios";
import { projectURLS } from "../constants/urls";
import Cookies from "js-cookie";
import isDev from "../utils/isDev";

export const logoutAttempt = async (args: Array<string>) => {
  const logout = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/logout` : `${projectURLS.development}/api/auth/logout`,
    data: {
      username: args[0],
      password: args[1],
    },
    headers: {
      authorization: `${Cookies.get("jwt")}`,
    },
  });

  return logout;
};

export const loginAttempt = async (username: string, password: string) => {
  const login = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/login` : `${projectURLS.development}/api/auth/login`,
    data: {
      username,
      password,
    },
  });

  return login;
};
