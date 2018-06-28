import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class MoreAboutBonus extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Final words about Performance and Bonuses</h1>

          {/*<p>*/}
          {/*Your goal in each task is to find the room assignment plan that*/}
          {/*maximizes overall satisfaction for the group of students, while*/}
          {/*respecting all constraints in that task.*/}
          {/*</p>*/}

          <p>
            Remember,{" "}
            <strong>
              your score starts counting only when you have a complete
              assignment (that is, each student has been assigned to a room
            </strong>. The "score" of your assignment is:
          </p>

          <div style={{ textAlign: "center" }}>
            <p>
              <strong>
                S = The sum of students' ratings of their assigned rooms - 100 *
                the number of violated constraints
              </strong>
            </p>
          </div>
          <p>
            That means,{" "}
            <strong>
              for each constraint you violate, you get 100 points deducted
            </strong>
          </p>

          <p>
            As a team, <strong>you will submit ONE answer per task</strong> and
            therefore you will have <strong>only one score</strong>.
          </p>

          <p>
            There are two parts of the bonus that you will have opportunity to
            earn in each task:
          </p>

          <p>
            The first part of bonus is{" "}
            <strong>"performance-based bonus":</strong> When your score is
            positive , no matter whether your answer is the BEST possible
            assignment or not.
          </p>

          <p>
            The second part is <strong>"optimal assignment bonus" </strong>: if
            your answer is the BEST possible assignment.
          </p>

          <div style={{ textAlign: "center" }}>
            <p>
              <strong>
                You should try to find a complete room assignment with a score
                that is as high as possible to earn more bonus in each task!
              </strong>
            </p>
          </div>

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
