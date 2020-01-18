const express = require('express');

// const postsRouter = require('./posts/posts-router.js');
// const commentsRouter = require('./comments/comments-router.js');

const server = express();

server.use(express.json());
// server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
      <h1>API 2 Project</h1>
      <p>By: Jake Gifford</p>
    `);
})

module.exports = server;