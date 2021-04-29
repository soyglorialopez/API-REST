'use strict'
const express = require('express');
const app = express();

app.use(express.json());

app.use('/users', require('./router/users'));
app.use('/posts', require('./router/posts'));
app.use('/comments', require('./router/comments'));

app.use((req, res) => {
    res.status(404).json({
        msg: "404 Not Found"
    })
})

app.set('port',process.env.PORT || 8000)
app.listen(app.get("port"), () => {
    console.log(`Server listening in http://localhost:${app.get("port")}`);
  });;
