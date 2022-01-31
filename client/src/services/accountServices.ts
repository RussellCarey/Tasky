import { getPaymentIntent } from "./dbServices";

export const paymentIntent = async () => {
  const pi = await getPaymentIntent();
  return pi;
};
