let Widget = require('./../widget/widget.js');
let cheerio = require('cheerio');
let request = require('request');

class RecipeEngine extends Widget{
  constructor(config){
    config.emit = 'recipe.update';

    super(config);

    this.recipe = {};
  }

  update(){
    request('http://www.mydailymoment.com/food_and_recipes/recipe_of_the_day/', (err, res, html) => {
      if(!err && res.statusCode == 200){
        let $ = cheerio.load(html);

        let recipe = {
          link: '',
          name: '',
          image: ''
        };

        $('.nlDailyTitle>.nointelli').each((i, element) => {
          if( i < 1 ){
            recipe.link = 'http://www.mydailymoment.com' + $(element).attr('href');
            recipe.name = $(element).text();
          }else{
            return false;
          }
        });

        $('.nlDailyImg>a>img').each((i, element) => {
          if( i < 1 ){
            recipe.image = $(element).attr('src');
          }
        });

        this.send({
          recipe: recipe
        });
      }
    });
  }
}

module.exports = RecipeEngine
