import React from "react";
import EventLog from "./EventLog";
import ChatLog from "./ChatLog";

export default class SocialInteractions extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <img src={player.get("avatar")} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.get("nameColor") }}>
          {player.get("name")}
          {self ? " (You)" : ""}
        </span>
      </div>
    );
  }

  render() {
    const { game, round, player } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    const messages = round.get("chat").map(({ text, playerId }) => ({
      text,
      subject: game.players.find(p => p._id === playerId)
    }));
    const events = round.get("log").map(({ subjectId, ...rest }) => ({
      subject: subjectId && game.players.find(p => p._id === subjectId),
      ...rest
    }));

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players pt-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map(p => this.renderPlayer(p))}
          </div>

          <div className="total-score pt-card">
            <h6>Total Score</h6>

            <h2>{game.get("cumulativeScore") || 0}</h2>
          </div>
        </div>

        <div className="eventlog pt-card">
          <EventLog events={events} round={round} player={player} />
        </div>
        <div className="chat pt-card">
          <ChatLog messages={messages} round={round} player={player} />
        </div>
      </div>
    );
  }
}
