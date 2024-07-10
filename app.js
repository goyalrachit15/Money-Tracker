if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;
const app = express();

main()
  .then(() => {
    console.log("Connected To DB");
  })
  .catch((err) => {
    console.error("not connected to db", err);
  });

async function main(){
    await mongoose.connect(mongo_url);
}

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", require('./routes/user'));
app.use("/api/v1/transactions", require('./routes/transaction'));

const port = 8080;
app.listen(port,() => {
  console.log(`listening on port ${port}`);
})
