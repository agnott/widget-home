let Widget = require('./../widget/widget.js');
let request = require('request');
let ENV = process.env;

class GifEngine extends Widget{
  constructor(config){
    config.emit = 'gif.update';
    config.on = 'gif.request'

    super(config);

    this.gif = '';
  }

  interaction(){
    this.update();
  }

  update(){
    request(`http://api.giphy.com/v1/gifs/random?api_key=${ENV.G_API}`, (err, res, html) => {
      if(!err && res.statusCode == 200){
        this.send({
          gif: JSON.parse(res.body).data.image_url
        });
      }
    });
  }
}

module.exports = GifEngine;
