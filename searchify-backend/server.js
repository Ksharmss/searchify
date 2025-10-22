const express = require("express");
const cors = require("cors");
const data = require("./data/mockResults");

const app = express();
// Enable CORS (important!)
app.use(cors({
  origin: "*", // allow all origins (for dev)
  methods: ["GET", "POST"],
}));
app.use(express.json());
app.get("/api/search", (req, res) => {
  const q = req.query.q || req.query.query || "";
  const query = q.trim().toLowerCase();

  if (!query) return res.status(400).json({ success: false, message: "Query required" });

  const results = (data || []).filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const desc = item.description?.toLowerCase() || "";
    return title.includes(query) || desc.includes(query);
  });

  res.json({ success: true, results });
});

app.listen(8000, () => console.log("✅ Backend running on http://localhost:8000"));
