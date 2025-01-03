const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Allow all origins
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Your existing routes
app.post('/api/packs/open', (req, res) => {
  const pack = req.body.pack;

  if (!pack) {
    return res.status(400).json({ error: 'Pack type is required' });
  }

  // Mock cards for simplicity
  const mockCards = [
    { id: 1, name: 'Card 1', rarity: 'Common' },
    { id: 2, name: 'Card 2', rarity: 'Rare' },
    { id: 3, name: 'Card 3', rarity: 'Legendary' },
  ];

  return res.json({ cards: mockCards });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});