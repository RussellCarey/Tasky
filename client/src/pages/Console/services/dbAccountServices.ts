import axios from "axios";
import { projectURLS } from "../../../constants/urls";
import isDev from "../../../utils/isDev";

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

    data: {
      password: current,
      newPassword: newPassword,
      newPasswordConfirm: newConfirm,
    },
  });

  return changePassword;
};

export const deleteUserAccount = async (password: string, passwordConfirm: string) => {
  const deleteAccount = await axios.request({
    withCredentials: true,
    method: "DELETE",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/account/deleteAccount`
      : `${projectURLS.development}/api/account/deleteAccount`,

    data: {
      password,
      passwordConfirm,
    },
  });

  return deleteAccount;
};
