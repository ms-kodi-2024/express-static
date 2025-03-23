const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.show = name => {
    res.sendFile(path.join(__dirname, 'views', name));
  };
  next();
});

app.use('/user', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'forbidden.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get(['/', '/home'], (req, res) => {
  res.show('home.html'); 
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/image', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', 'image.png'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(8000, () => {
  console.log(`Server is running on port: 8000`);
});
