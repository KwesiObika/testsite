import React, { Component } from 'react';
import logo from './record-logo.svg';
import './Snap.css';

class Snap  extends Component {
  render() {
    return (
      <div className="Snap">
        <header className="Snap-header">
          <img src={logo} className="Snap-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="Snap-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learnin
          </a>
        </header>
      </div>
    );
  }
}

export default Snap;