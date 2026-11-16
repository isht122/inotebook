const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route-1: Fetch all notes using: GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
    const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Route-2: Create a new note using: POST "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').not().isEmpty(),
    body('description', 'enter a valid description').not().isEmpty(),
    
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // If there are errors, return Bad request and the errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            user: req.user.id,
            title,
            description,
            tag
        });
        const savedNotes = await notes.save();
        res.json(savedNotes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Route-3: Update an existing note using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    try {
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    // fIND THE NOTE TO BE UPDATED AND UPDATE IT

    
        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Note not found");
        }

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
    
});

// Route-4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {

    // Find the note to be deleted and delete it
   
        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Note not found");
        }
        // Allow deletion only if user owns this note

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
    
});
    

module.exports = router;

