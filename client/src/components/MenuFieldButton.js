import React, {
    useState,
    useContext,
    Fragment,
    useEffect,
    memo,
    useCallback,
  } from "react";
  
  import { GlobalContext } from "../contexts/GlobalContext";
  
  export const MenuFieldButton = ({item, index}) => {
    const [active, SetActive] = useState(false);
    const { value, setValue } = useContext(GlobalContext);
    let lastfield = value.field;
    const thisField = value.gy.fields[index];

    
    const handleOnClick = () => {
        setValue((prev) => {
          return { ...prev, field: item };
        });
      };
  
  
    useEffect(() => {
        console.log(thisField);
        if (thisField == value.field) {
            SetActive(true);
        } else SetActive(false);
    }, [value.field == thisField || thisField]);
  
  
    if (active)
      return (
        <a className="round-button-menu-active" onClick={handleOnClick}>
          {thisField}
        </a>
      );
    else
      return (
        <a className="round-button-menu-inactive" onClick={handleOnClick}>
          {thisField}
        </a>
      );
  };

  export default MenuFieldButton;
  