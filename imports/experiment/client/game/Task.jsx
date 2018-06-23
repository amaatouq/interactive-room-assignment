import React from "react";

import TaskResponse from "./TaskResponse";
import TaskStimulus from "./TaskStimulus";

export default class Task extends React.Component {
  handleDragStart = (student, room, ev) => {
    console.log("Dragging", student);
    this.draggingStudent = student;
    this.draggingFromRoom = room;
  };

  handleDragEnd = ev => {
    delete this.draggingStudent;
  };

  handleDragOver = ev => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  handleDrop = (room, ev) => {
    const { round } = this.props;
    // ev.preventDefault();
    if (!this.draggingStudent || !room) {
      return;
    }

    const dropRoom = round.get(`room-${room}`);
    dropRoom.push(this.draggingStudent);
    round.set(`room-${room}`, dropRoom);

    const from = _.without(
      round.get(this.draggingFromRoom),
      this.draggingStudent
    );
    round.set(this.draggingFromRoom, from);
  };

  render() {
    const { game, round, stage, player } = this.props;

    const task = round.get("task");
    console.log(round);
    task.rooms.map(room => console.log(round.get(`room-${room}`)));

    return (
      <div className="task">
        <div className="left">
          <div className="payoff">
            <table className="pt-table">
              <thead>
                <tr>
                  <th />
                  {task.rooms.map(room => <th key={room}>Room {room}</th>)}
                </tr>
              </thead>
              <tbody>
                {task.students.map(student => (
                  <tr key={student}>
                    <th>Student {student}</th>
                    {task.rooms.map(room => (
                      <td key={room}>{task.payoff[student][room]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="constraints">
            <h5>Constraints</h5>
            <ul>
              {task.constraints.map(constraint => (
                <li key={constraint._id}>
                  {constraint.pair.join(" and ")} {constraint.text}.
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="board">
          <div className="student-deck">
            {round.get("deck").map(student => (
              <div
                draggable
                onDragStart={this.handleDragStart.bind(this, student, "deck")}
                onDragEnd={this.handleDragEnd}
                className="student"
                key={student}
              >
                {student}
              </div>
            ))}
          </div>

          <div className="rooms">
            {task.rooms.map(room => (
              <div
                onDrop={this.handleDrop.bind(this, room)}
                onDragOver={this.handleDragOver}
                className="room"
                key={room}
              >
                <h6>Room {room}</h6>
                {round.get(`room-${room}`).map(student => (
                  <div
                    draggable
                    onDragStart={this.handleDragStart.bind(
                      this,
                      student,
                      `room-${room}`
                    )}
                    className="student"
                    key={student}
                  >
                    {student}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/*<TaskStimulus round={round} stage={stage} player={player} />*/}
        {/*<TaskResponse round={round} stage={stage} player={player} game={game} />*/}
      </div>
    );
  }
}
