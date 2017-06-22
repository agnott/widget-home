//Client side index.js


let React = require('react');
let ReactDom = require('react-dom');

let Clock = require('./components/clock/clock.jsx');
let News = require('./components/news/news.jsx');
let Recipe = require('./components/recipe/recipe.jsx');
let Reddit = require('./components/reddit/reddit.jsx');
let Gif = require('./components/gif/gif.jsx');

let socket = io();

renderWidget('clock', 1, <Clock socket={socket}/>);
renderWidget('gif', 1, <Gif socket={socket}/>)

renderWidget('news', 2, <News socket={socket}/>);

renderWidget('recipe', 3, <Recipe socket={socket}/>);

renderWidget('reddit', 4, <Reddit socket={socket}/>);

function renderWidget(id, col, item){
  let el = document.createElement('div');
  el.id = id;
  el.classList.add('widget');

  document.getElementById(`col-${col}`).appendChild(el);

  ReactDOM.render(item, el);
}
