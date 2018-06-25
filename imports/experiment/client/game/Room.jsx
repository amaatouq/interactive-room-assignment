import React from "react";

import Student from "./Student.jsx";

export default class Room extends React.Component {
  state = { hovered: false };

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    this.setState({ hovered: true });
  };

  handleDragLeave = e => {
    this.setState({ hovered: false });
  };

  handleDrop = e => {
    const { round, player, room } = this.props;
    const student = e.dataTransfer.getData("text/plain");

    this.setState({ hovered: false });

    // Avoid any unwanted drops! And don't change if same room.
    // We're using the native DnD system, which mean people can drag anything
    // onto these drop zones (e.g. files from their desktop) so we check this
    // is an existing student first.
    const currentRoom = round.get(`student-${student}-room`);
    if (!currentRoom) {
      return;
    }
    
    //if they kept the student where it is, log that they stayed in the same place
    if (currentRoom === room) {
      round.append("log", {
        verb: "keptStudent",
        subjectId: player._id,
        object: student,
        target: room,
        at: new Date()
      });
    }

    round.set(`student-${student}-room`, room);

    round.append("log", {
      verb: "movedStudent",
      subjectId: player._id,
      object: student,
      target: room,
      at: new Date()
    });
  };

  render() {
    const { room, isDeck, round, ...rest } = this.props;
    const { hovered } = this.state;
    const students = [];
    const task = round.get("task");
    task.students.forEach(student => {
      if (round.get(`student-${student}-room`) === room) {
        students.push(student);
      }
    });

    const classNameRoom = isDeck ? "deck pt-elevation-1" : "room";
    const classNameHovered = hovered ? "pt-elevation-3" : "";
    return (
      <div
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        className={`pt-card ${classNameRoom} ${classNameHovered}`}
      >
        {isDeck ? null : <h6>Room {room}</h6>}
        {students.map(student => (
          <Student
            onDragStart={this.handleDragStart}
            key={student}
            student={student}
            room={room}
            round={round}
            {...rest}
          />
        ))}
      </div>
    );
  }
}
