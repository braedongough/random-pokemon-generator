import React, { Component } from "react";
import API from "../api/api";
import styled from "styled-components";

class App extends Component {
  state = {
    name: "",
    sprite: "",
    stats: []
  };
  componentDidMount() {
    this.getPokemon();
  }

  getPokemon = () =>
    API().then(res => {
      console.log(res.data.stats);
      const pokemon = res.data;
      this.setState({
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        stats: pokemon.stats
      });
    });
  handleClick = () => {
    this.getPokemon();
  };
  render() {
    return (
      <div>
        <Container>
          <p>{this.state.name}</p>
          <img src={this.state.sprite} alt={this.state.name} />
          <div>
            {this.state.stats.map(({ stat, base_stat }, index) => (
              <p key={index}>
                {stat.name}: {base_stat}
              </p>
            ))}
          </div>
          <button onClick={this.handleClick}>Click here for good stuff</button>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  background: #000;
  color: white;
  width: 96px;
`;

export default App;
