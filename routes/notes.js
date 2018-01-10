const util = require('util');
const express = require('express');
const router = express.Router();
const notes = require('../models/notes-memory');
// Add Note.
router.get('/add', (req, res, next) => {
    res.render('noteedit', {
        title: "Add a Note",
        docreate: true,
        notekey: "",
        note: undefined
    });
});

module.exports = router;