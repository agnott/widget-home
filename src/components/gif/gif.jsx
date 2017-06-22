let React = require('react');
let ReactDom = require('react-dom');

class Gif extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      gif: ''
    };

    this.props.socket.on('gif.update', (data) => {
      console.log(data);
      this.setState({
        gif: data.gif
      });
    });

    this.requestNew = this.requestNew.bind(this);
  }

  requestNew(){
    this.props.socket.emit('gif.request');
  }

  render(){
    return (
      <div className="gif" onClick={this.requestNew}>
        <img src={this.state.gif}/>
      </div>
    )
  }
}

module.exports = Gif;
