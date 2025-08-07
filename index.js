// index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store (for simplicity)
let notes = [];
let nextId = 1;

// GET /notes - fetch all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST /notes - create a new note
app.post("/notes", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is required." });
  }

  if (content.length > 280) {
    return res
      .status(400)
      .json({ error: "Note content exceeds 280 characters." });
  }

  const newNote = {
    id: nextId++,
    content,
    createdAt: new Date(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// Start server
app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
