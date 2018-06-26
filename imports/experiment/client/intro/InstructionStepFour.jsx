import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class InstructionStepFour extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1>You will be part of a team</h1>
          <p>
            In this game, you will{" "}
            <strong>
              play together with {treatment.playerCount - 1} other participants
            </strong>. They are other MTurk workers who are undertaking the same
            experiment simultaneously. In total, you will{" "}
            <strong>play {treatment.nRounds} rounds with them.</strong> In this
            game, the team will submit only one answer, and therefore,{" "}
            <strong>all members of the team will receive the same bonus</strong>{" "}
            based on the team cumulative performance across all tasks.
          </p>

          <p>
            Note that the game allows for simultaneous and real-time actions.
            That means you will be able to drag students to assign them to rooms
            while other participants are doing the same. However, when a
            participant starts dragging a student, that student will be locked
            (i.e., no one else can move it) until it is dropped. The student
            that is looked will be highlighted by the color of the participant
            moving it.
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
