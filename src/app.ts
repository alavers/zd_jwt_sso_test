import * as express from "express";
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { ulid } from "ulid";

config();

const app = express();
const port = process.env.PORT || 8000;
const secret = requireEnv("SHARED_SECRET");
const subdomain = requireEnv("SUBDOMAIN");

function requireEnv(name: string): string {
  if (!process.env[name]) {
    throw new Error(`Missing ${name}`);
  }
  return process.env[name] as string;
}

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.get("/sso/login", (req, res) => {
  res.render("login", {
    return_to: req.query.return_to,
  });
});

app.post("/sso/form", (req, res) => {
  const { name, email, external_id, return_to } = req.body;
  const payload = {
    name,
    email,
    external_id,
    iat: Math.floor(Date.now() / 1000),
    jti: ulid(),
  };
  const jwt = sign(payload, secret);

  res.redirect(
    `https://${subdomain}.zendesk.com/access/jwt?jwt=${jwt}&return_to=${encodeURIComponent(
      return_to
    )}`
  );
});

app.use("/sso/logout", (req, res) => {
  res.render("logout", {
    message: req.query.message,
    continue_url: `https://${subdomain}.zendesk.com/hc/signin`,
  });
});

app.listen(port, () => {
  console.log(`JWT SSO Test listening on port ${port}`);
});
