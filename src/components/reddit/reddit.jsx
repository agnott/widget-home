let React = require('react');
let ReactDom = require('react-dom');

class Reddit extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      items: [],
      subreddit: ''
    };

    this.props.socket.on('reddit.update', (data) => {
      console.log(data);
      this.setState({
        items: data.items,
        subreddit: data.subreddit
      });
    });

    this.updateValue = this.updateValue.bind(this);
    this.changeSubs = this.changeSubs.bind(this);
  }

  updateValue(evt){
    this.setState({
      subreddit: evt.target.value
    });
  }

  changeSubs(){
    this.props.socket.emit('reddit.interaction', {
      subreddit: this.state.subreddit
    });
  }

  render(){
    return (
      <div className="reddit">
        <div className="sub-input">
          <input type="text" value={this.state.subreddit} onChange={this.updateValue}/><div className="go-button" onClick={this.changeSubs}>
            >
          </div>
        </div>
      {
        this.state.items.map((item) => {
          return (
            <a className="item" href={item.link} key={item.key} target="_blank">
              <div className="image-strip" style={{
                background: `url('${item.img}') no-repeat center center`
              }}></div>
              <div className="title">
                {item.title}
              </div>
            </a>
          );
        })
      }
      </div>
    )
  }
}

module.exports = Reddit;
