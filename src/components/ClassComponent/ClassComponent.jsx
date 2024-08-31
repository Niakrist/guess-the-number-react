import React from "react";
import style from "./ClassComponent.module.css";
import PropTypes from "prop-types";

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "Угадай число",
      userNumber: "",
      count: 0,
      buttonName: "Угадать",
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.buttonName === "Угадать") {
      this.setState((state) => {
        if (!this.state.userNumber) return state;
        if (state.userNumber > state.randomNumber) {
          return {
            userNumber: "",
            result: `${state.userNumber} больше загаданного`,
            count: state.count + 1,
          };
        }
        if (state.userNumber < state.randomNumber) {
          return {
            result: `${state.userNumber} меньше загаданного`,
            userNumber: "",
            count: state.count + 1,
          };
        }
        return {
          result: `Вы угадали заганное число ${state.randomNumber}`,
          userNumber: "",
          buttonName: "Сыграть ещё",
          count: state.count + 1,
        };
      });
    } else if (this.state.buttonName === "Сыграть ещё") {
      this.setState({
        result: "Угадай число",
        userNumber: "",
        count: 0,
        buttonName: "Угадать",
        randomNumber:
          Math.floor(Math.random() * this.props.max - this.props.min) +
          this.props.min,
      });
    } else {
      console.error("Не предвиденная ошибка");
    }
  };

  handleChange = (e) => {
    this.setState((state) => ({ ...state, userNumber: e.target.value }));
  };

  getQuantityAttempt() {
    if (this.state.count > 0) {
      return `Количество попыток: ${this.state.count}`;
    } else {
      return "";
    }
  }

  detWinStyle() {
    return this.state.buttonName === "Угадать" ? style.btn : style.btnWin;
  }

  render() {
    console.log("state: ", this.state);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <p className={style.attempt}>{this.getQuantityAttempt()}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>
          <input
            className={style.input}
            type="number"
            id="user_number"
            value={this.state.userNumber}
            onChange={this.handleChange}
          />
          <button className={this.detWinStyle()}>
            {this.state.buttonName}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
