import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

import Profile from './Components/Profile'
import Title from './Components/Title'

import './App.scss'

library.add(fab)

class App extends Component {
  render() {
    return (
      <div className="site-container">
        <Title />
        <Profile />
      </div>
    );
  }
}

export default App;
