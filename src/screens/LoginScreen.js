import React, { useState } from "react";
import "../App.css";
import Logo from "../images/Logo.png";
import visibility from "../images/visibility.png";
import visibilityoff from "../images/visibility_off.png";
import colors from "../colors/colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginScreen = ({ setIsLogin }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [showError, setShowError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 가시성 상태

  const navigate = useNavigate();

  const onChangeInput1 = (value) => setInput1(value);
  const onChangeInput2 = (value) => setInput2(value);

  const isButtonDisabled = !input1 || !input2;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const fcmToken = localStorage.getItem("fcmToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { loginId: input1, password: input2, fcmToken: fcmToken },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("로그인 성공!", {
          duration: 1000,
        });
        // 어드민 계정 설정
        if (input1 === "admin" && input2 === "admin") {
          localStorage.setItem("isAdmin", true);
        } else {
          localStorage.setItem("isAdmin", false);
        }
        setIsLogin(true);
        setTimeout(() => navigate("/", { replace: true }), 0);
      }
    } catch (error) {
      console.log("로그인 POST 실패: ", error);
      setShowError(true);
      setFadeOut(false);

      setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setShowError(false);
      }, 3500);
    }
  };

  return (
    <div className="page" style={styles.container}>
      {showError && (
        <div
          style={{
            ...styles.errorBox,
            opacity: fadeOut ? 0 : 1,
            visibility: fadeOut ? "hidden" : "visible",
            transition: "opacity 0.5s ease-out, visibility 0.5s ease-out",
          }}
        >
          <span style={styles.errorText}>
            아이디 또는 비밀번호를 다시 확인해주세요.
          </span>
        </div>
      )}
      <img src={Logo} alt="Logo" style={styles.logo} />
      <input
        className="Body-1-r"
        placeholder={"아이디"}
        value={input1}
        onChange={(event) => onChangeInput1(event.target.value)}
        onFocus={() => setFocusedInput("input1")}
        onBlur={() => setFocusedInput(null)}
        style={{
          ...styles.input,
          borderColor: focusedInput === "input1" ? "black" : colors.gray[400],
        }}
      />
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          className="Body-1-r"
          placeholder="비밀번호"
          value={input2}
          onChange={(event) => onChangeInput2(event.target.value)}
          onFocus={() => setFocusedInput("input2")}
          onBlur={() => setFocusedInput(null)}
          style={{
            ...styles.input,
            ...styles.passwordInput,
            borderColor: focusedInput === "input2" ? "black" : colors.gray[400],
          }}
        />
        <img
          src={showPassword ? visibilityoff : visibility}
          alt="Toggle visibility"
          onClick={togglePasswordVisibility}
          style={styles.visibilityIcon}
        />
      </div>
      <button
        style={{
          ...styles.button,
          backgroundColor: isButtonDisabled
            ? colors.gray[300]
            : colors.orange[500],
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
        }}
        onClick={handleLogin}
        disabled={isButtonDisabled}
      >
        <span
          className="title-3-bold"
          style={{
            color: isButtonDisabled ? colors.gray[500] : "#FFFFFF",
            fontSize: 18,
          }}
        >
          로그인
        </span>
      </button>
      <div style={styles.linksContainer}>
        <span style={styles.link}>아이디 찾기</span>
        <div style={styles.divider} />
        <span style={styles.link}>비밀번호 찾기</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 204,
    height: "100vh",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    height: 30,
    marginBottom: 44,
  },
  input: {
    color: colors.gray[900],
    marginBottom: 16,
    width: "calc(100% - 40px)",
    maxWidth: 400,
    borderRadius: 8,
    border: "1px solid",
    padding: 18,
    outline: "none",
    transition: "border-color 0.3s",
  },
  passwordContainer: {
    position: "relative",
    width: "calc(100% - 40px)",
    maxWidth: 400,
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  visibilityIcon: {
    position: "absolute",
    right: 17,
    cursor: "pointer",
    marginBottom: "13px",
    height: 24,
    width: 24,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    border: "none",
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 26,
    width: "calc(100% - 40px)",
    maxWidth: 400,
    textAlign: "center",
  },
  linksContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "calc(100% - 130px)",
    maxWidth: 270,
    marginBottom: 318,
  },
  link: {
    fontSize: 14,
    cursor: "pointer",
    background: "#FFFFFF",
  },
  divider: {
    width: 1,
    height: 9,
    backgroundColor: colors.gray[400],
  },
  errorBox: {
    position: "absolute",
    top: 133,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#ED49561A",
    borderRadius: 8,
    border: "none",
    width: 350,
    padding: "8px 16px",
    textAlign: "left",
  },
  errorText: {
    color: "#ED4956",
    fontSize: 14,
  },
};

export default LoginScreen;
