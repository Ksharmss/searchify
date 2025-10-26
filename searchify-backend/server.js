// server.js
const express = require("express");
const cors = require("cors");
const mockData = require("./data/mockResults");

const app = express();
app.use(cors());

// 🔍 Search API
app.get("/api/search", (req, res) => {
  const q = req.query.q?.toLowerCase();
  if (!q) return res.json({error: "Country not found" });
  // Return countries that match the query
  const results = mockData
    .filter((item) => item.country.toLowerCase().includes(q))
    .map((item) => ({
      country: item.country,
      flag: item.flag,
    }));

  res.json({ results });
});

// 📄 Details API
app.get("/api/details", (req, res) => {
  const q = req.query.q?.toLowerCase();
  const country = mockData.find((item) => item.country.toLowerCase() === q);

  if (!country) return res.json({ error: "Country not found" });
  res.json({
    country: country.country,
    flag: country.flag,
    details: country.details,
    places: country.places,
  });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
