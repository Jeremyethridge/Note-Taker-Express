const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const noteData = require('../db/db.json');

router.use(express.json());

const dbFilePath = path.join(__dirname, '../db/db.json');

router.get('/', (req, res) => {
  res.json(noteData);
});

router.post('/', async (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  noteData.push(newNote);

  try {
    await fsPromises.writeFile(dbFilePath, JSON.stringify(noteData, null, 2));
    res.status(201).json(newNote);
    console.log(noteData);
  } catch (error) {
    console.error("Error writing to mock db.json:", error);
    res.status(500).json({ error: "Error; Note was not written to db.json" });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const noteIndex = noteData.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note with id not found' });
  }

  noteData.splice(noteIndex, 1);

  try {
    await fsPromises.writeFile(dbFilePath, JSON.stringify(noteData, null, 2));
    res.status(204).json(noteData);
    console.log(noteData);
  } catch (error) {
    console.error("Error deleting note from mock db.json:", error);
    res.status(500).json({ error: "Error; Note was not written to db.json" });
  }
});

module.exports = router;