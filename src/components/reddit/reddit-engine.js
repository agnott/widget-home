let Widget = require('./../widget/widget.js');
let cheerio = require('cheerio');
let request = require('request');

class RedditEngine extends Widget{
  constructor(config){
    config.emit = 'reddit.update';
    config.on = 'reddit.interaction';

    super(config);

    this.subreddit = 'all';

    this.update = this.update.bind(this);
  }

  interaction(data){
    this.subreddit = data.subreddit
    this.update();
  }

  update(){
    request(`https://www.reddit.com/r/${this.subreddit}`, (err, res, html) => {
      if(!err && res.statusCode == 200){
        let $ = cheerio.load(html);

        let items = [];
        let key = 0;

        $('div.thing').each((i, element) => {
          let title = $(element).find('a.title').text();
          let link = $(element).find('a.title').attr('href');
          let img = $(element).find('a.thumbnail img').attr('src');

          if(!img){
            img = 'http://media1.santabanta.com/full1/Creative/Abstract/abstract-823a.jpg';
          }

          if(link[0] === '/'){
            link = 'https://www.reddit.com' + link;
          }

          items.push({
            key: key++,
            title: title,
            link: link,
            img: img
          });

          if( i === 10 ) return false;
        });

        this.send({
          items: items,
          subreddit: this.subreddit
        });
      }
    });
  }
}

module.exports = RedditEngine;
