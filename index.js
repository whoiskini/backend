const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Card = require('./models/Card'); // Import Card model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = 'mongodb+srv://xotwod:ZgX4UMRyqSWFcTAp@xotrades.q3e9g.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// API Endpoints
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Open a pack
app.post('/api/packs/open', async (req, res) => {
  const { pack } = req.body;

  if (!pack) {
    return res.status(400).json({ error: 'Pack type is required' });
  }

  try {
    // Fetch cards for the specified pack
    const cardsForPack = await Card.find({ packType: pack });

    if (cardsForPack.length === 0) {
      return res.status(404).json({ error: 'No cards found for this pack type' });
    }

    // Randomly select cards (e.g., 3 cards)
    const selectedCards = [];
    const cardsToDraw = 3;

    for (let i = 0; i < cardsToDraw; i++) {
      const randomIndex = Math.floor(Math.random() * cardsForPack.length);
      selectedCards.push(cardsForPack[randomIndex]);
      cardsForPack.splice(randomIndex, 1); // Remove selected card from the pool
    }

    res.json({ cards: selectedCards });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});