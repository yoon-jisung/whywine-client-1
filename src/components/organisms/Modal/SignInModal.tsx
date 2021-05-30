import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SocialLogin from "../../atoms/Buttons/SocialLogin";
import Title from "../../atoms/Title/Title";
import axios from "axios";
require("dotenv").config();
const server = process.env.REACT_APP_API_SERVER || "https://localhost:4000";

interface Props {
  isOpen: Boolean;
  closeModal: React.MouseEventHandler<HTMLDivElement>;
  //   loginHandler: any;
}

function SignInModal({ isOpen, closeModal }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [issueAccessToken, setIssueAccessToken] = useState();
  const [isNone, setIsNone] = useState(false);

  const history = useHistory();

  const loginHandler = () => {
    history.push("/main");
  };

  const loginRequestHandler = async (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      await axios
        .post(
          `${server}/auth/signin`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => {
          loginHandler();
          console.log(res.data);
        })
        .catch((err) => {
          if (err) {
            console.error(err.message);
            setTimeout(() => {
              setIsNone(true);
              setIsNone(false);
            }, 2000);
          }
        });
    } else if (e.keyCode === 27) {
      close();
    }
  };

  const emailInputValue = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordInputValue = (e: any) => {
    setPassword(e.target.value);
  };
  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      {isOpen ? (
        <div className="SignInModal">
          <h2 className="login_h2">
            <span> whywine</span> | <span>Log in</span>
          </h2>

          <input
            name="email"
            type="email"
            placeholder="이메일"
            onChange={emailInputValue}
            onKeyDown={loginRequestHandler}
          />

          <input
            name="password"
            type="password"
            placeholder="패스워드"
            onChange={passwordInputValue}
            onKeyDown={loginRequestHandler}
          />

          <div>
            <button
              className="signin-button"
              type="submit"
              onClick={loginRequestHandler}
            >
              로그인
            </button>
          </div>
          <div className="login_or">
            <p>or</p>
          </div>

          <div className="socialLogin">
            <SocialLogin />
          </div>
          <i className="fas fa-times" onClick={closeModal}></i>
        </div>
      ) : null}
    </div>
  );
}

export default SignInModal;
