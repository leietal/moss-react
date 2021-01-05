import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, removeTodo, updateTodo, select, unselect } from "../actions";
import "../components/TodoList.css";

class TodoList extends Component {
  constructor(args) {
    super(args);
    this.state = {
      date: new Date(),
    };
  }

  addHandler = (e) => {
    if (e.charCode === 13) {
      const value = e.target.value;
      if (!value || !value.trim()) {
        return;
      }
      // 添加todo
      this.props.addTodo({
        content: value,
        status: "undo",
      });
      // 清空输入框
      e.target.value = null;
    }
  };

  removeHandler = (id) => {
    this.props.removeTodo(id);
  };

  updateHandler = (id, item) => {
    this.props.updateTodo({ id, item });
  };

  triggerCheck = (value, selected) => {
    if (selected) {
      this.props.unselect(value);
    } else {
      this.props.select(value);
    }
  };

  formatNumber = (startTime, endTime) => {
    let second = 1000; // 秒
    let minute = second * 60; // 分
    let hour = minute * 60; // 时
    let day = hour * 24; // 天

    let num = parseInt(endTime - startTime);

    let d = parseInt(num / day);
    if (d > 1) {
      return d + " 天";
    }

    let h = parseInt(num / hour);
    if (h > 1) {
      return h + " 小时";
    }

    let m = parseInt(num / minute);
    if (m > 1) {
      return m + " 分";
    }

    let s = parseInt(num / second);
    return s + " 秒";
  };

  render() {
    const { list, selecteds } = this.props;
    return (
      <div className="container">
        <h1>TODO</h1>
        <h4>{this.state.date.toDateString()}</h4>
        <div>
          <input
            className="todo-input"
            onKeyPress={this.addHandler}
            type="text"
            placeholder="在这输入，按回车保存"
          ></input>
          <div className="status-list">
            <span
              className={
                "status-item item-undo " +
                (selecteds.undo ? "status-item-active" : "")
              }
              onClick={() => this.triggerCheck("undo", selecteds.undo)}
            >
              待做
            </span>
            <span
              className={
                "status-item item-doing " +
                (selecteds.doing ? "status-item-active" : "")
              }
              onClick={() => this.triggerCheck("doing", selecteds.doing)}
            >
              进行中
            </span>
            <span
              className={
                "status-item item-done " +
                (selecteds.done ? "status-item-active" : "")
              }
              onClick={() => this.triggerCheck("done", selecteds.done)}
            >
              已完成
            </span>
          </div>
        </div>
        {list && list.length ? (
          <div className="todo-list">
            {list
              .sort((first, second) => {
                let f =
                  first.status === "doing"
                    ? 3
                    : first.status === "undo"
                    ? 2
                    : 1;
                let s =
                  second.status === "doing"
                    ? 3
                    : second.status === "undo"
                    ? 2
                    : 1;
                return s - f;
              })
              .filter((item) => selecteds[item.status])
              .map((item, index) => {
                return (
                  <TodoItem
                    key={index}
                    {...item}
                    removeTodo={this.removeHandler}
                    updateTodo={this.updateHandler}
                    formatNumber={this.formatNumber}
                  />
                );
              })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

// 无状态组件
const TodoItem = ({
  content,
  status,
  removeTodo,
  updateTodo,
  formatNumber,
  startTime,
  endTime,
  id,
}) => {
  return (
    <div className="todo-item">
      <span
        className={"item-prefix " + (status ? "item-prefix-" + status : "")}
      ></span>
      <span className="item-content">{content}</span>
      {status === "undo" ? (
        <span
          className="item-btn item-start"
          onClick={() => updateTodo(id, { status: "doing" })}
        >
          开始
        </span>
      ) : (
        ""
      )}

      {status === "doing" ? (
        <span
          className="item-btn item-complete"
          onClick={() => updateTodo(id, { status: "done" })}
        >
          完成
        </span>
      ) : (
        ""
      )}

      {status === "done" ? (
        <span className="item-time">
          用时 {formatNumber(startTime, endTime)}
        </span>
      ) : (
        ""
      )}

      <span className="item-btn item-remove" onClick={() => removeTodo(id)}>
        删除
      </span>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    list: state.list,
    selecteds: state.selecteds,
  };
}

function mapDispatchProps(dispatch) {
  return {
    addTodo: (arg) => dispatch(addTodo(arg)),
    removeTodo: (arg) => dispatch(removeTodo(arg)),
    updateTodo: (arg) => dispatch(updateTodo(arg)),
    select: (arg) => dispatch(select(arg)),
    unselect: (arg) => dispatch(unselect(arg)),
  };
}

export default connect(mapStateToProps, mapDispatchProps)(TodoList);
