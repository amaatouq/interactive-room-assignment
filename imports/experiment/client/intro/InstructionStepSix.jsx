import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class InstructionStepFive extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> More about Performance and Bonuses</h1>
          <p>
            If your submitted answer in a task is a{" "}
            <strong>
              complete assignment (that is, each student has been assigned to a
              room)
            </strong>, you will be able to earn a bonus payment in that task.
            The bonus amount is decided by the "score" of your answer, which is
            defined as:
          </p>

          <p>
            <strong>
              <em>
                S = The sum of students' ratings of their assigned rooms - 100 *
                the number of violated constraints
              </em>
            </strong>
          </p>
          <p>
            That means,{" "}
            <strong>
              for each constraint you violate, you get 100 points deducted
            </strong>{" "}
            from all students' ratings of their assigned rooms.
          </p>

          <p>
            As a team, you will submit one answer and therefore you will have{" "}
            <strong>only one score</strong>. Your total payment will be based on
            the cumulative score across all tasks.
          </p>

          <p>
            There are two parts of bonus that you will have opportunity to earn
            in each task:
          </p>

          <p>
            The first part of bonus is{" "}
            <strong>
              "performance-based bonus": When your score S in a task is positive
            </strong>, no matter whether your answer is the optimal assignment
            or not, we will convert your score to a performance-based bonus
            payment at a 500:1 ratio (i.e., a score of 100 is equivalent to a
            bonus of $0.20).
          </p>

          <p>
            The second part is{" "}
            <strong>
              "optimal assignment bonus." Specifically, if your submitted answer
              in the task is indeed the optimal assignment in that task (i.e.,
              the assignment that maximizes overall satisfaction of the group of
              students and respects all constraints)
            </strong>, in addition to the performance-based bonus, we will give
            you an additional "optimal assignment bonus" of $0.50 for that task.
          </p>

          <p>
            Note that{" "}
            <strong>
              <em>
                you can NOT earn bonus in a task if your submitted answer is not
                a complete assignment
              </em>
            </strong>, so you should try to find a complete room assignment with
            a score that is as high as possible to earn more bonus in each task!
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
