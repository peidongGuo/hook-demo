import React, { Component, useState, useEffect } from "react";
import {
  useParams,
  useHistory,
  useLocation,
  useRouteMatch
} from "react-router-dom";
import "./TodoList.css";
import usePageinfo from "../hooks/usePageinfo";
import useTimer from "../hooks/useTimer";

const TodoListHook = () => {
  usePageinfo();
  const viewTime = useTimer();

  const [inputItem, setInputItem] = useState("");
  const [listFlag, setListFlag] = useState("all");
  const [allList, setAllList] = useState([]);
  let timer = null;
  let count = 0;

  // 需要用来证明卸载时执行的程序
  useEffect(() => {
    generateTimer();
    return clearTimer;
  }, []);

  // 初始待办事项列表数据
  useEffect(() => {
    const listData = [
      {
        title: "敲代码",
        isCompleted: false
      },
      {
        title: "写PPT",
        isCompleted: true
      },
      {
        title: "分享",
        isCompleted: false
      }
    ];
    setAllList(listData);
  }, []);

  // 设置列表状态
  useEffect(() => {
    setListFlag("activing");
  }, []);

  const generateTimer = () => {
    timer = setTimeout(() => {
      localStorage.setItem("test-timer", count++);
      generateTimer();
    }, 1000);
  };

  const clearTimer = () => {
    clearTimeout(timer);
  };

  const handleInputItem = e => {
    setInputItem(e.target.value);
  };

  const handleItemStatus = (e, index) => {
    e.persist();
    let items = [...allList];
    console.log(items, index);
    items[index].isCompleted = e.target.checked;
    setAllList([...items]);
  };

  const handleItemEdit = (index, isEdit) => {
    // e.persist();
    let items = [...allList];
    items[index].isEditing = !!isEdit;
    setAllList([...items]);
  };

  const handleItemTitle = (e, index) => {
    e.persist();
    let items = [...allList];
    console.log(items, index);
    items[index].title = e.target.value;
    setAllList([...items]);
  };

  const handleItemDelete = index => {
    let items = [...allList];
    items.splice(index, 1);
    setAllList([...items]);
  };

  const handleListChg = listFlag => {
    setListFlag(listFlag);
  };

  const handleAddItem = event => {
    if (event.keyCode !== 13) {
      return;
    }
    if (!inputItem) {
      return;
    }
    let tmpItem = { title: inputItem, isCompleted: false };
    let items = [...allList];
    items.push(tmpItem);
    setInputItem("");
    setAllList(items);
  };

  const handleClearCompleted = () => {
    let items = [...allList];
    items.forEach((item, index) => {
      item.isCompleted && items.splice(index, 1);
    });
    setAllList(items);
  };

  return (
    <div className="todoList">
      <h2>页面已经被浏览：{viewTime} 秒！</h2>
      <div className="todoapp">
        <div>
          <div className="header">
            <h1>todos - hook</h1>
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all" />
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputItem}
              onChange={handleInputItem}
              onKeyDown={handleAddItem}
              autoFocus={true}
            />
          </div>
          <div className="main">
            <ul className="todo-list">
              {allList.map((item, index) => {
                return (
                  (listFlag === "all" ||
                    (listFlag === "activing" && !item.isCompleted) ||
                    (listFlag === "completed" && item.isCompleted)) && (
                    <li
                      className={item.isCompleted ? "completed" : ""}
                      className={item.isEditing ? "editing" : ""}
                      key={index}
                      onDoubleClick={() => {
                        handleItemEdit(index, true);
                      }}
                    >
                      <div className="view">
                        <input
                          className="toggle"
                          type="checkbox"
                          checked={item.isCompleted}
                          onChange={e => {
                            handleItemStatus(e, index);
                          }}
                        />
                        <label>{item.title}</label>
                        <button
                          className="destroy"
                          onClick={() => {
                            handleItemDelete(index);
                          }}
                        />
                      </div>
                      <input
                        className="edit"
                        value={item.title}
                        onChange={e => {
                          handleItemTitle(e, index);
                        }}
                        onBlur={e => {
                          handleItemEdit(index, false);
                        }}
                      />
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          <footer className="footer">
            <span className="todo-count">
              <strong>
                {allList.filter(item => !item.isCompleted).length}
              </strong>
              <span> </span>
              <span>items</span>
              <span> left</span>
            </span>
            <ul className="filters">
              <li>
                <a
                  href="#/"
                  onClick={() => {
                    handleListChg("all");
                  }}
                  className={listFlag === "all" ? "selected" : ""}
                >
                  All
                </a>
              </li>
              <span> </span>
              <li>
                <a
                  href="#/active"
                  onClick={() => {
                    handleListChg("activing");
                  }}
                  className={listFlag === "activing" ? "selected" : ""}
                >
                  Active
                </a>
              </li>
              <span> </span>
              <li>
                <a
                  href="#/completed"
                  onClick={() => {
                    handleListChg("completed");
                  }}
                  className={listFlag === "completed" ? "selected" : ""}
                >
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-completed" onClick={handleClearCompleted}>
              Clear completed
            </button>
          </footer>
        </div>
      </div>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="http://github.com/petehunt/">petehunt</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};

export default TodoListHook;
