const express = require("express")
require('dotenv').config()
const Stripe = require('stripe');
const AuthRouter = require("./routes/AuthRoutes")
const PORT = process.env.PORT
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

require("./conig/db").intializeMongooseConnection();
app.use(express.json());

app.use("/api/auth" , AuthRouter);

app.post('/api/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount*100), // in the smallest currency unit (e.g., cents)
        currency,
        payment_method_types: ['card'],
      });

      console.log(paymentIntent.client_secret);
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'PaymentIntent creation failed' });
    }
});

const { requireAuth } = require("./middleware/requireAuth");

app.use(requireAuth);

const ProductRouter = require('./routes/ProductRoutes');

app.use("/api/products", ProductRouter);  

app.use((req,res)=> {
    res.status(404).json({error: "invalud Route"});
})

app.listen(PORT , () => {
    console.log("listening on port " + PORT);
});

// mongodb+srv://goosemugger:0dPDsekdQhGji6nT@quickbite.rtf2kxr.mongodb.net/