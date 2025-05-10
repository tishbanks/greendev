  import express from "express";
  import dotenv from "dotenv";
  import path from "path";
  import { fileURLToPath } from "url";
  import sendMail from "./utils/sendMail.js";

  dotenv.config();
  const app = express();
  app.use(express.json());

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // API d'envoi de mail
  app.post("/api/send-contact", async (req, res) => {
    try {
      console.log("🔔 /api/send-contact");
      await sendMail({
        to: 'contact@greendevlover.com',
        subject: "Test depuis GreenDev",
        text: "Ceci est un test",
        html: "<p>Ceci est un <strong>test</strong></p>",
      });
      res.status(200).send("Mail envoyé !");
    } catch (err) {
      console.error("❌ Erreur:", err);
      res.status(500).send("Erreur serveur : " + err.message);
    }
  });

  // Lancement du serveur
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`✅ Serveur sur http://greendevlover.com:${PORT}`);
  });
