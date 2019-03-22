import React, { Component } from "react";

import Less from "./less";
import Greater from "./greater";

import "./pages.css";

function AlterFun(props) {
  return (
    <div
      className={`eble-alter ${props.alterBool ? "eble-alter-display" : null}`}
    >
      <svg
        t="1553238219192"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1152"
        width="40"
        height="40"
      >
        <defs>
          <style type="text/css" />
        </defs>
        <path
          d="M512 139.636364L81.454545 884.363636h863.418182L512 139.636364z m37.236364 307.2l-9.309091 242.036363h-58.181818l-9.309091-242.036363h76.8z m-34.909091 356.072727c-13.963636 0-25.6-4.654545-32.581818-11.636364-9.309091-6.981818-11.636364-16.290909-11.636364-27.927272s4.654545-20.945455 11.636364-27.927273c9.309091-6.981818 18.618182-11.636364 30.254545-11.636364s23.272727 4.654545 30.254545 11.636364c6.981818 6.981818 11.636364 16.290909 11.636364 27.927273s-4.654545 20.945455-11.636364 27.927272c-6.981818 9.309091-16.290909 11.636364-27.927272 11.636364z"
          fill="#f4ea2a"
          p-id="1153"
        />
      </svg>
      <p>{props.alterText}</p>
      <button onClick={props.closeAlter}>Sure</button>
    </div>
  );
}

class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesNumber: 0,
      pagesArr: [],
      chooseNumber: 1,
      jumpNumber: "",
      alterBool: false,
      alterText: ""
    };
    this.changeNumber = this.changeNumber.bind(this);
    this.addSubtractFun = this.addSubtractFun.bind(this);
    this.jumpNumberFun = this.jumpNumberFun.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.callbackFun = this.callbackFun.bind(this);
    this.closeAlter = this.closeAlter.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pagesNumber !== state.pagesNumber) {
      const temporaryArr = [];
      for (let i = 1; i <= props.pagesNumber; i += 1) {
        temporaryArr.push(i);
      }
      return {
        pagesNumber: props.pagesNumber,
        pagesArr: temporaryArr
      };
    }
    return null;
  }
  closeAlter() {
    this.setState({ alterBool: false });
  }
  callbackFun(performFun) {
    if (performFun) {
      performFun(this.state.chooseNumber);
    }
  }
  changeNumber(chooseNumber, performFun) {
    this.setState({ chooseNumber }, () => {
      this.callbackFun(performFun);
    });
  }
  addSubtractFun(boolean, performFun) {
    const { chooseNumber, pagesNumber } = this.state;
    if (boolean && chooseNumber > 1) {
      this.setState({ chooseNumber: chooseNumber - 1 }, () => {
        this.callbackFun(performFun);
      });
    } else if (!boolean && chooseNumber < pagesNumber) {
      this.setState({ chooseNumber: chooseNumber + 1 }, () => {
        this.callbackFun(performFun);
      });
    }
  }
  inputNumber(even) {
    const temporaryNumber = parseInt(even.target.value, 10);
    if (!isNaN(temporaryNumber)) {
      this.setState({ jumpNumber: temporaryNumber });
    } else {
      this.setState({ jumpNumber: "" });
    }
  }
  jumpNumberFun(performFun) {
    const { pagesNumber, jumpNumber } = this.state;
    if (!isNaN(jumpNumber) && jumpNumber >= 1 && jumpNumber <= pagesNumber) {
      this.setState({ chooseNumber: jumpNumber }, () => {
        this.callbackFun(performFun);
      });
    } else {
      this.setState({ alterBool: true });
      this.setState({
        alterText: `Please enter number from 1 ~ ${this.props.pagesNumber}`
      });
    }
  }
  render() {
    const {
      pagesNumber,
      pagesArr,
      chooseNumber,
      jumpNumber,
      alterBool,
      alterText
    } = this.state;
    const firstLastPageIsBool = Object.prototype.toString.call(
      this.props.firstLastPage
    );
    const firstLastPage =
      firstLastPageIsBool !== "[object Undefined]" &&
      firstLastPageIsBool === "[object Boolean]"
        ? this.props.firstLastPage
        : true;
    const addSubtractPageIsBool = Object.prototype.toString.call(
      this.props.addSubtractPage
    );
    const addSubtractPage =
      addSubtractPageIsBool !== "[object Undefined]" &&
      addSubtractPageIsBool === "[object Boolean]"
        ? this.props.addSubtractPage
        : true;
    const jumpPageIsBool = Object.prototype.toString.call(this.props.jumpPage);
    const jumpPage =
      jumpPageIsBool !== "[object Undefined]" &&
      jumpPageIsBool === "[object Boolean]"
        ? this.props.jumpPage
        : false;
    const onlyOneBool = Object.prototype.toString.call(this.props.onlyOneBool);
    const onlyOne =
      onlyOneBool !== "[object Undefined]" && onlyOneBool === "[object Boolean]"
        ? this.props.onlyOneBool
        : false;
    if (!onlyOne && this.props.pagesNumber === 1) {
      return null;
    }
    return (
      <div className="eble-page">
        <ul className="eble-page-ul">
          {firstLastPage ? (
            <li
              className={chooseNumber === 1 ? "forbid-page" : null}
              onClick={even =>
                this.changeNumber(1, this.props.performFun, even)
              }
            >
              &lt;&lt;
            </li>
          ) : null}
          {addSubtractPage ? (
            <li
              className={chooseNumber === 1 ? "forbid-page" : null}
              onClick={even =>
                this.addSubtractFun(true, this.props.performFun, even)
              }
            >
              &lt;
            </li>
          ) : null}
          {pagesNumber <= 10 ? (
            <Less
              pagesArr={pagesArr}
              chooseNumber={chooseNumber}
              changeNumber={this.changeNumber}
              performFun={this.props.performFun}
              {...this.props}
            />
          ) : (
            <Greater
              chooseNumber={chooseNumber}
              changeNumber={this.changeNumber}
              performFun={this.props.performFun}
              {...this.props}
            />
          )}
          {addSubtractPage ? (
            <li
              className={chooseNumber === pagesNumber ? "forbid-page" : null}
              onClick={even =>
                this.addSubtractFun(false, this.props.performFun, even)
              }
            >
              &gt;
            </li>
          ) : null}
          {firstLastPage ? (
            <li
              className={chooseNumber === pagesNumber ? "forbid-page" : null}
              onClick={even =>
                this.changeNumber(pagesNumber, this.props.performFun, even)
              }
            >
              &gt;&gt;
            </li>
          ) : null}
          {jumpPage ? (
            <li className="jump-page">
              Jump&nbsp;
              <input
                type="text"
                value={jumpNumber}
                onChange={even => this.inputNumber(even)}
              />
              &nbsp;page
              <button
                onClick={even =>
                  this.jumpNumberFun(this.props.performFun, even)
                }
              >
                Go
              </button>
            </li>
          ) : null}
        </ul>
        <AlterFun
          alterText={alterText}
          alterBool={alterBool}
          closeAlter={this.closeAlter}
          {...this.props}
        />
      </div>
    );
  }
}

export default Paging;
