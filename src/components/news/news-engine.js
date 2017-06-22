let Widget = require('./../widget/widget.js');
let cheerio = require('cheerio');
let request = require('request');

class NewsEngine extends Widget{
  constructor(config){
    config.emit = 'news.update';

    super(config);

    this.scores = [];
  }

  update(){
    request('https://news.ycombinator.com', (err, res, html) => {
      if(!err && res.statusCode == 200){
        let $ = cheerio.load(html);

        let news = [];
        let key = 0;

        $('a.storylink').each((i, element) => {
          if(i < 10){
            news.push({
              key: key++,
              link: $(element).attr('href'),
              headline: $(element).text()
            });
          }else{
            return false;
          }
        });

        this.send({
          news: news
        });
      }
    });
  }
}

module.exports = NewsEngine
