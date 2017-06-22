let React = require('react');
let ReactDom = require('react-dom');

class News extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      news: []
    };

    this.props.socket.on('news.update', (data) => {
      console.log(data);
      this.setState({
        news: data.news
      });
    });
  }

  render(){
    return (
      <div className="news">
      {
        this.state.news.map((news) => {
          return (
            <a className="headline" href={news.link} key={news.key} target="_blank">
              {news.headline}
            </a>
          );
        })
      }
      </div>
    )
  }
}

module.exports = News;
