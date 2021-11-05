import * as express from "express";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static("public"));

app.post("/form", (req, res) => {
  res.send(200);
});

app.listen(port, () => {
  console.log(`JWT SSO Test listening on port ${port}`);
});
