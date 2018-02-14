const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
})

app.use((req, res, next) => {
  var now = new Date().toString()
  console.log(`${now}: ${req.method} ${req.url}`)
  next()
});

app.use((req, res, next) => {
  res.send("Site is under maintanen")
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('Hello Express!')
  res.send({
    name: "Terrance",
    data: [
      'Test 1',
      'Test 2'
    ]
  })
});
// app.get('/about', (req, res) => {
//   res.send("about page");
// });
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "Send from Server about Page",
    currentYear: new Date().getFullYear()
  });
});
app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle: "My HOME PAGE",
    homeData: "MY HOME DATA",
    paragrashData: "MY PARAGRAPH",
    currentYear: new Date().getFullYear()
  });
});
app.listen(3000, ()=> {
  console.log(`server is startingo on 3000 ${port}`)
});
