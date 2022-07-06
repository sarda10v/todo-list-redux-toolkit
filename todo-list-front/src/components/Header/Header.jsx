import React from "react";
import styled from "./header.module.css";
const Header = () => {
  const handleAlertOne = () => {
    return alert("Пока не готово");
  };
  const handleAlertTwo = () => {
    return alert("Я же сказал, что не готово!");
  };

  return (
    <header>
      <div className={styled.headerWrapperPosition}>
        <div className={styled.headerLogo}>Todo-list</div>
        <div className={styled.headerSingInAndSingUp}>
          <button className={styled.sing} onClick={() => handleAlertOne()}>
            Sing In
          </button>
          <button className={styled.sing} onClick={() => handleAlertTwo()}>
            Sing Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
