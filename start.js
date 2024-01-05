import express from "express";
const app = express();
import path from "path";
import fs from "fs";
import cors from "cors";
const port = 3000;
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const files = __dirname + "/src/";
const path_pages = files + "pages/";
const path_js = files + "js";
const forbiddenFilePath = path.join(path_pages, "forbidden.html");
import rotas from "./rotas.js";
import pages from "./pages.js";
// Configurar o CORS para permitir origens específicas
const corsOptions = {
  origin: /^https:\/\/.+/,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};
const checkHeaderMiddleware = (req, res, next) => {
  const origin = req.headers.referer || req.headers.referrer;
  const keyHeader = req.headers["authorization"];
  const blockedRoutes = [
    "/admin"
  ];
  const blockRoutesPresent = blockedRoutes.includes(req.path);
  const payload = JSON.stringify(req.body, null, 2);
  const key = "snve072509ç$";
  const key2 = "snve072509Ã§$";
  const key3 = "snve072509&Aplication";

  const validKey = keyHeader === key;
  const validKey2 = keyHeader === key2;
  const validKey3 = keyHeader === key3;
  const auth1 = blockRoutesPresent && !validKey;
  const auth2 = blockRoutesPresent && !validKey2;
  const auth3 = blockRoutesPresent && !validKey3;

  console.log("-------------------------");
  console.log("SISTEMA <CHECK> <OBTER>: " + req.url);
  console.log("SISTEMA <ORIGEM>: " + origin);
  console.log("SISTEMA <PAYLOAD>: " + payload);
  if (auth1 && auth2 && auth3) {
    // Se estiver solicitando das rotas bloqueadas E não conter key, bloquea a solicitação
    print(keyHeader, key, key2, key3, auth1, auth2, auth3);
    forbidden(res);
  } else {
    // Cabeçalho "solicitador" presente ou rota não bloqueada, permite o acesso
    print(keyHeader, key, key2, key3, auth1, auth2, auth3);
    next();
  }
};
app.use(cors(corsOptions));
app.use(checkHeaderMiddleware);
app.use(pages);
app.use(rotas);
import * as bot from "./src/index.js";


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