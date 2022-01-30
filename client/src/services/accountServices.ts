import { getPaymentIntent } from "./dbServices";
export const paymentIntent = async (amount: number, description: string, email: string, shipping: string) => {
  const pi = await getPaymentIntent(amount, description, email, shipping);
  return pi;
};
