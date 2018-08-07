import React, { Component } from 'react'
import ProfilePic from './Components/ProfilePic'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

import './App.css'

library.add(fab)

class App extends Component {
  render() {
    return (
      <div>
        <ProfilePic />
      </div>
    );
  }
}

export default App;
