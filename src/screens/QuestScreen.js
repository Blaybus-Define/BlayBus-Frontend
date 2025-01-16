import React, { useState, useEffect } from "react";
import "../App.css";
import "../fonts/font.css";
import Navbar from "../components/Navbar/Navbar";
import toast from "react-hot-toast";
import TaskIconGray from "../images/exp/duty_image_gray.png";
import LeaderAssignmentIconGray from "../images/exp/leader_image_gray.png";

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
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const fetchMyQuests = async (year, month, week, extraValue) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_URL;
      const params = { year, month };
      if (week) params.week = week;
      if (extraValue) params.extraValue = extraValue;

      const response = await axios.get(`${BASE_URL}/quests/member`, {
        params: params,
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("퀘스트 조회 실패:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + 1;
        const week = activeTabIndex > 0 ? activeTabIndex : undefined;
        const extraValue = 3;
        const data = await fetchMyQuests(year, month, week, extraValue);
        setQuests(data.quests || []);
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
              onClick={() => setActiveTabIndex(index)}
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

      <div style={styles.cardsContainer}>
        {quests && quests.length > 0 ? (
          quests.map((quest, index) => {
            const isAchieved = quest.achievedLevel !== "NOT_ACHIEVED";

            const icon =
              quest.questType === "TASK"
                ? isAchieved
                  ? TaskIcon
                  : TaskIconGray
                : isAchieved
                ? LeaderAssignmentIcon
                : LeaderAssignmentIconGray;

            const badgeText =
              quest.questType === "TASK" ? "직무별" : "리더부여";
            const achievedLevel =
              quest.achievedLevel === "NOT_ACHIEVED" ? "미완성" : quest.achievedLevel;

            return (
              <div key={index} style={styles.cardWrapper}>
                <QuestExperience
                  title={quest.title || "제목 없음"}
                  badgeText={badgeText}
                  maxBadgeText={achievedLevel}
                  month={quest.count || ""}
                  date={quest.date || ""}
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
    marginBottom: "12px",
  },
};

export default QuestScreen;
