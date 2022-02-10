import axios from "axios";
import { projectURLS } from "../../../constants/urls";
import Cookie from "js-cookie";
import isDev from "../../../utils/isDev";

//
export const logoutAttempt = async (args: Array<string>) => {
  const logout = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/logout` : `${projectURLS.development}/api/auth/logout`,
    data: {
      username: args[0],
      password: args[1],
    },
  });

  return logout;
};

export const loginAttempt = async (username: string, password: string) => {
  console.log(username, password);
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

export const signupAttempt = async (args: Array<string>) => {
  const signup = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/signup` : `${projectURLS.development}/api/auth/signup`,
    data: {
      username: args[0],
      email: args[1],
      password: args[2],
      passwordConfirm: args[3],
    },
  });

  return signup;
};
