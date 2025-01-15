import React, { useState, useEffect } from "react";
import "../App.css";
import "../fonts/font.css";
import colors from "../colors/colors";
import toast from "react-hot-toast";

import LeftArrow from "../images/quest/arrow_left_black.png";
import RighrArrowBlack from "../images/quest/arrow_right_black.png";
import RecentExperience from "../components/RecentExperience";
import axios from "axios";

const QuestScreen = () => {
  const [quests, setQuests] = useState([]); // 퀘스트 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(false); // 에러 상태 관리

  const fetchMyQuests = async (year, month, week) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_URL; // 환경 변수에서 API URL 가져오기
      const params = { year, month };
      if (week) params.week = week; // week는 선택적 파라미터

      const response = await axios.get(`${BASE_URL}/quests/member`, {
        params: { year, month, _: new Date().getTime() }, // 고유 쿼리 추가
        // headers: {
        //   Cookie: document.cookie, // 필요시 쿠키 추가
        // },
        withCredentials: true, // 인증 포함
      });

      return response.data; // API 응답 데이터 반환
    } catch (error) {
      console.error("퀘스트 조회 실패:", error);
      throw error; // 에러를 호출한 쪽에서 처리
    }
  };

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const year = 2025;
        const month = 1;
        const week = null;
  
        const data = await fetchMyQuests(year, month, week); // API 호출
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
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 가져오는 데 실패했습니다.</div>;

  return (
    <div className="page" style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerAll}>
        <div style={styles.headerSection}>
          <button style={styles.navButton}>
            <img src={LeftArrow} alt="Previous" style={styles.navIcon} />
          </button>
          <span className="title-3-bold" style={styles.headerTitle}>
            2025년 1월
          </span>
          <button style={styles.navButton}>
            <img src={RighrArrowBlack} alt="Next" style={styles.navIcon} />
          </button>
        </div>

        {/* Tabs Section */}
        <div style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              style={{
                ...styles.tabButton,
                backgroundColor: tab.isActive ? "#FF5C35" : "#FFFFFF",
                borderColor: tab.isActive ? "#FF5C35" : "#ADB1BA",
              }}
            >
              <span
                style={{
                  ...styles.tabTitle,
                  color: tab.isActive ? "#FFFFFF" : "#868B94",
                }}
              >
                {tab.title}
              </span>
              <span
                style={{
                  ...styles.tabSubtitle,
                  color: tab.isActive ? "#FFFFFF" : "#868B94",
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
  quests.map((quest, index) => (
    <RecentExperience
    key={index}
    title={quest.title || "제목 없음"}
    badgeText={quest.achievedLevel || "N/A"}
    maxBadgeText={quest.questFrequency || "MONTHLY"}
    month={
      quest.date
        ? new Date(quest.date).toLocaleString("ko-KR", { month: "long" })
        : "날짜 없음"
    }
    date={quest.date || "날짜 없음"}
    count={`${quest.experience || 0} EXP`}
    points={quest.experience || 0}
  />
  ))
) : (
  <div>퀘스트 데이터가 없습니다.</div>
)}
      </div>
    </div>
  );
};

const tabs = [
  { title: "전체", subtitle: "1-31일", isActive: true },
  { title: "1주차", subtitle: "1-7일", isActive: false },
  { title: "2주차", subtitle: "8-14일", isActive: false },
  { title: "3주차", subtitle: "15-21일", isActive: false },
  { title: "4주차", subtitle: "22-28일", isActive: false },
  { title: "5주차", subtitle: "29-31일", isActive: false },
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
    boxShadow: "0px 2px 11.8px 0px rgba(159, 32, 0, 0.15)",
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
    margin: "0 4px",
    padding: "7px 6px",
    borderRadius: 8,
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabTitle: {
    fontWeight: "bold",
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
};

export default QuestScreen;
