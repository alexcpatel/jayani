import React, { Component } from 'react'
import Profile from './Components/Profile'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

import './App.css'

library.add(fab)

class App extends Component {
  render() {
    return (
      <div>
        <Profile />
      </div>
    );
  }
}

export default App;
