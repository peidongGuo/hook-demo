import React, { Component, useState, useEffect } from "react";

const useTimer = () => {
  const [count, setCount] = useState(0);
  let timer = null;

  // TODO 待修改，需要用来证明卸载时执行的程序
  useEffect(() => {
    generateTimer();
    return clearTimer;
  });

  const generateTimer = () => {
    timer = setTimeout(() => {
      setCount(count + 1);
      generateTimer();
    }, 1000);
  };

  const clearTimer = () => {
    clearTimeout(timer);
  };
  return count;
};

export default useTimer;
