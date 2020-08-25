const tripAdvisor = {
  baseUrl: 'https://www.tripadvisor.es',
  url:
    'https://www.tripadvisor.es/Restaurants-g187497-zfz10751-Barcelona_Catalonia.html',
  selectors: {
    item: '._1llCuDZj',
    title: ($, elem) => {
      let title = $(elem).find('a._15_ydu6b').text();

      if (!title) return null;
      title = title.replace(/^[0-9]+./, '');
      return title;
    },
    url: ($, elem) => {
      const href = $(elem).find('a._15_ydu6b').attr('href');
      return `${tripAdvisor.baseUrl}/${href}`;
    },
    stars: ($, elem) => {
      let title = $(elem).find('._3KcXyP0F').attr('title');
      if (title) {
        const match = title.match(/([0-9]{1},?[0-9]?)/);
        if (match) title = match[0];
      }
      return title;
    },
    totalOpinions: '.w726Ki5B',
    cusineType: '._2rmp5aUK ._3d9EnJpt .EHA742uW:first-child ._1p0FLy4t',
  },
};

module.exports = {
  tripAdvisor,
};
