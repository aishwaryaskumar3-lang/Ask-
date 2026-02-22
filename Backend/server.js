require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 1210;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://portfoliouser:aishwaryaskumar@cluster0.qyqzsvy.mongodb.net/portfolioDB?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

})
.catch((err) => {
    console.log("MongoDB connection failed:", err);
});


// ✅ Create Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: String
});

const Contact = mongoose.model("Contact", contactSchema);


// ✅ Save Contact Form Data to MongoDB
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message,
      date: new Date().toISOString()
    });

    await newMessage.save();

    res.json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving message" });
  }
});


// ✅ Get Messages from MongoDB
app.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});


// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
