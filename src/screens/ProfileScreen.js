import React, { useEffect, useState } from "react";
import "../fonts/font.css";
import colors from "../colors/colors";
import Profile from "../images/profile/임시.png";
import Setting from "../images/profile/settings.svg";
import LevelChip from "../components/LevelChip";
import Arrow from "../icons/keyboard_arrow_right.svg";
import PressableButton from "../components/PressableButton";
import { theme } from "../themes/theme";
import { customAxios } from "../customAxios";
import Modal from "../components/Modal/Modal";
import { getTotalExpInfo } from "../CalcEx";

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [name, setName] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [department, setDepartment] = useState("");
  const [jobGroup, setJobGroup] = useState("");
  const [loginId, setLoginId] = useState("");
  const [totalExperience, setTotalExperience] = useState(0);
  const [levelName, setLevelName] = useState("");

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const { data } = await customAxios.get("/members/info");
        console.log("GET memberinfo: ", data);

        setEmployeeNumber(data.employeeNumber);
        setName(data.name);
        setHireDate(data.hireDate);
        setDepartment(data.department);
        setJobGroup(data.jobGroup);
        setLoginId(data.loginId);
        setTotalExperience(data.totalExperience);
        // setLevelName(data.levelName);
        setLevelName("F2-I");
      } catch (error) {
        console.error("GET error: ", error);
      }
    };
    loadUserInfo();
  }, []);

  const formatHireDate = (dateString) => {
    if (!dateString) return;

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const Content = ({ text1, text2, isMargin }) => {
    return (
      <div
        style={{
          ...theme.boxTheme.rowContainer,
          ...(isMargin && styles.marginBottom24),
        }}
      >
        <span className="subtitle-1-bold">{text1}</span>
        <span className="subtitle-1-regular">{text2}</span>
      </div>
    );
  };

  // 경험치 계산
  const { nextLevel, nextLevelExp, remainExp, percent } = getTotalExpInfo(
    "F2-I",
    totalExperience
  );

  return (
    <div className="page" style={{ ...theme.pinkPage.container }}>
      <div style={theme.pinkPage.head}>
        <span className="title-3-bold">프로필</span>
      </div>
      <div style={styles.circle}>
        <img src={Profile} alt="이미지" style={styles.image} />
        <PressableButton
          onClick={() => setModalVisible(!modalVisible)}
          style={styles.miniCircle}
          pressedStyle={{ backgroundColor: colors.gray[100] }}
        >
          <img src={Setting} alt="이미지" style={{ width: 24, height: 24 }} />
        </PressableButton>
      </div>

      <div style={theme.boxTheme.boxContainer}>
        <div
          style={{
            ...theme.boxTheme.rowContainer,
            marginBottom: 12,
          }}
        >
          <div style={styles.subContainer}>
            <LevelChip text={levelName} color={colors.Level.Bronze} />
            <span className="Body-2-b" style={{ marginLeft: 8 }}>
              총 누적 경험치
            </span>
          </div>
          <div style={styles.subContainer}>
            <span className="Body-2-b" style={{ color: colors.Level.Bronze }}>
              {totalExperience.toLocaleString()}
            </span>
            <pre className="Body-2-b" style={{ color: colors.gray[600] }}>
              {" "}
              / {nextLevelExp.toLocaleString()}do
            </pre>
          </div>
        </div>
        <div style={theme.boxTheme.barContainer}>
          <div
            style={{
              ...theme.boxTheme.colorbar,
              width: `${percent}%`,
              backgroundColor: colors.Level.Bronze,
            }}
          />
        </div>
        <div style={{ ...theme.boxTheme.rowContainer, marginTop: 8 }}>
          <span className="label-1-r">{levelName}</span>
          <div style={styles.subContainer}>
            <span className="label-1-b" style={{ color: colors.Level.Bronze }}>
              {`${remainExp.toLocaleString()}do`}
            </span>
            <pre className="label-1-r" style={{ color: colors.gray[600] }}>
              {" "}
              남았어요!
            </pre>
          </div>
          <span className="label-1-r">{nextLevel}</span>
        </div>
      </div>

      <div style={theme.boxTheme.boxContainer}>
        <Content text1="사번" text2={employeeNumber} isMargin={true} />
        <Content text1="이름" text2={name} isMargin={true} />
        <div
          style={{ ...theme.boxTheme.rowContainer, ...styles.marginBottom24 }}
        >
          <span className="subtitle-1-bold">
            소속 <span style={styles.line} /> 직무그룹
          </span>
          <span className="subtitle-1-regular">
            {department} <span style={styles.line} /> {jobGroup}
          </span>
        </div>
        <Content
          text1="입사일"
          text2={formatHireDate(hireDate)}
          isMargin={false}
        />
      </div>
      <div style={{ ...theme.boxTheme.boxContainer, marginBottom: 29 }}>
        <Content text1="아이디" text2={loginId} isMargin={true} />
        <div style={theme.boxTheme.rowContainer}>
          <span className="subtitle-1-bold">비밀번호 변경</span>
          <PressableButton
            onClick={() => console.log("비밀번호 변경 클릭")}
            pressedStyle={{ opacity: 0.5 }}
          >
            <img src={Arrow} alt="arrow" />
          </PressableButton>
        </div>
      </div>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.Primary.bg,
    padding: "3px 20px",
  },
  subContainer: { display: "flex", alignItems: "center" },
  head: {
    display: "flex",
    width: 108,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    display: "flex",
    width: 135,
    height: 135,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 107,
    marginTop: 20,
    marginBottom: 24,
    position: "relative",
  },
  image: { width: "100%", height: "100%", objectFit: "contain" },
  miniCircle: {
    display: "flex",
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 61,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  line: {
    display: "inline-block",
    width: 1,
    height: 12,
    backgroundColor: colors.gray[400],
    verticalAlign: "middle",
    margin: "0 3px",
  },
  marginBottom24: {
    marginBottom: 24,
  },
};

export default ProfileScreen;
