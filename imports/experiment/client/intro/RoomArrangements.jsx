import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class RoomArrangements extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Task Room Arrangements</h1>
          <p>
            Depending on the number of rooms, number of students, and your
            screen/browser size and resolution, the arrangement of the rooms
            might "look" different in your screen.
          </p>

          <div className="image">
            <img src="experiment/instruction-room-arrangements.svg" />
          </div>

          <p>
            In all cases and for any arrangement that appears for you, you only
            need to consider the numbers on those rooms when addressing
            constraints in a task. In particular,{" "}
            <strong>
              "neighbor" is defined as rooms with consecutive numbers
            </strong>. For example, regardless of the arrangement you have on
            the screen, Room 102 is next door to both Room 101 and Room 103. On
            the other hand, Room 101 is only next door to Room 102.
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
