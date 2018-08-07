import React, { Component } from 'react'
import Title from './Components/Title'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    return (
      <div>
        <Title />
      </div>
    );
  }
}

export default App;
