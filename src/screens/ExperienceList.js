import React, { useState, useEffect } from "react";
import "../App.css";
import "../fonts/font.css";
import colors from "../colors/colors";
import arrowBack from "../images/arrow_back.png";
import arrowDown from "../images/down_arrow.png";
import { MyExpBox } from "../components/MyExpBox";
import PressableButton from "../components/PressableButton";
import Modal from "../components/Modal/Modal";
import Experience from "../components/Experience";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  container: {
    background: "#FFF2EF",
    paddingTop: 55,
  },
  header: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    marginBottom: 33,
    justifyContent: "center",
    position: "relative",
  },
  headerImage: {
    position: "absolute",
    left: 17,
    width: 10,
    height: 18,
    objectFit: "fill",
  },
  headerText: {
    color: "#212124",
    fontSize: 18,
    fontWeight: "bold",
  },
  statsContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    marginLeft: 20,
    marginRight: 20,
    cursor: "pointer",
  },
  arrowImage: {
    width: 11,
    height: 6,
    marginTop: "0px",

    objectFit: "fill",
  },
  totalCountContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: 20,
    marginRight:10,
    fontSize: 15,
    fontWeight:400,
    color: "#212124",
  },
  totalCountNumber: {
    fontWeight: "bold",
    marginRight: 5,
    marginLeft: 5,
    fontSize: 16,
  },
  experiencesContainer: {
    display: "inline-flex",
    padding: "20px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    background: "var(--Box-bg, rgba(255, 255, 255, 0.70))",
    boxShadow: "0px 2px 11.8px 0px rgba(159, 32, 0, 0.15)",
  },
};

const ExperienceList = ({ myLevel, myTotalExperience }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("전체기간");
  const [selectedClass, setSelectedClass] = useState("전체");
  const [data, setData] = useState([]); // API에서 가져온 데이터 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // API 호출 함수
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const type = selectedClass === "전체" ? "ALL" : selectedClass.toUpperCase(); // 요청 파라미터 설정
      const BASE_URL = process.env.REACT_APP_API_URL;
      const endpoint = `${BASE_URL}/experiences/list/entire`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      console.log("요청 URL:", endpoint);
      console.log("요청 헤더:", headers);
      console.log("요청 파라미터:", { type });

      const response = await axios.get(endpoint, {
        params: { type },
        headers,
        withCredentials: true,
      });

      console.log("API 응답 데이터:", response.data);
      setData(response.data || []); // 응답 데이터 처리
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatMonth = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const monthNames = [
      "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월",
    ];
    return monthNames[date.getMonth()];
  };

  useEffect(() => {
    if (selectedPeriod === "전체기간") {
      fetchData(); // "전체기간" 선택 시 API 호출
    }
  }, [selectedPeriod, selectedClass]);

  const handleApplyFilters = (period, cls) => {
    setSelectedPeriod(period);
    setSelectedClass(cls);
    setModalVisible(false);
  };

  return (
    <div className="page" style={styles.container}>
      <div style={styles.header}>
        <PressableButton
          onClick={() => navigate(-1)}
          pressedStyle={{ opacity: 0.5 }}
        >
          <img src={arrowBack} style={styles.headerImage} alt="icon" />
        </PressableButton>
        <span style={styles.headerText}>경험치 달성 목록</span>
      </div>
      <div style={{ width: "100%", padding: "0px 20px" }}>
        <MyExpBox levelName={myLevel} totalExperience={myTotalExperience} />
      </div>
      <div style={styles.statsContainer}>
        <div style={styles.totalCountContainer}>
          총 <span style={styles.totalCountNumber}>{data.length}</span>건
        </div>
        <div onClick={() => setModalVisible(true)} style={{ display: "flex", alignItems: "center", marginLeft: 20, marginRight: 10, fontSize: 15, fontWeight: 400, color: "#212124" }}>
          <span style={{ textAlign: "right", marginLeft: 20, marginRight: 5, fontSize: 15, fontWeight: 400, color: "#212124" }}>{selectedPeriod}</span>
          <span>·</span>
          <span style={{ textAlign: "right", marginLeft: 5, marginRight: 5, fontSize: 15, fontWeight: 400, color: "#212124" }}>{selectedClass}</span>
          <img src={arrowDown} style={styles.arrowImage} alt="icon" />
        </div>
      </div>
      <div style={styles.experiencesContainer}>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}
        {!loading && !error && data.length === 0 && <p>데이터가 없습니다.</p>}
        {!loading &&
          !error &&
          data.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: index === data.length - 1 ? 0 : 16,
              }}
            >
              <Experience
                title={item.title || "제목 없음"}
                badgeText={item.type || "타입 없음"}
                maxBadgeText={item.reason || "사유 없음"}
                month={formatMonth(item.description) || undefined}
                date={item.date || "날짜 없음"}
                points={item.exp || 0}
                questType={item.type || "DEFAULT"}
                experience={item.exp || 0}
              />
            </div>
          ))}
      </div>

      {modalVisible && (
        <Modal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onApply={handleApplyFilters}
        />
      )}
    </div>
  );
};

export default ExperienceList;