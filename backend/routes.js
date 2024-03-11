const express = require('express');
const router = express.Router(); // Ajoutez cette ligne pour créer un routeur express

// Enregistrement des utilisateurs
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    // Vérifier si l'e-mail existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'This email address is already in use.' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
  
    await user.save();
  
    // Générer un jeton JWT (ajouté pour la connexion automatique après l'inscription)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  
    res.status(201).json({
      message: 'Utilisateur enregistré',
      token,  // Envoyer le token dans la réponse pour la connexion automatique
      user: {  // Ajouter les informations utilisateur dans la réponse
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
});

module.exports = router; // Ajoutez cette ligne pour exporter le routeur
