import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export default class TeamDetails extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
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

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const player = {
      _id: 0,
      name: names[0],
      nameColor: nameColor[0],
      avatar: `/avatars/jdenticon/${avatarNames[0]}`
    };

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColor[1],
        avatar: `/avatars/jdenticon/${avatarNames[1]}`
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColor[2],
        avatar: `/avatars/jdenticon/${avatarNames[2]}`
      }
    ];
    return (
      <Centered>
        <div className="instructions">
          <h1>You will be part of a team</h1>
          <p>
            In this game, you will{" "}
            <strong>
              play together with {treatment.playerCount - 1} other participants
              (your teammates)
            </strong>. They are other MTurk workers who are undertaking the same
            experiment simultaneously. Throughout all the tasks, the team will
            submit only one answer, and therefore,{" "}
            <strong>all members of the team will receive the same score</strong>{" "}
            across all tasks. We will assign your color when the game starts.
          </p>
          <br />
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

          <br />
          <p>
            Note that the game allows for simultaneous and real-time actions.
            That means you will be able to drag students to assign them to rooms
            while your teammates are doing the same. However, when you or a a
            team member starts dragging a student, that student will be locked
            (i.e., no one else can move it) until it is assigned to a room.{" "}
            <strong>
              The student that is being moved will have the color of the
              participant
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



