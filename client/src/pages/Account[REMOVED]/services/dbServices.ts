import axios from "axios";
import { projectURLS } from "../../../constants/urls";
import isDev from "../../../utils/isDev";
import Cookie from "js-cookie";

export const getPaymentIntent = async (userDetails: Object) => {
  const paymentIntent = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/payment/create-intent`
      : `${projectURLS.development}/api/payment/create-intent`,

    data: {
      userDetails,
    },
    headers: {
      jwt: `${Cookie.get("jwt")}`,
    },
  });

  return paymentIntent;
};

export const getUserInformation = async () => {
  const userInformation = await axios.request({
    withCredentials: true,
    method: "GET",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/auth/getUserData`
      : `${projectURLS.development}/api/auth/getUserData`,
    headers: {
      jwt: `${Cookie.get("jwt")}`,
    },
  });

  return userInformation;
};

export const changeUserEmail = async (current: string, newEmail: string, newConfirm: string) => {
  const changeEmail = await axios.request({
    withCredentials: true,
    method: "PATCH",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/account/changeEmail`
      : `${projectURLS.development}/api/account/changeEmail`,
    headers: {
      jwt: `${Cookie.get("jwt")}`,
    },
    data: {
      email: current,
      newEmail: newEmail,
      newEmailConfirm: newConfirm,
    },
  });

  return changeEmail;
};

export const changeUserPassword = async (current: string, newPassword: string, newConfirm: string) => {
  const changePassword = await axios.request({
    withCredentials: true,
    method: "PATCH",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/account/changePassword`
      : `${projectURLS.development}/api/account/changePassword`,
    headers: {
      jwt: `${Cookie.get("jwt")}`,
    },
    data: {
      password: current,
      newPassword: newPassword,
      newPasswordConfirm: newConfirm,
    },
  });

  return changePassword;
};

export const deleteUserAccount = async () => {
  const deleteAccount = await axios.request({
    withCredentials: true,
    method: "DELETE",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/account/deleteAccount`
      : `${projectURLS.development}/api/account/deleteAccount`,
    headers: {
      jwt: `${Cookie.get("jwt")}`,
    },
  });

  return deleteAccount;
};
