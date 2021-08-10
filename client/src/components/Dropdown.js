import React, { useState, useContext, Fragment } from "react";
import styled from "styled-components";
import { GlobalContext } from "../contexts/GlobalContext";
import { ProjectContext } from "../contexts/ProjectContext";
import church from "../images/church.png";

export const Dropdown = ({ title, items, multiSelect = false }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { setViewProject } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    if (!open) setViewProject(null);
    setOpen(!open);
  };

  const handleOnClick = (item) => {
    toggle(!open);
    console.log(item);
    setValue((prev) => {
      return { ...prev, gy: item };
    });
  };

  return (
    <Styled_Wrapper>
      <Styled_Dropdown
        tabIndex={0}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <p>
          {title} &nbsp; <span>({value.gy.value})</span>
        </p>
        <img src={church} alt="miniatyrkirke" />
      </Styled_Dropdown>
      {open && (
        <ul>
          {items.map((item) => (
            <li key={item.id} onClick={() => handleOnClick(item)}>
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      )}
    </Styled_Wrapper>
  );
};

const Styled_Wrapper = styled.div`
  background-color: white;
  width: 70%;
  max-width: 700px;
  height: 4vh;
  border-radius: 10px;
  border: 1px solid black;
  z-index: 9999;
  margin-top: 10px;
  margin-bottom: 5px;

  & ul {
    width: 100%;
    padding: 0;
    margin-top: 5px;
    border-radius: 10px;
    overflow: visible;
    border: 1px solid black;
    background-color: white;

    & li {
      list-style-type: none;
      width: 100%;
      height: 6vh;
      margin: 0;


      & p {
        font-size: 0.8rem;
        padding: 0;
        margin: 0 0 0 10px;
        line-height: 6vh;
      };
    };

    & li:not(:last-child){
      border-bottom: 1px solid grey;
    }
  };
`;

const Styled_Dropdown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  flex-wrap: wrap;
  border-radius: 10px;

  & p {
    margin: 0 0 0 10px;
    line-height: 4vh;
    font-size: 0.8rem;
    text-align: center;

    & span {
      font-weight: bold;
    }
  }

  & img {
    max-height: 85%;
    width: auto;
    margin: 0.2vh 2% auto auto;
  }
`;

export default Dropdown;
