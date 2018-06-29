import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";
import moment from "moment/moment";

// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export default class SocialInteractionDetails extends React.Component {
  state = {
    satisfied: false
  };

  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <span
            className={`satisfied pt-tag pt-round ${
              player.satisfied ? "pt-intent-success" : "pt-intent-danger"
            }`}
          >
            <span
              className={`pt-icon-standard ${
                player.satisfied ? "pt-icon-tick" : "pt-icon-cross"
              }`}
            />
          </span>

          <img src={player.avatar} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.nameColor }}>
          {player.name}
          {self ? " (You)" : ""}
        </span>
      </div>
    );
  }

  handleSatisfaction = (satisfied, event) => {
    event.preventDefault();
    this.setState({ satisfied: satisfied });
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const player = {
      _id: 0,
      name: names[0],
      nameColor: nameColor[0],
      avatar: `/avatars/jdenticon/${avatarNames[0]}`,
      satisfied: this.state.satisfied
    };

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColor[1],
        avatar: `/avatars/jdenticon/${avatarNames[1]}`,
        satisfied: false
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColor[2],
        avatar: `/avatars/jdenticon/${avatarNames[2]}`,
        satisfied: true
      }
    ];
    return (
      <Centered>
        <div className="instructions">
          <h1> Communication and Event Logs</h1>
          <p>
            We will log every action taken by you or any of your teammates. This{" "}
            <strong>
              log will be shown to you to keep track of the actions that took
              place so far
            </strong>.
          </p>

          <p>
            Also, <strong>you may communicate with your teammates</strong>{" "}
            through the in-game chat. This <strong>chat room is public</strong>{" "}
            so whatever you write will appear to the other{" "}
            {treatment.playerCount - 1} teammates. You can use this in anyway
            you want.
          </p>

          <p>
            Remember, you and your teammates have{" "}
            {Math.ceil(treatment.stageDuration / 60.0)} minutes in each task to
            find a room assignment plan. You will automatically{" "}
            <strong>progress to the next task when the time is up</strong>.
          </p>
          <p>
            However, you can always indicate whether you are satisfied with the
            answer even when the timer is up.{" "}
          </p>

          <div className="social-interactions" style={{ margin: "auto" }}>
            <div className="status">
              <div className="players pt-card">
                {this.renderPlayer(player, true)}
                {otherPlayers.map(p => this.renderPlayer(p))}
              </div>
              <div className="total-score pt-card">
                <h6>Total Score</h6>

                <h2>{3400}</h2>
              </div>
            </div>
          </div>

          <div className="task">
            <div className="board">
              <div className="response">
                <button
                  type="button"
                  className={`pt-button pt-icon-cross pt-intent-danger pt-large ${
                    this.state.satisfied ? "pt-minimal" : ""
                  }`}
                  onClick={this.handleSatisfaction.bind(this, false)}
                >
                  Unsatisfied
                </button>
                <button
                  type="button"
                  className={`pt-button pt-icon-tick pt-intent-success pt-large ${
                    this.state.satisfied ? "" : "pt-minimal"
                  }`}
                  onClick={this.handleSatisfaction.bind(this, true)}
                >
                  Satisfied
                </button>
              </div>
            </div>
          </div>

          <p>
            <strong>
              If all team members are satisfied before the timer is up, the
              answer will be submitted and you will move to the next task
            </strong>.
          </p>

          <button
            type="button"
            className="pt-button pt-intent-nope pt-icon-double-chevron-left"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="pt-button pt-intent-primary"
            onClick={onNext}
            disabled={!hasNext}
          >
            Next
            <span className="pt-icon-standard pt-icon-double-chevron-right pt-align-right" />
          </button>
        </div>
      </Centered>
    );
  }
}
