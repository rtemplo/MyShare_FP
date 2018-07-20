const express = require("express");
const { postgraphile } = require("postgraphile");

const app = express();

app.use(postgraphile(
  process.env.DATABASE_URL || "postgres://postgres:Trinity21@localhost/MyShareFP",
  "public",
  {graphiql:true, enableCors: true}
));

var PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Listening on port',  PORT);
});