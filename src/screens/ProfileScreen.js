import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../fonts/font.css";
import colors from "../colors/colors";
import Setting from "../images/profile/settings.svg";
import Arrow from "../icons/keyboard_arrow_right.svg";
import PressableButton from "../components/PressableButton";
import { theme } from "../themes/theme";
import { customAxios } from "../customAxios";
import Notification from "../icons/notifications.svg";
import { MyExpBox } from "../components/MyExpBox";

const ProfileScreen = () => {
  const navigate = useNavigate();

  const profiles = {
    default: require("../images/profile/character/profile_default.png"),
    flower: require("../images/profile/character/profile_flower.png"),
    cloud: require("../images/profile/character/profile_cloud.png"),
    music: require("../images/profile/character/profile_music.png"),
    heart: require("../images/profile/character/profile_heart.png"),
    star: require("../images/profile/character/profile_star.png"),
  };

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [name, setName] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [department, setDepartment] = useState("");
  const [jobGroup, setJobGroup] = useState("");
  const [loginId, setLoginId] = useState("");
  const [totalExperience, setTotalExperience] = useState(0);
  const [levelName, setLevelName] = useState("");
  const [profileCharacter, setProfileCharacter] = useState("");

  useEffect(() => {
    let isMounted = true;

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
        setLevelName(data.levelName);

        if (data.profileCharacter) {
          setProfileCharacter(data.profileCharacter.toLowerCase());
        } else {
          setProfileCharacter("default");
        }
      } catch (error) {
        console.error("GET error: ", error);
      }
    };
    if (isMounted) {
      loadUserInfo();
    }

    return () => {
      isMounted = false;
    };
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

  const handleLogout = async () => {
    try {
      const response = await customAxios.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log("로그아웃 error: ", error);
    }
  };

  return (
    <div
      className="page"
      style={{
        ...theme.noticeTheme.container,
        backgroundColor: colors.Primary.bg,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {/* header */}
      <div
        style={{
          ...theme.noticeTheme.header,
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 24 }} />
        <span className="title-3-bold">프로필</span>
        <PressableButton
          onClick={() => navigate("/notification")}
          pressedStyle={{ opacity: 0.5 }}
        >
          <img
            src={Notification}
            alt="back"
            style={{ width: 24, height: 24 }}
          />
        </PressableButton>
      </div>
      {/* profile_photo */}
      <div style={styles.circle}>
        <img
          src={profiles[profileCharacter]}
          alt="이미지"
          style={styles.image}
        />
        <PressableButton
          onClick={() => {
            navigate("/profile/setting", {
              state: { profileCharacter },
            });
          }}
          style={styles.miniCircle}
          pressedStyle={{ backgroundColor: colors.gray[100] }}
        >
          <img src={Setting} alt="이미지" style={{ width: 24, height: 24 }} />
        </PressableButton>
      </div>
      {/* content */}
      <MyExpBox levelName={levelName} totalExperience={totalExperience} />
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
        <div
          style={{ ...theme.boxTheme.rowContainer, ...styles.marginBottom24 }}
        >
          <span className="subtitle-1-bold">비밀번호 변경</span>
          <PressableButton
            onClick={() => navigate("/passwordchange")}
            pressedStyle={{ opacity: 0.5 }}
          >
            <img src={Arrow} alt="arrow" />
          </PressableButton>
        </div>
        <div style={theme.boxTheme.rowContainer}>
          <span className="subtitle-1-bold">로그아웃</span>
          <PressableButton
            onClick={handleLogout}
            pressedStyle={{ opacity: 0.5 }}
          >
            <img src={Arrow} alt="arrow" />
          </PressableButton>
        </div>
      </div>
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
