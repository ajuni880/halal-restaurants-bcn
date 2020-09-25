const express = require('express');
const Scraper = require('./models/scraper');
const { tripAdvisor } = require('./models/sources');
const CACHE_TIME = 3600 * 1000;
const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

let cache;
let cacheTime;

const getData = async () => {
  try {
    const sc = new Scraper(tripAdvisor);

    if (cacheTime && Date.now() - cacheTime <= CACHE_TIME) return cache;

    const data = await sc.scrape();
    cache = data;
    cacheTime = Date.now();
    return data;
  } catch (e) {
    console.log(e);
  }
};

app.get('/', async (req, res) => {
  const data = await getData();
  const currentYear = new Date().getFullYear();
  res.render('index', { data, currentYear });
});

module.exports = app;
