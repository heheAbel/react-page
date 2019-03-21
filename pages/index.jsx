import React, { Component } from "react";

import Less from "./less";
import Greater from "./greater";

import "./pages.css";

class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesNumber: 0,
      pagesArr: [],
      chooseNumber: 1,
      jumpNumber: ""
    };
    this.changeNumber = this.changeNumber.bind(this);
    this.addSubtractFun = this.addSubtractFun.bind(this);
    this.jumpNumberFun = this.jumpNumberFun.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.callbackFun = this.callbackFun.bind(this);
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
    }
  }
  render() {
    const { pagesNumber, pagesArr, chooseNumber, jumpNumber } = this.state;
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
              跳转&nbsp;
              <input
                type="text"
                value={jumpNumber}
                onChange={even => this.inputNumber(even)}
              />
              &nbsp;页
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
      </div>
    );
  }
}

export default Paging;
