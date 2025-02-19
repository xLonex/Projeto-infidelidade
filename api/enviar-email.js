const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Configurar armazenamento de arquivos com Multer em memória
const storage = multer.memoryStorage(); // Usando a memória para armazenar o arquivo

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      // Aceitar apenas imagens
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de imagem são permitidos!"));
    }
  },
});

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta "src"
app.use(express.static(path.join(__dirname, "../src")));

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/enviar-email", upload.single("foto"), async (req, res) => {
  const { email, mensagem } = req.body;
  const foto = req.file; // Arquivo enviado

  // Corpo do e-mail em HTML
  const mensagemPadrao = `
  <h1 style="color:rgb(200, 39, 39);">Mensageiro da Infidelidade</h1>
        <p>Olá,</p>
        <p>Sei que esta pode não ser a mensagem mais agradável de se receber, mas<strong> alguém de seu ciclo social, de forma anônima,</strong> pediu para que essa informação chegasse até você <strong>sobre uma suposta infidelidade seu parceiro ou parceira</strong>
        <p>Lembre-se: essa mensagem pode ser um trote ou até um golpe, e apenas você pode decidir o que fazer com essa informação. Abaixo, segue o conteúdo da mensagem:</p>
        <blockquote style="font-size: 18px; color: #333;">
          <strong><h2 style="color:rgb(200, 39, 39);">${mensagem}</strong></h1>
        </blockquote>
        ${
          foto
            ? `<p><strong>Anexo:</strong> Uma imagem foi enviada junto com a denúncia. Lembre-se que nos dias de hoje tudo pode ser forjado seja com IA ou Photoshop. Cabe a você decidir e ir atrás das informações</p>`
            : ""
        }
        <p> <strong> O que fazer com essa informação é uma escolha apenas sua. Seja qual for que decida seguir, lembre-se que você merece transparência e respeito em qualquer relacionamento</strong>
        <p>Entendemos que essa notícia pode ser difícil de lidar, e queremos que saiba que você não está sozinho(a) nessa situação. A dor da traição pode ser avassaladora, mas é importante que busque apoio de amigos, familiares ou profissionais que possam ajudá-lo(a) a enfrentar esse momento.</p>
        <p> POR FAVOR, NÃO RESPONDA A ESSE EMAIL, CASO QUEIRA ENTRAR CONTATO COMIGO (Dono do site) mande email aqui: <link>lgustavaresl@gmail.com</link>
        <p><a href="https://mensageiro-da-infidelidade.onrender.com" style="color: #0066cc; text-decoration: underline;">Mensageiro da Infidelidade</a></p>
      `;

  try {
    const mailOptions = {
      from: "Infidelidade <mensageiro.da.infidelidade@gmail.com>",
      to: email,
      subject: "🚨 Denúncia de Infidelidade",
      html: mensagemPadrao,
      attachments: [],
    };

    if (foto) {
      mailOptions.attachments.push({
        filename: foto.originalname,
        content: foto.buffer, // Usando o conteúdo da memória diretamente
      });
    }

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// Rota para servir o index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(3000, () => {
  console.log("Acaba com eles tigrão !");
});