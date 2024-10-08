const express = require('express');
const path = require('path');
const notesRoutes = require('../server/Routes/noteRoutes')
const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../client'));
app.use('/api/notes', notesRoutes)



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/notes.html'))
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


