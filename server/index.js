require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");
const connectDB = require("./config/mongodb");

const app = express();

connectDB();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log("Server running on PORT: " + port));
