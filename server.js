const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// set up logger
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// set up maitenance (if needed)
// app.use((req, res, next) => {
//   res.render('maitenance.hbs');
// });

// set up static directory
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');

  // res.send({
  //  name: 'Kai',
  //  linkes: [
  //    'Biking',
  //    'Cities'
  //  ]
  // });

  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to Kai\'s website'
    // currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project page',
    projectMessage: 'This is my first deployed app'
  })
})

// /bad send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
