
let React = require('react');
let ReactDom = require('react-dom');

class Clock extends React.Component{
  constructor(props){
    super(props);

    this.props.socket.on(`clock.time.update`, (data) => {
      console.log(data);
      this.setState({
        time: new Date(data.time)
      });
    });

    this.state = {
      time: new Date()
    }

    this.send = this.send.bind(this);
  }

  send(){
    this.props.socket.emit('clock.time.clicked', 'popopopo');
  }

  render(){
    return(
      <div className='clock' onClick={this.send}>
        <div className='time'>
          {
            (()=>{
              let hour = this.state.time.getHours() % 12;

              if(hour && hour < 10){
                return '0' + hour;
              }else if(hour){
                return hour;
              }else{
                return '12';
              }
            })()
          }:{
            (this.state.time.getMinutes() < 10)? '0' + this.state.time.getMinutes() : this.state.time.getMinutes()
          }
        </div>
      </div>
    );
  }
}

module.exports = Clock
