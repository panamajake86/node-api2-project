const express = require('express');

const postsRouter = require('./posts/posts-router.js');
// const commentsRouter = require('./comments/comments-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);
// server.use('/api/posts/:id/comments', commentsRouter);

server.get('/', (req, res) => {
    res.send(`
      <h1>API 2 Project</h1>
      <h3>By: Jake Gifford</h3>
    `);
})

module.exports = server;