const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get(['/', '/home'], (req, res) => {
  res.render('home'); 
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/image', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', 'image.png'));
});

app.post('/contact/send-message', upload.single('projectDesign'), (req, res) => {

  const { author, sender, title, message } = req.body;

  if (author && sender && title && message && req.file) {
    const fileName = req.file.originalname;
    res.render('contact', { isSent: true, fileName });
  } else {
    res.render('contact', { isError: true });
  }
});

app.use('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pages', 'forbidden.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'pages', '404.html'));
});

app.listen(8000, () => {
  console.log(`Server is running on port: 8000`);
});
