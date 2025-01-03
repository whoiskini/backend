const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let users = {}; // Temporary in-memory database for testing purposes

// Test API
app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});

// Open a pack
app.post("/api/packs/open", (req, res) => {
  const { userId, packType } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const packContents = {
    trilogy: ["Card A", "Card B", "Card C"],
    "after-hours": ["Card D", "Card E", "Card F"],
  };

  const cards = packContents[packType] || [];
  const user = users[userId] || { collection: [] };

  user.collection = [...user.collection, ...cards];
  users[userId] = user;

  res.json({ cards });
});

// Get collection
app.get("/api/collection/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const user = users[userId] || { collection: [] };
  res.json({ collection: user.collection });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});