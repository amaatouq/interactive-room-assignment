import React from "react";

import Room from "./Room.jsx";
import Timer from "./Timer.jsx";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: false };
  }

  componentDidMount() {
    const { player } = this.props;
    setTimeout(() => this.setState({ activeButton: true }), 5000); //we make the satisfied button active after 5 seconds
    if (player.stage.submitted) {
      this.setState({ activeButton: false });
    }
  }

  handleSatisfaction = (satisfied, event) => {
    const { game, player, stage } = this.props;
    event.preventDefault();

    //if everyone submitted then, there is nothing to handle
    if (player.stage.submitted) {
      return;
    }

    //if it is only one player, and satisfied, we want to lock everything
    if (game.players.length === 1 && satisfied) {
      this.setState({ activeButton: false });
    } else {
      //if they are group (or individual that clicked unsatisfied), we want to momentarily disable the button so they don't spam, but they can change their mind so we unlock it after 1.5 seconds
      this.setState({ activeButton: false });
      setTimeout(() => this.setState({ activeButton: true }), 800); //preventing spam by a group
    }

    player.set("satisfied", satisfied);
    stage.append("log", {
      verb: "playerSatisfaction",
      subjectId: player._id,
      state: satisfied ? "satisfied" : "unsatisfied",
      at: new Date()
    });
  };

  render() {
    const { game, stage, player } = this.props;

    const task = stage.get("task");
    const violatedConstraints = stage.get("violatedConstraints") || [];

    return (
      <div className="task">
        <div className="left">
          <div className="info">
            <Timer stage={stage} />
            <div className="score">
              <h5>Score</h5>

              <h2>{stage.get("score")}</h2>
            </div>
          </div>

          <div className="constraints">
            {stage.name === "practice" ? (
              <p>
                <strong style={{ color: "blue" }}>
                  This is practice round and the Score will not count
                </strong>
              </p>
            ) : (
              ""
            )}
            <h5>Constraints</h5>
            <ul>
              {task.constraints.map(constraint => {
                const failed = violatedConstraints.includes(constraint._id);
                return (
                  <li key={constraint._id} className={failed ? "failed" : ""}>
                    {failed ? (
                      <span className="pt-icon-standard pt-icon-cross" />
                    ) : (
                      <span className="pt-icon-standard pt-icon-dot" />
                    )}
                    {constraint.pair.join(" and ")} {constraint.text}.
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="payoff">
            <h5>Payoff</h5>
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Rooms</th>
                  {task.rooms.map(room => <th key={room}>{room}</th>)}
                </tr>
              </thead>
              <tbody>
                {task.students.map(student => (
                  <tr key={student}>
                    <th>Student {student}</th>
                    {task.rooms.map(room => (
                      <td
                        className={
                          stage.get(`student-${student}-room`) === room
                            ? "active"
                            : null
                        }
                        key={room}
                      >
                        {task.payoff[student][room]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="board">
          <div className="all-rooms">
            <Room
              room="deck"
              stage={stage}
              game={game}
              player={player}
              isDeck
            />

            <div className="rooms">
              {task.rooms.map(room => (
                <Room
                  key={room}
                  room={room}
                  stage={stage}
                  game={game}
                  player={player}
                />
              ))}
            </div>
          </div>

          <div className="response">
              <button
                type="button"
                className={`pt-button pt-icon-cross pt-intent-danger pt-large ${
                  player.get("satisfied") ? "pt-minimal" : ""
                }`}
                onClick={this.handleSatisfaction.bind(this, false)}
                disabled={!this.state.activeButton}
              >
                Unsatisfied
              </button>
            <button
              type="button"
              className={`pt-button pt-icon-tick pt-intent-success pt-large ${
                player.get("satisfied") ? "" : "pt-minimal"
              }`}
              onClick={this.handleSatisfaction.bind(this, true)}
              disabled={!this.state.activeButton}
            >
              Satisfied
            </button>
          </div>
        </div>
      </div>
    );
  }
}
