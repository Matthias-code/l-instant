const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Récupérer le jeton d'authentification depuis l'en-tête
  const token = req.header('x-auth-token');

  // Vérifier s'il y a un jeton
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Vérifier le jeton
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'utilisateur au corps de la demande
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = auth;
