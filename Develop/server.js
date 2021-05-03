const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const theNotes = require('./db/db');

app.get('/api/notes', (req, res) => {
    res.json(theNotes);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.listen(PORT, () => {
    console.log('API server loaded to port ${Port}!');
});