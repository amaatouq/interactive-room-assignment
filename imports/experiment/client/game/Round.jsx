import React from "react";

import SocialInteractions from "./SocialInteractions.jsx";
import Task from "./Task.jsx";

const roundSound = new Audio("experiment/round-sound.mp3");
const gameSound = new Audio("experiment/bell.mp3");

export default class Round extends React.Component {
  componentDidMount() {
    const { game } = this.props;
    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }
  }

  render() {
    const { round, stage, player, game } = this.props;

    return (
      <div className="round">
        {/* <PlayerProfile player={player} stage={stage} game={game} /> */}
        <Task round={round} stage={stage} player={player} game={game} />
        <SocialInteractions game={game} round={round} player={player} />
        {/* <SocialExposure stage={stage} player={player} game={game} /> */}
      </div>
    );
  }
}
