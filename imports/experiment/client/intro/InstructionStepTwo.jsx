import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class InstructionStepTwo extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Task: Room Assignment </h1>
          <p>
            In each task of this HIT, you will be asked to assign students to
            dorm rooms. Students express their degree of satisfaction for living
            in a room as a number between 0 and 100 (the higher the rating, the
            more satisfied the student is). The table below shows an example of
            a task with 4 students need to be assigned to 3 rooms:
          </p>

          <p>[TODO: We will show the table and example of board here]</p>

          <p>
            You are provided with a handy <strong>drag and drop</strong> tool to
            solve the problem. To assign a student into a room, simply drag the
            icon of that student and drop it into the corresponding room.
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
