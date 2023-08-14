import express from "express";
// import path from 'path'
const app = express();
const PORT = (process.env.PORT = 3000);
app.use(express.json());

// sends the message the client!
app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

// Adding a POST request
app.post("/weather", (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      res.status(400).json({ error: "City name is required." });
    }
    res.json(`the exact words you submitted ${cityName}`);
  } catch (error) {
    console.error("An error occurred on the server:", error);
    res.status(500).json({ error: "An error occurred on the server." });
  }
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
