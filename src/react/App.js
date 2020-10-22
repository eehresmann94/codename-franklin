import React, { Component } from 'react';
import logo from './SalesforceLogo.png';
import './App.css';
import { channels } from '../shared/constants';
import Appbar from '../react/compoents/subcompoents/Appbar'
const { ipcRenderer } = window; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: '',
    }
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    });
  }

  render() {
    const { appName, appVersion } = this.state;
    return (
      <div className="App">
        <Appbar/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{appName} version {appVersion}</p>
          
        </header>
      </div>
    );
  }
}

export default App;