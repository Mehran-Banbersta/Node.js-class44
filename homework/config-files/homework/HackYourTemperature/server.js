import express from 'express';
import fetch from 'node-fetch';

const app = express()
const port = 3000
app.use(express.json())
//  Create a Send route
app.get("/", (req, res) => {
  res.send("hello from backend to frontend!!");
});

// Create a POST route
app.post('/weather', (req, res) => {
const { cityName } = req.body
res.send(`The exact words you submitted ${cityName}`)
})
app.use(express.json())

app.listen(port, () => {
  console.log(`Server running on port${port}`)
})