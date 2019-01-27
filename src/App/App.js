import React, { Component } from "react";
import API from "../api/api";
import styled from "styled-components";
import getColor from "../utils/selectColorType";
import tinycolor from "tinycolor2";

class App extends Component {
  state = {
    name: "",
    sprite: "",
    stats: [],
    primaryType: "",
    secondaryType: ""
  };
  componentDidMount() {
    this.getPokemon();
  }

  getPokemon = () =>
    API().then(res => {
      console.log(res.data.types);
      const pokemon = res.data;
      this.setState({
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        stats: pokemon.stats,
        primaryType: pokemon.types[0].type.name,
        secondaryType:
          pokemon.types.length > 1
            ? pokemon.types[1].type.name
            : pokemon.types[0].type.name
      });
    });
  secondaryBtnColor = () => {
    return this.state.primaryType === this.state.secondaryType
      ? tinycolor(getColor(this.state.secondaryType))
          .darken()
          .toString()
      : getColor(this.state.secondaryType);
  };
  handleClick = () => {
    this.getPokemon();
  };
  render() {
    return (
      <>
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
          alt="Pokemon Logo"
        />
        <Container>
          <Name>{this.state.name}</Name>
          <SpriteContainer>
            <Sprite src={this.state.sprite} alt={this.state.name} />
            <div>
              {this.state.stats.map(({ stat, base_stat }, index) => (
                <p key={index}>
                  <span className="stat-name">{stat.name}:</span> {base_stat}
                </p>
              ))}
            </div>
          </SpriteContainer>
          <Button
            onClick={this.handleClick}
            primary={getColor(this.state.primaryType)}
            secondary={this.secondaryBtnColor()}
          >
            <span>New Pokemon</span>
          </Button>
        </Container>
      </>
    );
  }
}

const Logo = styled.img`
  width: 350px;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  padding: 10px;
  grid-gap: 20px;
  border: 3px solid black;
  border-radius: 5px;
  background: white;
`;

const SpriteContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 128px 1fr;
  .stat-name {
    font-weight: 700;
  }
`;

const Sprite = styled.img`
  margin: 30px auto;
  padding: 0;
  background: white;
  align-self: center;
  width: 128px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const Button = styled.button`
  position: relative;
  display: block;
  margin: 30px auto;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: ${props => props.primary};
  color: #ecf0f1;
  transition: background-color 0.3s;
  &:hover,
  &:focus {
    background-color: ${props => props.secondary};
  }
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    padding-top: 0;
    border-radius: 100%;
    background-color: rgba(236, 240, 241, 0.3);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  &:active:before {
    width: 120%;
    padding-top: 120%;
    transition: width 0.1s ease-out, padding-top 0.1s ease-out;
  }
  span {
    display: block;
    padding: 12px 24px;
  }
`;

export default App;
