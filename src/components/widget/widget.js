class Widget{
  constructor(config){

    this.id = config.id;
    this.delta = config.delta;
    this.interval = null;

    this.events = {
      emit: config.emit,
      on: config.on
    };

    this.updatable = config.updatable;
    this.interactive = config.interactive;

    //Socket to send data on
    this.socket = config.socket;

    if(this.interactive){
      this.socket.on(this.events.on, (data) => {
        this.interaction(data);
      });
    }
  }

  send(data){
    console.log(`${this.id}: sending`);

    data._id = this.id;
    this.socket.emit(this.events.emit, data);
  }

  interaction(data){
    console.log(`${this.id}: receiving`);
  }

  update(){
    console.log(`${this.id}: updating`);
    if(this.updatable){
      this.send();
    }
  }

  start(){
    console.log(`${this.id}: starting`);

    if(this.delta > 0){

      this.interval = setInterval(this.update.bind(this), this.delta);
    }

    this.update();
  }

  stop(){
    if(this.interval){
      console.log(`${this.id}: stopping`);
      clearInterval(this.interval);
      this.inteval = null;
    }
  }
}

module.exports = Widget;
