const express = require("express");
const HttpError = require("./models/http-error");

const questionsRoutes = require("./routes/question-routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/questions", questionsRoutes); // => /api/question...

app.use((req, res) => {
  throw new HttpError("route not found", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "there was some error" });
}); //this function will be executed only to requests that have an error attached to it.

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, function () {
  console.log(`server started on port ${port}`);
});
