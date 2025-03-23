const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', (req, res, next) => {
  res.render('forbidden', {layout: false});
});

app.get(['/', '/home'], (req, res) => {
  res.render('home', {layout: false}); 
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: false });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: false });
});

app.get('/info', (req, res) => {
  res.render('info', { layout: false });
});

app.get('/history', (req, res) => {
  res.render('history', { layout: false });
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
