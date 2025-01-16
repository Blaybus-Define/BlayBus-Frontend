import React, { useState } from "react";
import "../App.css";
import arrowback from "../images/arrow_back.png";
import visibility from "../images/visibility.png";
import visibilityoff from "../images/visibility_off.png";
import colors from "../colors/colors";
import "../fonts/font.css";
import { customAxios } from "../customAxios";
import { useNavigate } from "react-router-dom";
import PressableButton from "../components/PressableButton";
import toast from "react-hot-toast";

const PasswordChangeScreen = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showError, setShowError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const savedPassword = localStorage.getItem("loginPassword");

  const isButtonDisabled =
    !currentPassword || !newPassword || newPassword !== confirmPassword;

  const commonInputContainerStyle = {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    border: "1px solid #D1D3D8",
    paddingLeft: 18,
    paddingRight: 18,
    marginLeft: 20,
    marginRight: 20,
  };

  const togglePasswordVisibility = (type) => {
    if (type === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (type === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (type === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChangePassword = async () => {
    if (currentPassword !== savedPassword) {
      // 현재 비밀번호가 로그인 시 비밀번호와 일치하지 않을 때
      setShowError(true);
      setFadeOut(false);

      setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setShowError(false);
      }, 3500);

      return;
    }

    try {
      const response = await customAxios.put("/members/update-pw", {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      console.log("비밀번호변경: ", response);
      toast.success("비밀번호 변경 완료!", {
        duration: 1000,
      });
      navigate(-1);
    } catch (error) {
      console.warn("비밀번호변경 오류: ", error);
    }
  };

  return (
    <div className="page" style={styles.container}>
      <div style={styles.headerContainer}>
        <PressableButton
          onClick={() => navigate(-1)}
          pressedStyle={{ opacity: 0.5 }}
        >
          <img src={arrowback} style={styles.arrowback} alt="arrowback" />
        </PressableButton>
        <span className="title-3-bold">비밀번호 변경</span>
      </div>
      <span style={styles.label}>{"현재 비밀번호"}</span>
      <div
        style={{
          ...commonInputContainerStyle,
          marginBottom: 12,
        }}
      >
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
      <div
        style={{
          ...commonInputContainerStyle,
          marginBottom: 12,
        }}
      >
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
      <div
        style={{
          ...commonInputContainerStyle,
          marginBottom: 24,
        }}
      >
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
        onClick={handleChangePassword}
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
          <span style={styles.errorText}>
            현재 비밀번호를 다시 확인해주세요.
          </span>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    paddingTop: 20,
  },
  headerContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 17,
    marginTop: 3,
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
    marginBottom: 16, // 버튼과 에러 박스 간의 여백
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
    marginBottom: 16, // 버튼과 에러 박스 간의 여백
    marginLeft: 20,
    marginRight: 20,
    textAlign: "left",
  },
  errorBox: {
    alignSelf: "center", // 에러 박스가 중앙에 나타나도록 설정
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#ED49561A",
    borderRadius: 8,
    border: "none",
    width: 350,
    padding: "8px 16px",
    textAlign: "center",
  },
  errorText: {
    color: "#ED4956",
    fontSize: 14,
  },
};

export default PasswordChangeScreen;
