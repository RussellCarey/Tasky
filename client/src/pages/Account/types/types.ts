export interface IUserObject {
  active: string;
  activekey: string;
  banned: boolean;
  created: string;
  email: string;
  id: number;
  ismember: boolean;
  password: string;
  username: string;
}

export interface IPopupWindow {
  theme: any;
  closeWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUserDetails {
  fullname: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
}
