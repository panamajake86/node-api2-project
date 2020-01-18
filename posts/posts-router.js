const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

router.post('/', (req, res) => {
    const info = req.body;

    Posts.insert(info)
        .then(post => {
            if(post) {
                res.status(201).json(info);
            } else {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." } );
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" }, err);
        });
});

router.post('/:id/comments', (req, res) => {
    const {id} = req.params;
    const stuff = req.body;
    
    Posts.insertComment(id)
        .then(post => {
            if (post) {
                res.status(201).json(stuff);
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

router.get('/', (req, res) => {
    Posts.find()
        .then(post => {
          res.status(200).json(post);  
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." }, err)
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Posts.findById(id)
        .then(post => {
            if (id) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." }, err);
        });
});

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

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    Posts.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end()
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" }, err);
        });
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const stuff = req.body;

    Posts.update(id, stuff)
        .then(updated => {
            if (updated) {
                res.status(200).json(stuff);
            } else if (updated.id) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." }, err);
        });
});

module.exports = router;