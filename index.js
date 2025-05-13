import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import sendMail from "./utils/sendMail.js"

dotenv.config()

const app = express()
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ 1. Servir les fichiers statiques React
app.use(express.static(path.join(__dirname, "public")))

// ✅ 2. Route API d’envoi de mail
app.post("/api/send-contact", async (req, res) => {
  console.log("🔔 /api/send-contact")
  console.log("📨 Body reçu :", req.body)

  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Champs manquants" })
  }

  try {
    await sendMail({
      to: "contact@greendevlover.com",
      subject: `Message de ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    })
    res.status(200).json({ message: "Mail envoyé !" })
  } catch (err) {
    console.error("❌ Erreur:", err)
    res.status(500).json({ error: err.message })
  }
})

// ✅ 3. Fallback : toutes les autres routes reviennent à React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// ✅ 4. Lancement du serveur
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})
