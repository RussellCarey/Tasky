export interface ILoginData {
  email: string;
  username: string;
}

export interface IError extends Error {
  status: string;
  statusCode: number;
  isOperational: boolean;
}
