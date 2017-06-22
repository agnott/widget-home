let Widget = require('./../widget/widget.js');

class ClockEngine extends Widget{
  constructor(config){
    config.emit = 'clock.time.update';
    config.on = 'clock.time.clicked'

    super(config);

    this.time = new Date().getTime();
  }

  update(){
    this.time = new Date().getTime();

    this.send({
      time: this.time
    });
  }
}

module.exports = ClockEngine
