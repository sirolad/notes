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

// Save Note
router.post('/save', (req, res, next) => {
    let p;
    if (req.body.docreate === "create") {
        p = notes.create(req.body.notekey,
            req.body.title, req.body.body);
    } else {
        p = notes.update(req.body.notekey,
            req.body.title, req.body.body);
    }
    p.then(note => {
        res.redirect('/notes/view?key='+ req.body.notekey);
    })
        .catch(err => { next(err); });
});

// read one note

router.get('/view', (req, res, next) => {
    notes.read(req.query.key)
        .then(note => {
            res.render('noteview', {
                title: note ? note.title : "",
                notekey: req.query.key,
                note: note
            });
        })
        .catch(err => { next(err); });
});

// Edit Note
router.get('/edit', (req, res, next) => {
    notes.read(req.query.key)
        .then(note => {
            res.render('noteedit', {
                title: note ? ("Edit " + note.title) : "Add a Note",
                docreate: false,
                notekey: req.query.key,
                note: note
            });
        })
        .catch(err => { next(err); });
});

//Delete Note
router.get('/destroy', (req, res, next) => {
    notes.read(req.query.key)
        .then(note => {
            res.render('notedestroy', {
                title: note ? note.title : "",
                notekey: req.query.key,
                note: note
            });
        })
        .catch(err => { next(err); });
});

//Confirm Delete
router.post('/destroy/confirm', (req, res, next) => {
    notes.destroy(req.body.notekey)
        .then(() => { res.redirect('/'); })
        .catch(err => { next(err); });
});

module.exports = router;