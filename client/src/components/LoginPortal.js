import React, {
  useState,
  useContext,
} from "react";
import { UserContext } from "../contexts/UserContext";
import { sommerhjelp, fastAnsatt, admin } from "../utilities/AccessStrings";
import "../stylesheets/loginPortal.css"

const LoginPortal = () => {
  const { setAuthenticated } = useContext(UserContext);
  const [input, setInput] = useState(false);

  const registerInput = (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 0) {
      setInput(true);
    } else setInput(false);
  };

  const attemptLogin = () => {
    const passwordString = document.getElementById("login-input-id").value;

    if (passwordString === fastAnsatt || passwordString === admin)
      setAuthenticated(1);
    else if (passwordString === sommerhjelp) setAuthenticated(2);
    else {
      console.log(passwordString);
      //play toast
    }
  };

  return (
    <div className="login-container">
      <div className="login-field">
        <h5>Log inn som sommerhjelp eller fast ansatt</h5>
        <form className="login-form">
          <textarea
            className="login-input"
            id="login-input-id"
            placeholder=" Tast inn passord"
            onChange={(e) => registerInput(e)}
          ></textarea>
        </form>
        <div
          className={`login-button ${input ? "highlight-login" : ""}`}
          onClick={attemptLogin}
        >
          Logg inn
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
