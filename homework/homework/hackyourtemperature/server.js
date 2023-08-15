import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";
// import path from 'path'
const app = express();
const PORT = (process.env.PORT = 3000);
app.use(express.json());

// sends the message the client!
app.get("/", (req, res) => {
  res.send("hello from backend to frontend week2!");
});

// Adding a POST request
app.post("/weather", async (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      res.status(400).json({ error: "City name is required." });
      return;
    }

    const apiKey = keys.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      res.json({ weatherText: "City is not found!" });
    } else {
      const temperature = data.main.temp;
      res.json({ weatherText: `Temperature in ${cityName}: ${temperature}°C` });
    }
  } catch (error) {
    console.error("An error occurred on the server:", error);
    res.status(500).json({ error: "An error occurred on the server." });
  }
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
