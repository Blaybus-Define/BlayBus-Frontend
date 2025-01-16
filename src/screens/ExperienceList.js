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
    justifyContent: "flex-end",
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
      setData(response.data.quests || []); // 응답 데이터 처리
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
      <div
        style={styles.statsContainer}
        onClick={() => setModalVisible(true)}
      >
       <div
  style={{
    ...styles.statsContainer,
    justifyContent: "flex-end", // 오른쪽 정렬
    gap: "8px", // 텍스트 간격 추가
  }}
  onClick={() => setModalVisible(true)} // 클릭 시 모달 열기
>
  <span style={{ textAlign: "right" }}>{selectedPeriod}</span>
  <span>·</span>
  <span style={{ textAlign: "right" }}>{selectedClass}</span>
  <img src={arrowDown} style={styles.arrowImage} alt="icon" /></div>
      </div>
      <div style={{ margin: "20px" }}>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}
        {!loading && !error && data.length === 0 && <p>데이터가 없습니다.</p>}
        {!loading &&
          !error &&
          data.map((item, index) => (
            <Experience
              key={index}
              title={item.title || "제목 없음"}
              badgeText={item.type || "타입 없음"}
              maxBadgeText={item.reason || "사유 없음"}
              month={item.description || "설명 없음"}
              date={item.date || "날짜 없음"}
              count={`${item.exp || 0} EXP`}
              points={item.exp || 0}
              questType={item.type || "DEFAULT"}
              experience={item.exp || 0}
            />
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
