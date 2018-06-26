import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class InstructionStepThree extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1>Task: Constraints</h1>
          <p>
            You also need to consider a few constraints when assigning students
            to rooms, such as some students can't live together in the same room
            or some students must be neighbors. These constraints vary from task
            to task, and there are no additional constraints you need to respect
            other than the ones stated in the task (e.g., feel free to leave one
            room empty if no constraint requires you to assign at least one
            student in each room).
          </p>

          <p>
            Your job in each task is to find the room assignment plan that
            maximizes overall satisfaction for the group of students, while
            respecting all constraints in that task.
          </p>
          
          <p>[TODO: show example of constraints]</p>

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
