const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("Great!");
})

app.listen(3000, () => {
    console.log("Running");
})