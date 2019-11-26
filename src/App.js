import React, { createContext, useState } from "react";
import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import GlobalContext from "./context.js";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import TodoListHook from "./pages/TodoListHook";

function App() {
  const [username, setUsername] = useState("gpd");

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{ username: username, updateUsername: setUsername }}
      >
        <Router>
          <header>
            <ul className="nav-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todoList">待办事项-原生实现</Link>
              </li>
              <li>
                <Link to="/todoListHook/gpd">待办事项- Hook 实现</Link>
              </li>
            </ul>
          </header>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/todoList" exact component={TodoList} />
            <Route path="/todoListHook/:user" exact component={TodoListHook} />
          </Switch>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
