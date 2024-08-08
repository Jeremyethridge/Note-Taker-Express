const express = require('express');
const path = require('path');
const notesRoutes = require('./routes/noteRoutes')
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');

const allowOrigins = ["https://express-notepad.netlify.app/"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/notes', notesRoutes)



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


