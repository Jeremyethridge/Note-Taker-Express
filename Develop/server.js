const express = require('express');
const path = require('path');
const notesRoutes = require('./routes/noteRoutes')
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/notes', notesRoutes)


// Send notes.html for path /notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Send .index.html for all paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


