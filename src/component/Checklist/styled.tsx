import styled from "styled-components";

export const Container = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 0.6rem;
    line-height:1.5rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    > input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ span {
        background-color: Transparent;
        border: 0px;
      }
      &:checked ~ span:after {
        display: block;
      }
    }
    &:hover input ~ span {
      background-color: #ccc;
    }
    span:after {
      left: 9px;
      top: 8px;
      width: 8px;
      height: 10px;
      border: solid black;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `;

  export const  Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border: 2px solid black;
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
    
  `;

