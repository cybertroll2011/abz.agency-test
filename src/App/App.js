import React from 'react';
import './App.css';

import Header from './Components/Header/Header';
import Intro from './Components/Intro/Intro';
import About from './Components/About/About';
import Users from './Components/Users/Users';
import Registration from './Components/Registration/Registration';
import Footer from './Components/Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let header = document.querySelector(".header");
    let introHeight = document.querySelector(".intro").clientHeight;
    if (window.scrollY > 300) {
      header.classList = ["header header-scroll"];
    } else {
      header.classList = ["header"];
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Intro />
        <About />
        <Users />
        <Registration />
        <Footer />
      </div>
    );
  }
}

export default App;