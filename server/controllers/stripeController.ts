import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import stripe from "../utils/stripeAPI";

exports.CreateIntent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { amount, description, email, shipping } = req.body;

  console.log(req.body);

  if (!amount || !description || !email || !shipping)
    return new AppError("Make sure you have submitted all details", 500);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    description: description,
    payment_method_types: ["card"],
    receipt_email: email,
    shipping: shipping,
  });

  if (!paymentIntent.client_secret) return new AppError("Error processing payment intent.", 500);

  res.json({
    status: "success",
    data: paymentIntent.client_secret,
  });
});
