const express = require('express');
const router = express.Router();
const notes = require('../models/notes-memory');

/* GET home page. */
router.get('/', function(req, res, next) {
    notes.keylist()
        .then(keylist => {
            const keyPromises = [];
            for (const key of keylist) {
                keyPromises.push(
                    notes.read(key)
                        .then(note => {
                            return { key: note.key, title: note.title };
                        })
                );
            }
            return Promise.all(keyPromises);
        })
        .then(notelist => {
            res.render('index', {
                title: 'Notes',
                notelist: notelist,
                breadcrumbs: [
                    { href: '/', text: 'Home'}
                ]
            });
        })
        .catch(err => { next(err); });
});


module.exports = router;
