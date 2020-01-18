const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

router.get('/:id/comments', (req, res) => {
    const {id} = req.params;
    
    Posts.findPostComments(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." }, err);
        });
});

router.post('/:id/comments', (req, res) => {
    const {id} = req.params;
    
    Posts.insertComment(id)
        .then(post => {
            if (post) {
                res.status(201).json(post);
            } else if (post.id) {
                res.status(400).json({ errorMessage: "Please provide text for the comment." });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" }, err);
        });
});

module.exports = router;