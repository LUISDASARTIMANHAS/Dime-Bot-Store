import express from "express"
import ddos from "ddos"
const app = express()
import xss from "xss"
import path from "path"
import {fileURLToPath} from 'url'
import httpsSecurity from "./modules/httpsSecurity.js"
import checkHeaderMiddleware from "./modules/checkHeaderMiddleware.js"
const port = 3000;
const params = {
  limit: 100,
  maxcount: 200,
  trustProxy: true,
  includeUserAgent: true,
  whitelist: [],
  testmode: false,
};
const limiter = new ddos(params);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const files = __dirname + "/src/";
const path_pages = files + "pages/";
const path_js = files + "js";
const forbiddenFilePath = path.join(path_pages, "forbidden.html");
import rotas from "./rotas.js";
import pages from "./pages.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter.express);
app.use(httpsSecurity);

// Middleware para adicionar meta tags SEO
app.use((req, res, next) => {
  res.setHeader("og-Title", "Título Padrão");
  res.setHeader("og-Description", "Descrição Padrão");
  for (const key in req.body) {
    req.body[key] = xss(req.body[key]);
  }
  next();
});

app.use(pages);
app.use((req, res, next) => {
  checkHeaderMiddleware(req, res, next);
});
app.use(rotas);
import "./src/bot.js";


app.listen(port, () => {
  console.log(`Servidor Web rodando em http://localhost:${port}`);
});

// functions basicas
function print(keyHeader, key, key2, key3, auth1, auth2, auth3) {
  console.log("SISTEMA <VERIFICAÇÃO 1>: " + keyHeader + " == " + key);
  console.log("SISTEMA <VERIFICAÇÃO 2>: " + keyHeader + " == " + key2);
  console.log("SISTEMA <VERIFICAÇÃO 2>: " + keyHeader + " == " + key3);
  console.log("SISTEMA <AUTORIZAÇÃO 1>: " + conversorSimEnao(!auth1));
  console.log("SISTEMA <AUTORIZAÇÃO 2>: " + conversorSimEnao(!auth2));
  console.log("SISTEMA <AUTORIZAÇÃO 3>: " + conversorSimEnao(!auth3));
  console.log("----------------------------");
}

function forbidden(res) {
  res.status(403);
  res.sendFile(forbiddenFilePath);
}

function conversorSimEnao(value) {
  if (value) {
    return "✔Voce foi autorizado, esta tudo correto";
  }
  return "⚠Esta faltando algo ou não foi autorizado!";
}