import React, { Component, useState, useEffect, useContext } from "react";
import GlobalContext from "../context.js";
import usePageinfo from "../hooks/usePageinfo";
import useTimer from "../hooks/useTimer";

import "./TodoList.css";

const Home = () => {
  const globalContext = useContext(GlobalContext);
  console.log(globalContext);
  usePageinfo();
  const viewTime = useTimer();

  return (
    <div>
      <h1>这是 Home 页面！</h1>
      <h2>页面已经被浏览：{viewTime} 秒！</h2>
      <h2>当前用户是：{globalContext.username}</h2>
      <button
        className="update"
        type="button"
        onClick={() => globalContext.updateUsername("sjs")}
      >
        修改用户名为 “sjs”
      </button>
    </div>
  );
};

export default Home;
