const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 1210;

app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = {
    name,
    email,
    message,
    date: new Date().toISOString()
  };

  let messages = [];
  if (fs.existsSync("messages.json")) {
    messages = JSON.parse(fs.readFileSync("messages.json"));
  }

  messages.push(newMessage);
  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

  res.json({ message: "Message saved successfully" });
});
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
app.get("/messages", (req, res) => {
  const messages = JSON.parse(fs.readFileSync("messages.json"));
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
