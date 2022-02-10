class AppError extends Error {
  statusCode: number;
  status: string;
  customMessage: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    // Parent class is 'super and passes the message to our incomming message
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "Error";
    this.customMessage = message;

    // Signifies that he error is creatred by us to catch something not  random programming error etc.
    this.isOperational = true;

    // Not add to the stack trace and pollute it.....
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
