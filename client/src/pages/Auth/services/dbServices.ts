import axios from "axios";
import { projectURLS } from "../../../constants/urls";
import isDev from "../../../utils/isDev";
import Cookie from "js-cookie";

export const authenticateUser = async (uuid: string) => {
  const authUser = await axios.request({
    withCredentials: true,
    method: "PATCH",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/authorize` : `${projectURLS.development}/api/auth/authorize`,
    data: {
      uuid: uuid,
    },
    headers: {
      jwt: `${Cookie.get("jwt")}`,
    },
  });

  return authUser;
};
