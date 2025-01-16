import React, { useEffect, useState } from "react";
import "../fonts/font.css";
import "../App.css";
import "./HomeScreen.css";
import colors from "../colors/colors";
import gif1 from "../images/home/gif1.gif";
import HomeTree from "../images/home/HomeTree.png";
import HomeBackground from "../images/home/HomeBackground.png";
import chevronRight from "../icons/chevron_right.png";
import { MyExpBox } from "../components/MyExpBox";
import { theme } from "../themes/theme";
import PressableButton from "../components/PressableButton";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import RecentExperience from "../components/RecentExperience";

const HomeScreen = ({ setMyLevel }) => {
  const navigate = useNavigate();
  const [levelName, setLevelName] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [recentExperiences, setRecentExperiences] = useState([]);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const { data } = await customAxios.get("/members/info");
        console.log("회원 정보 API 응답: ", data);
        setTotalExperience(data.totalExperience);
        setLevelName(data.levelName);
        setMyLevel(data.levelName);
      } catch (error) {
        console.error("회원 정보 가져오기 오류: ", error);
      }
    };

    const loadRecentExperiences = async () => {
      try {
        const { data } = await customAxios.get("/experiences/recent");
        console.log("최근 경험치 API 응답 데이터: ", data);
    
        if (Array.isArray(data)) {
          setRecentExperiences(data); // 데이터가 배열이면 그대로 사용
        } else if (data && typeof data === "object") {
          setRecentExperiences([data]); // 단일 객체를 배열로 변환
        } else {
          console.warn("예상치 못한 데이터 형식: ", data);
          setRecentExperiences([]); // 데이터가 예상치 못한 형식이면 빈 배열로 설정
        }
      } catch (error) {
        console.error("최근 경험치 가져오기 오류: ", error);
      }
    };

    loadUserInfo();
    loadRecentExperiences();
  }, []);

  return (
    <div className="page" style={styles.container}>
      {/* Total experience */}
      <div style={{ width: "100%", padding: "0px 20px", marginTop:"64px" }}>
        <MyExpBox
          levelName={levelName}
          totalExperience={totalExperience}
          bgWhite={true}
        />
      </div>
      {/* Video */}
      <div style={styles.vedioContainer}>
        <img src={HomeTree} alt="Tree Background" style={styles.treeImage} />
        <img src={gif1} alt="Animated character" style={styles.gifImage} />
      </div>
      {/* Recent experience */}
      <div
        style={{
          ...theme.boxTheme.boxContainer,
          boxShadow: "0px -2px 8px rgba(159, 32, 0, 0.16)",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingBottom: 70,
        }}
      >
        <div style={{ ...theme.boxTheme.rowContainer, marginBottom: 12 }}>
          <span className="title-3-bold" style={{ color: colors.gray[900] }}>
            최근 획득한 경험치
          </span>
          <PressableButton
            onClick={() => {
              navigate("/experiences");
            }}
            style={{ display: "flex", alignItems: "center" }}
            pressedStyle={{ opacity: 0.5 }}
          >
            <span className="label-1-r" style={{ color: colors.gray[600] }}>
              자세히보기
            </span>
            <img
              src={chevronRight}
              alt="arrow"
              style={{ height: 12, marginLeft: 8 }}
            />
          </PressableButton>
        </div>

        {recentExperiences.length > 0 ? (
          recentExperiences.map((experience, index) => (
            
              <RecentExperience
                title={experience.title || "제목 없음"}
                badgeText={experience.type || "구분 없음"}
                maxBadgeText={experience.reason || "달성 정보 없음"}
                month={experience.exp || "0"}
                date={experience.date || "날짜 없음"}
                count={experience.description || "설명 없음"}
                points={experience.exp || 0}
                icon={chevronRight}
              />
          ))
        ) : (
          <div style={{ textAlign: "center", color: colors.gray[600] }}>
            최근 경험치 기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${HomeBackground})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "844px",
      width: "390px",
      overflow: "hidden",
    paddingTop: 20,
  },
  vedioContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 30,
  },
  treeImage: {
    position: "absolute",
    zIndex: 1,
    width: "338px",
    height: "271px",
    bottom: 245,
  },
  gifImage: {
    position: "relative",
    zIndex: 2,
    width: "255px",
    height: "297px",
    marginLeft: "10px",
    bottom: 20,
  },
  // recentExpContainer: {
  //   display: "flex",
  //   alignItems: "center",
  //   background: "#ffffff",
  //   padding: "20px",
  //   borderRadius: "16px",
  //   boxShadow: "0px 2px 11px #9E1F0026",
  //   marginBottom: "12px",
  // },
};

export default HomeScreen;
