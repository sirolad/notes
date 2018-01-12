const express = require('express');
const router = express.Router();
var path = require('path');
const notes = require(process.env.NOTES_MODEL ? path.join('..', process.env.NOTES_MODEL) : '../models/notes-memory');

const log   = require('debug')('notes:router-home');
const error = require('debug')('notes:error');

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
