const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const routes = require('./routes');

// Remplacez par votre chaîne de connexion MongoDB
const mongoURI = 'mongodb+srv://matthias:ematou@cluster12.bii1lzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12';

const app = express();
const port = process.env.PORT || 5000;

// Connexion à MongoDB
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connecté à la base de données MongoDB');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

connectToDatabase();

// Autoriser CORS (optionnel)
app.use(cors());

// Analyser les données JSON entrantes
app.use(express.json());
app.use(bodyParser.json());

// Utiliser les routes définies
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur le port ${port}`);
});
