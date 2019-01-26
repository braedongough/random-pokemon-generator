import React, { Component } from "react";
import API from "../api/api";

class App extends Component {
  state = {
    name: "",
    sprite: ""
  };
  componentDidMount() {
    const num = this.RandomNum();
    console.log(num);
    API.get(num)
      .then(res => {
        console.log(res.data);
        this.setState({
          name: res.data.species.name,
          sprite: res.data.sprites.front_default
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  RandomNum = () => Math.floor(Math.random() * 150 + 1).toString();
  render() {
    return (
      <div>
        <p>{this.state.name}</p>
        <img src={this.state.sprite} alt={this.state.name} />
        <button>Click here for good stuff</button>
      </div>
    );
  }
}

export default App;
