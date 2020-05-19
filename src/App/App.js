import React from 'react';
import './App.scss';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Team from '../components/Team/Team';

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <h2>Sports Roster</h2>
      <MyNavbar/>
      <Auth/>
      <Team/>
    </div>
    );
  }
}

export default App;
