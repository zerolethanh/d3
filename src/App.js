import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';
import UploadComponent from './UploadComponent'
import VerticalTimeline from './components/VerticalTimeline/TimeLine'

import * as s from './server'
class App extends Component {
  constructor(props) {
    super(props);
    s.token();
  }

  render() {
    return (
        <div className="App">
          <UploadComponent />
          <VerticalTimeline/>
        </div>
    );
  }


}

export default App;
