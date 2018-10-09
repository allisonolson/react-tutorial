import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 
    
    this.timer = 0; 
    this.state = {
      currentMinutes: 0, 
      currentSeconds: 0,
      countdownMinutes: 0,
      countdownSeconds: 0, 
      timerActive: false, 
      timerCompleted: false
    }; 

    this.startTimer = this.startTimer.bind(this); 
    this.countDown = this.countDown.bind(this);
    this.updateMinutes = this.updateMinutes.bind(this); 
    this.updateSeconds = this.updateSeconds.bind(this); 
  }

  startTimer() {
    if (this.timer == 0 && this.state.timerActive == false && (this.state.countdownMinutes > 0 || this.state.countdownSeconds > 0)) {
      let minutes = this.state.countdownMinutes; 
      let seconds = this.state.countdownSeconds; 
      this.setState({timerActive: true, currentMinutes: minutes, currentSeconds: seconds, timerCompleted: false}); 
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    var seconds = this.state.currentSeconds - 1;
    var minutes = this.state.currentMinutes;
    if (seconds < 0) {
      seconds = 59; 
      minutes = minutes - 1; 
    }
    this.setState({currentSeconds: seconds, currentMinutes: minutes});
    if (seconds <= 0 && minutes <= 0) {
      clearInterval(this.timer); 
      this.setState({timerActive: false, timerCompleted: true});
      this.timer = 0; 
    }
  }

  updateMinutes(event) {
    this.setState({countdownMinutes: event.target.value});
  }

  updateSeconds(event) {
    this.setState({countdownSeconds: event.target.value});
  }

  render() {
    var timerCompleted = ""; 
    
    if (this.state.timerCompleted) {
      timerCompleted = <div style={{textAlign: 'center'}}>
                         <h1> Timer complete! </h1>
                         <h3> Create another? </h3>
                       </div>;
    }

    var body = <div style={{textAlign: 'center'}}>
                 <h1>{this.state.currentMinutes} Minute(s) and {this.state.currentSeconds} Second(s) left!</h1>
                 <h2>Countdown for {this.state.countdownMinutes} minutes and {this.state.countdownSeconds} seconds.</h2>
               </div>;
    
    if (!this.state.timerActive) {
      body = <div style={{textAlign: 'center'}}>
               <input type="number" onChange={this.updateMinutes} value={this.state.countdownMinutes}/> &nbsp; Minutes 
               <br />
               <input type="number" onChange={this.updateSeconds} value={this.state.countdownSeconds}/> &nbsp; Seconds 
               <br />
               <br />
               <button onClick={this.startTimer}>Countdown!</button>
             </div>;
    }

    return (
      <div style={{textAlign:"center"}}>
        <br />
        <h1>React Tutorial - Timer</h1>
        <br />
        <br />
        {timerCompleted}
        {body}
        </div>
    );
  }
}

export default App;
