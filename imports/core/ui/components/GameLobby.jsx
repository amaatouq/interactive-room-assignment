import { Alert, Intent } from "@blueprintjs/core";
import React from "react";

import { CoreWrapper } from "./Helpers.jsx";
import {
  endPlayerTimeoutWait,
  extendPlayerTimeoutWait
} from "../../api/players/methods.js";

export default class GameLobby extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps);
  }

  handleWaitLonger = () => {
    extendPlayerTimeoutWait.call({ playerId: this.props.player._id });
  };

  handleExitNow = () => {
    endPlayerTimeoutWait.call({ playerId: this.props.player._id });
  };

  render() {
    const { gameLobby, treatment, timedOut, lobbyConfig, player } = this.props;

    const total = treatment.condition("playerCount").value;
    const exisiting = gameLobby.playerIds.length;

    if (exisiting >= total) {
      return (
        <CoreWrapper>
          <div className="game-lobby">
            <div className="pt-non-ideal-state">
              <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                <span className="pt-icon pt-icon-play" />
              </div>
              <h4 className="pt-non-ideal-state-title">Game loading...</h4>
              <div className="pt-non-ideal-state-description">
                <p>You game will be starting shortly, get ready!</p>
              </div>
            </div>
          </div>
        </CoreWrapper>
      );
    }

    const showExtensionAlert =
      timedOut &&
      lobbyConfig.timeoutType === "individual" &&
      lobbyConfig.extendCount >= player.timeoutWaitCount;

    return (
      <CoreWrapper>
        <div className="game-lobby">
          <div className="pt-non-ideal-state">
            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
              <span className="pt-icon pt-icon-time" />
            </div>
            <h4 className="pt-non-ideal-state-title">Lobby</h4>
            <div className="pt-non-ideal-state-description">
              <p>
                {exisiting} / {total} players ready.
              </p>
              <br/>
              
              <p>Please wait while we try to find the needed participants.</p>
              
              <br/>
              <p>
                If we can't find enough participants we will cancel the game and
                pay you for your time.
              </p>
              <br/>
              <p>
                <strong>
                  Please make sure your sound is on as a bell will ring to
                  indicate the start of the game.
                </strong>
              </p>
            </div>
          </div>
        </div>
        <Alert
          intent={Intent.PRIMARY}
          isOpen={showExtensionAlert}
          confirmButtonText="Wait Longer"
          cancelButtonText="Exit Now"
          onConfirm={this.handleWaitLonger}
          onCancel={this.handleExitNow}
        >
          <p>
            Sorry you have been waiting for a while. Do you wish to wait longer
            or exit now?
          </p>
        </Alert>
      </CoreWrapper>
    );
  }
}
