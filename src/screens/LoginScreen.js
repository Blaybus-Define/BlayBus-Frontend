import React, { useState } from "react";
import "../App.css";
import arrowback from "../images/arrow_back.png";
import visibility from "../images/visibility.png";
import visibilityoff from "../images/visibility_off.png";
import colors from "../colors/colors";
import "../fonts/font.css";

const PasswordChangeScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isButtonDisabled =
    !currentPassword || !newPassword || newPassword !== confirmPassword;

  const togglePasswordVisibility = (type) => {
    if (type === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (type === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (type === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handlePasswordChange = () => {
    if (currentPassword !== "correct_password") {
      // 에러 처리
      setShowError(true);
      setFadeOut(false);

      // 일정 시간 후 에러 텍스트 제거
      setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setShowError(false);
      }, 3500);
    } else {
      alert("비밀번호가 변경되었습니다.");
    }
  };

  return (
    <div className="page" style={styles.container}>
      <div style={styles.headerContainer}>
        <img src={arrowback} style={styles.arrowback} alt="arrowback" />
        <span className="title-3-bold">비밀번호 변경</span>
      </div>
      <span style={styles.label}>{"현재 비밀번호"}</span>
      <div style={styles.inputContainer}>
        <input
          type={showCurrentPassword ? "text" : "password"}
          placeholder={"현재 비밀번호"}
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          style={styles.input}
        />
        <img
          src={showCurrentPassword ? visibilityoff : visibility}
          style={styles.eyeIcon}
          alt="Eye Icon"
          onClick={() => togglePasswordVisibility("current")}
        />
      </div>
      <span style={styles.label}>{"새 비밀번호"}</span>
      <div style={styles.inputContainer}>
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder={"새 비밀번호"}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          style={styles.input}
        />
        <img
          src={showNewPassword ? visibilityoff : visibility}
          style={styles.eyeIcon}
          alt="Eye Icon"
          onClick={() => togglePasswordVisibility("new")}
        />
      </div>
      <div style={styles.inputContainer}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder={"새 비밀번호 확인"}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          style={styles.input}
        />
        <img
          src={showConfirmPassword ? visibilityoff : visibility}
          style={styles.eyeIcon}
          alt="Eye Icon"
          onClick={() => togglePasswordVisibility("confirm")}
        />
      </div>
      <button
        style={isButtonDisabled ? styles.disabledButton : styles.button}
        onClick={handlePasswordChange}
        disabled={isButtonDisabled}
      >
        <span
          style={{
            color: isButtonDisabled ? colors.gray[500] : "#FFFFFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {"비밀번호 변경"}
        </span>
      </button>
      {showError && (
        <div
          style={{
            ...styles.errorBox,
            opacity: fadeOut ? 0 : 1,
            visibility: fadeOut ? "hidden" : "visible",
            transition: "opacity 0.5s ease-out, visibility 0.5s ease-out",
          }}
        >
          <span style={styles.errorText}>현재 비밀번호를 다시 확인해주세요.</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
  },
  headerContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 17,
    marginTop: 47,
    width: 390,
    height: 45,
    marginBottom: 5,
  },
  arrowback: {
    width: 10,
    height: 18,
    marginRight: 107,
    objectFit: "fill",
  },
  label: {
    color: colors.gray[900],
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 15,
    marginLeft: 21,
    marginTop: 12,
  },
  inputContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    border: "1px solid #D1D3D8",
    paddingLeft: 18,
    paddingRight: 18,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    color: colors.gray[600],
    fontSize: 16,
    marginRight: 4,
    flex: 1,
    alignSelf: "stretch",
    background: "none",
    border: "none",
    paddingTop: 13,
    paddingBottom: 13,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    objectFit: "fill",
    cursor: "pointer",
  },
  button: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: colors.orange[500],
    borderRadius: 8,
    border: "none",
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "left",
  },
  disabledButton: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: colors.gray[300],
    borderRadius: 8,
    border: "none",
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "left",
  },
  // errorBox: {
  //   marginTop: -10,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "column",
  //   background: "#FEEDEF",
  //   borderRadius: 8,
  //   border: "none",
  //   width: "calc(100% - 40px)",
  //   padding: "8px 16px",
  //   textAlign: "center",
  //   marginLeft: 20,
  // },
  errorText: {
    color: "#ED4956",
    fontSize: 14,
  },
};

export default PasswordChangeScreen;
