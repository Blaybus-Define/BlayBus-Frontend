import React, { useState, useEffect } from "react";
import "../App.css";
import "../fonts/font.css";
import Navbar from "../components/Navbar/Navbar";
import toast from "react-hot-toast";

import LeftArrow from "../images/quest/arrow_left_black.png";
import RightArrowBlack from "../images/quest/arrow_right_black.png";
import RightArrowGray from "../images/quest/arrow_right_gray.png";
import QuestExperience from "../components/QuestExperience";
import axios from "axios";

import TaskIcon from "../images/exp/duty_image.png";
import LeaderAssignmentIcon from "../images/exp/leader_image.png";
import { theme } from "../themes/theme";
import colors from "../colors/colors";

const QuestScreen = () => {
  const [quests, setQuests] = useState([]); // 퀘스트 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(false); // 에러 상태 관리
  const [activeTabIndex, setActiveTabIndex] = useState(0); // 활성화된 탭 인덱스
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const fetchMyQuests = async (year, month, week, extraValue) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_URL; // 환경 변수에서 API URL 가져오기
      const params = { year, month }; // 기본 필수 파라미터
      if (week) params.week = week; // 선택적 파라미터 추가
      if (extraValue) params.extraValue = extraValue; // 추가 파라미터 처리

      const response = await axios.get(`${BASE_URL}/quests/member`, {
        params: params, // 모든 파라미터 포함
        withCredentials: true, // 인증 포함
      });

      console.log("요청 파라미터:", params); // 요청 파라미터 확인
      console.log("API 응답 데이터:", response.data); // 응답 데이터 확인

      return response.data; // API 응답 데이터 반환
    } catch (error) {
      console.error("퀘스트 조회 실패:", error);
      throw error; // 에러를 호출한 곳에서 처리
    }
  };

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + 1; // JS에서 월은 0부터 시작하므로 +1
        const week = activeTabIndex > 0 ? activeTabIndex : undefined; // 선택된 탭에 따라 주차 결정
        const extraValue = 3; // 추가 파라미터 값
        console.log("요청 파라미터:", { year, month, week, extraValue });
        const data = await fetchMyQuests(year, month, week, extraValue); // API 호출
        console.log("API 응답 데이터:", data); // 응답 데이터 확인
        setQuests(data.quests || []); // quests 키가 없을 경우 빈 배열로 처리
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadQuests();
  }, [activeTabIndex, viewDate]);

  const handlePreviousMonth = () => {
    setViewDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    if (!isFutureMonth()) {
      setViewDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setMonth(prevDate.getMonth() + 1);
        return newDate;
      });
    }
  };

  const isFutureMonth = () => {
    return (
      viewDate.getFullYear() > currentDate.getFullYear() ||
      (viewDate.getFullYear() === currentDate.getFullYear() &&
        viewDate.getMonth() >= currentDate.getMonth())
    );
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 가져오는 데 실패했습니다.</div>;

  return (
    <div
      className="page"
      style={{
        ...theme.pageTheme.container,
        backgroundColor: colors.Primary.bg,
        padding: "162px 0px 40px 0px",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          ...theme.pageTheme.header,
          height: 164,
          flexDirection: "column",
          backgroundColor: "#FFFBFA",
          boxShadow: "0px 1px 8px rgba(159, 32, 0, 0.16)",
        }}
      >
        <div style={styles.headerSection}>
          <button style={styles.navButton} onClick={handlePreviousMonth}>
            <img src={LeftArrow} alt="Previous" style={styles.navIcon} />
          </button>
          <span className="title-3-bold" style={styles.headerTitle}>
            {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
          </span>
          <button
            style={styles.navButton}
            onClick={handleNextMonth}
            disabled={isFutureMonth()}
          >
            <img
              src={isFutureMonth() ? RightArrowGray : RightArrowBlack}
              alt="Next"
              style={styles.navIcon}
            />
          </button>
        </div>
        {/* Tabs Section */}
        <div style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              style={{
                ...styles.tabButton,
                backgroundColor:
                  activeTabIndex === index ? "#FF5C35" : "#FFFFFF",
                borderColor: activeTabIndex === index ? "#FF5C35" : "#ADB1BA",
              }}
              onClick={() => setActiveTabIndex(index)} // 클릭 이벤트로 활성 탭 설정
            >
              <span
                className="Body-2-b"
                style={{
                  ...styles.tabTitle,
                  color: activeTabIndex === index ? "#FFFFFF" : "#868B94",
                }}
              >
                {tab.title}
              </span>
              <span
                className="label-1-r"
                style={{
                  ...styles.tabSubtitle,
                  color: activeTabIndex === index ? "#FFFFFF" : "#868B94",
                }}
              >
                {tab.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div style={styles.cardsContainer}>
        {quests && quests.length > 0 ? (
          quests.map((quest, index) => {
            const isAchieved = quest.experience > 0;
            const icon =
              quest.questType === "TASK" ? TaskIcon : LeaderAssignmentIcon;
            const badgeText =
              quest.questType === "TASK" ? "직무별" : "리더부여";

            return (
              <div
                key={index}
                style={{
                  ...styles.cardWrapper,
                  backgroundColor: isAchieved ? "#FFFFFF" : "#E0E0E0",
                }}
              >
                <QuestExperience
                  title={quest.title || "제목 없음"}
                  badgeText={badgeText}
                  maxBadgeText={quest.achievedLevel || "N/A"}
                  month={quest.questFrequency || "주기 없음"}
                  date={quest.date || "날짜 없음"}
                  count={quest.description || "설명 없음"}
                  points={quest.experience || 0}
                  icon={icon}
                />
              </div>
            );
          })
        ) : (
          <div>퀘스트 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

const tabs = [
  { title: "전체", subtitle: "1-31", isActive: true },
  { title: "1주차", subtitle: "1-7", isActive: false },
  { title: "2주차", subtitle: "8-14", isActive: false },
  { title: "3주차", subtitle: "15-21", isActive: false },
  { title: "4주차", subtitle: "22-28", isActive: false },
  { title: "5주차", subtitle: "29-31", isActive: false },
];

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF2EF",
    minHeight: "100vh",
  },
  headerAll: {
    display: "flex",
    width: "390px",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    background: "var(--Box-bg, rgba(255, 255, 255, 0.70))",
    boxShadow: "0px 2px 11.8px 0px rgba(159, 32, 0, 0, 0.15)",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 16px",
  },
  navButton: {
    backgroundColor: "transparent",
    border: "none",
  },
  navIcon: {
    width: 9,
    height: 11,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212124",
    paddingLeft: 10,
    paddingRight: 10,
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 16px",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    width: "49px",
    height: "49px",
    margin: "0 4px",
    padding: "7px 6px",
    borderRadius: 8,
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabTitle: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "800",
  },
  tabSubtitle: {
    fontSize: 12,
  },
  cardsContainer: {
    padding: "20px",
    gap: "12px",
  },
  cardWrapper: {
    marginBottom: "12px", // 컴포넌트 사이 여백 설정
  },
};

export default QuestScreen;
