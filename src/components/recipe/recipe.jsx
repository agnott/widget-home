let React = require('react');
let ReactDom = require('react-dom');

class Recipe extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      recipe: {}
    };

    this.props.socket.on('recipe.update', (data) => {
      console.log(data);
      this.setState({
        recipe: data.recipe
      });
    });
  }

  render(){
    return (
      <div className="recipe">
        <a href={this.state.recipe.link} target="_blank">
          <img src={this.state.recipe.image}/>
        </a>
        <a className="name" href={this.state.recipe.link} target="_blank">
          {this.state.recipe.name}
        </a>
      </div>
    )
  }
}

module.exports = Recipe;
