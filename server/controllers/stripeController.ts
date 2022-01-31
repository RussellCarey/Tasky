import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import stripe from "../utils/stripeAPI";

import { IReqBodyRaw } from "../types/types";

// const webhookHandlers = {
//   // "checkout.session.completed": () => (data:) => {
//   //   console.log("Checkout completed!", data);
//   //   // Other
//   //   // Email user, change in the database etc.
//   // },

//   "payment_intent.succeeded": () => (data) => {
//     console.log("Payment taking completed!", data);
//   },

//   "charge.succeeded": () => (data) => {
//     console.log("Charge succeeded", data);
//   },

//   "payment_intent.failed": () => (data) => {
//     console.log("Payment taking FAILED!", data);
//   },
// };

exports.CreateIntent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { amount, description, email, shipping } = req.body;

  console.log(req.body);

  if (!amount || !description || !email || !shipping)
    return new AppError("Make sure you have submitted all details", 500);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: "usd",
    description: "testing inputs",
    payment_method_types: ["card"],
    receipt_email: "test@test.com",
    shipping: {
      address: {
        city: "Tokyo",
        country: "Japan",
        line1: "test street",
      },
    },
  });

  if (!paymentIntent.client_secret) return new AppError("Error processing payment intent.", 500);

  res.json({
    status: "success",
    data: paymentIntent.client_secret,
  });
});

exports.webhook = catchAsync(async (req: IReqBodyRaw, res: Response, next: NextFunction) => {
  const sig = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  if (!event) new AppError("Webhook event not recognized.", 500);

  res.json({
    status: "success",
    data: {
      type: event.type,
    },
  });
});
