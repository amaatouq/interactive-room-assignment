import React from "react";
import moment from "moment";

export default class SocialInteractions extends React.Component {
  state = { comment: "" };

  handleChange = e => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const text = this.state.comment.trim();
    if (text !== "") {
      const { round, player } = this.props;
      round.append("chat", {
        text,
        playerId: player._id
      });
      this.setState({ comment: "" });
    }
  };

  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <img src={player.get("avatar")} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.get("nameColor") }}>
          {player.get("name")}
          {self ? " (You)" : ""}
        </span>
      </div>
    );
  }

  render() {
    const { game, round, player } = this.props;
    const { comment } = this.state;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    const messages = round.get("chat").map(({ text, playerId }) => ({
      text,
      subject: game.players.find(p => p._id === playerId)
    }));
    const events = round.get("log").map(({ subjectId, ...rest }) => ({
      subject: subjectId && game.players.find(p => p._id === subjectId),
      ...rest
    }));

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players pt-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map(p => this.renderPlayer(p))}
          </div>

          <div className="total-score pt-card">
            <h6>Total Score</h6>

            <h2>{game.get("cumulativeScore") || 0}</h2>
          </div>
        </div>

        <div className="eventlog pt-card">
          <EventLog events={events} player={player} />
        </div>
        <div className="chat pt-card">
          <Messages messages={messages} player={player} />
          <form onSubmit={this.handleSubmit}>
            <div className="pt-control-group">
              <input
                name="comment"
                type="text"
                className="pt-input pt-fill"
                placeholder="Enter chat message"
                value={comment}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <button type="submit" className="pt-button pt-intent-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class Author extends React.Component {
  render() {
    const { player, self } = this.props;

    return (
      <div className="author">
        <img src={player.get("avatar")} />
        <span className="name" style={{ color: player.get("nameColor") }}>
          {self ? "You" : player.get("name")}
        </span>
      </div>
    );
  }
}

class Message extends React.Component {
  render() {
    const { text,subject } = this.props.message;
    const {self } = this.props;
    return (
      <div className="message">
        <Author player={subject} self={self} />
        {text}
      </div>
    );
  }
}

const chatSound = new Audio("experiment/unsure.mp3");
class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      chatSound.play();
    }
  }

  render() {
    const { messages, player } = this.props;
    console.log("messages",messages);

    return (
      <div className="messages" ref={el => (this.messagesEl = el)}>
        {messages.length === 0 ? (
          <div className="empty">No messages yet...</div>
        ) : null}
        {messages.map((message, i) => <Message key={i} message={message} self={message.subject ? player._id === message.subject._id : null}  />)}
      </div>
    );
  }
}

class Event extends React.Component {
  render() {
    const {
      subject,
      roundId,
      verb,
      object,
      target,
      state,
      at
    } = this.props.event;
    const { self } = this.props;
    let content;
    switch (verb) {
      case "roundStarted":
        content = <div className="content">Round {roundId} started</div>;
        break;
      case "movedStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> moved{" "}
            <div className="object">{object}</div> to{" "}
            <div className="target">Room {target}</div>.
          </div>
        );
        break;
      case "draggingStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> started moving{" "}
            <div className="object">{object}</div>.
          </div>
        );
        break;
      case "keptStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> kept{" "}
            <div className="object">{object}</div> in{" "}
            <div className="target">Room {target}</div>.
          </div>
        );
        break;
      case "releasedStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> released{" "}
            <div className="object">{object}</div> without moving it.
          </div>
        );
        break;
      case "playerSatisfaction":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> is{" "}
            <div className="object">{state}</div> with the answer
          </div>
        );
        break;
      default:
        console.error(`Unknown Event: ${verb}`);

        return null;
    }

    return (
      <div className="event">
        {/*
          Not sure we even need to show am/pm. I think we need seconds since the
          interactions are quick but to save space we can probably skip am/pm
          for the sake of space. We could maybe also just but the seconds since
          start of round or remaining second before end of round, might be more
          relevant. Might or might not be clear.
        */}
        {/* <div className="timestamp">{moment(at).format("hh:mm:ss a")}</div> */}
        <div className="timestamp">{moment(at).format("hh:mm:ss")}</div>
        {content}
      </div>
    );
  }
}

class EventLog extends React.Component {
  componentDidMount() {
    this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events.length < this.props.events.length) {
      this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
    }
  }

  render() {
    const { events, player } = this.props;
    
  
    //if the one who made the event is the player himself then self will be true
    return (
      <div className="events" ref={el => (this.eventsEl = el)}>
        {events.map((event, i) => <Event key={i} event={event} self={event.subject ? player._id === event.subject._id : null} />)}
      </div>
    );
  }
}
