
const fs = require('fs');
const path = require('path')
const express = require('express');
const app = express();

const theNotes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(theNotes.slice(1));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function makeNote(body, notesArray) {
    const note = body;
    if(!Array.isArray(notesArray))
        notesArray = [];
    
    if(notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

app.post('/api/notes', (req, res) => {
    const note = makeNote(req.body, theNotes);
    res.json(note);
});

function deleteNote(id, notesArray) {
    for(let i = 0; i < notesArray.length; i++ ) {
        let letNote = notesArray[i];

        if(letNote.id == id){
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, theNotes);
    res.json(true);
});

app.listen(PORT, () => {
    console.log('API server loaded to port ${PORT}');
});