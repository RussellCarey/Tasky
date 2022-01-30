const stripeAPI = require("stripe")(`${process.env.STRIPE_KEY}`);
export default stripeAPI;
