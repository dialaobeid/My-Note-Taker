const express = require('express');
const fs = require('fs');
const path = require('path');
// installed uuid via terminal (for generating unique ids)
const { v4: uuidv4 } = require('uuid'); 

const router = express.Router();

// Path to db.json file
const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

// Helper fxs for reading and writing notes
const readNotes = () => {
  const notes = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(notes);
};

const writeNotes = (notes) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2));
};

// GET "/api/notes" - Returns all notes from db.json file
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST "/api/notes" - Adds a new note to db.json file
router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Note title and text are required.' });
  }

  const newNote = { title, text, id: uuidv4() };
  const notes = readNotes();
  notes.push(newNote);
  writeNotes(notes);

  res.json(newNote);
});

// DELETE "/api/notes/:id" - Deletes a note by id from db.json file
router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  let notes = readNotes();
  const filteredNotes = notes.filter(note => note.id !== id);

  if (notes.length === filteredNotes.length) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  writeNotes(filteredNotes);
  res.json({ success: 'Note deleted.' });
});

module.exports = router;
