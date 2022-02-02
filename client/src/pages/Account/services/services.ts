import { changeUserEmail, changeUserPassword, deleteUserAccount } from "./dbServices";

export const changePassword = async (password: string, newPassword: string, newPasswordConfirm: string) => {
  try {
    const passwordChange = await changeUserPassword(password, newPassword, newPasswordConfirm);
    return passwordChange;
  } catch (error: any) {
    return error.response;
  }
};

export const changeEmail = async (email: string, newEmail: string, newEmailConfirm: string) => {
  try {
    const emailChange = await changeUserEmail(email, newEmail, newEmailConfirm);
    return emailChange;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteAccount = async () => {
  try {
    const deleteAccount = await deleteUserAccount();
    return deleteAccount;
  } catch (error: any) {
    return error.response;
  }
};
