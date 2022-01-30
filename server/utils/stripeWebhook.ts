// // Installed the stripe CLI, logged in and then used;;
// // stripe listen --forward-to http://localhost:8080/webhook
// // This allows to listen on the local host..
// // This then returned a key which is saved in the env.
// const stripeAPI = require("../stripe.js");

// const webhookHandlers = {
//   "checkout.session.completed": () => (data:) => {
//     console.log("Checkout completed!", data);
//     // Other
//     // Email user, change in the database etc.
//   },

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

// const webhook = (req, res) => {
//   console.log("WEBHOOK RECIEVED A MESSAGEAY");
//   console.log();

//   // The req headers contain, host accept etc. We want the signiture from it.
//   // Someone from the outside is poisting to it..
//   const sig = req.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripeAPI.webhooks.constructEvent(req["rawBody"], sig, process.env.WEBHOOK_SECRET);
//   } catch (error) {
//     res.status(400).json({
//       message: "webhook error",
//       status: "failed",
//     });
//   }
// };

// module.exports = webhook;
