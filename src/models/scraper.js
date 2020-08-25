const cheerio = require('cheerio');
const axios = require('axios');

class Scraper {
  constructor(source) {
    this.source = source;
    this.url = source.url;
    this.$ = null;
  }

  async load() {
    try {
      const { data: html } = await axios.get(this.url);

      if (html) {
        this.$ = cheerio.load(html);
      }
    } catch (e) {
      console.log(`---- ERROR scrapping ${this.url} ------`, e);
    }
  }

  async scrape() {
    await this.load();
    if (!this.$) return;

    const $ = this.$;

    const { selectors } = this.source;
    const data = [];

    // eslint-disable-next-line no-unused-vars
    $(selectors.item).each((i, elem) => {
      // console.log(this);
      const o = {};
      Object.keys(selectors)
        .filter((key) => key !== 'item')
        .forEach((key) => {
          if (typeof selectors[key] === 'function') {
            o[key] = selectors[key]($, elem);
          } else {
            o[key] = $(elem).find(selectors[key]).text();
          }
        });
      data.push(o);
    });

    return data;
  }
}

module.exports = Scraper;
