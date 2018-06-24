import React from "react";

import SocialInteractions from "./SocialInteractions.jsx";
import Task from "./Task.jsx";

export default class Round extends React.Component {
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
