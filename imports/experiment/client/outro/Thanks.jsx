import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  
  render() {
    const { player, game } = this.props;
    return (
      <Centered>
        <div className="game finished">
          <div className="pt-non-ideal-state">
            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
              <span className="pt-icon pt-icon-thumbs-up" />
            </div>
            <h4 className="pt-non-ideal-state-title">Finished!</h4>
            <hr />
            <h4 className="pt-non-ideal-state-title">
              Submission code: {player._id}
            </h4>
            <h4 className="pt-non-ideal-state-title">
              Total pay: ${player.get("bonus") + game.treatment.basePay ||
            " [will be computed later]"}
            </h4>
            <hr />
            <div className="pt-non-ideal-state-description">
              Thank you for participating!
            </div>
          </div>
        </div>
      </Centered>
    );
  }
}
