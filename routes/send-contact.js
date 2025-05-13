import express from 'express'
import sendMail from '../utils/sendMail.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' })
  }

  try {
    await sendMail({
      to: 'contact@greendevlover.com',
      subject: `📩 Nouveau message de ${name}`,
      text: `${message}\n\nContact : ${email}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de l’envoi' })
  }
})

export default router
