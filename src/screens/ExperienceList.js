import React, { useState } from "react";
import "../App.css";
import "../fonts/font.css";
import colors from "../colors/colors";
import arrowBack from "../images/arrow_back.png";
import arrowDown from "../images/down_arrow.png";
import { MyExpBox } from "../components/MyExpBox";
import PressableButton from "../components/PressableButton";
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

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
  card: {
    display: "inline-flex",
    width: 390,
    height: 160,
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    flexShrink: 0,
    background: "var(--Box-bg, rgba(255, 255, 255, 0.70))",
    boxShadow: "0px 2px 11.8px 0px rgba(159, 32, 0, 0.15)",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  statsContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 14,
    marginLeft: 20,
    marginRight: 20,
    cursor: "pointer",
  },
  statsText: {
    color: "#212124",
    fontSize: 14,
    marginTop: 6,
    marginRight: 6,
  },
  statsBoldText: {
    color: "#212124",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 7,
    marginRight: 2,
  },
  statsDivider: {
    color: "#212124",
    fontSize: 14,
    marginTop: 6,
    marginRight: 7,
  },
  flexSpacer: {
    flex: 1,
    alignSelf: "stretch",
  },
  arrowImage: {
    width: 11,
    height: 6,
    marginTop: "12px",
    objectFit: "fill",
  },
};

const ExperienceList = ({ myLevel, myTotalExperience }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("전체기간");
  const [selectedClass, setSelectedClass] = useState("전체");

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
      <div style={styles.statsContainer} onClick={() => setModalVisible(true)}>
        <span style={styles.statsText}>{selectedPeriod}</span>
        <span style={styles.statsDivider}>·</span>
        <span style={styles.statsText}>{selectedClass}</span>
        <img src={arrowDown} style={styles.arrowImage} alt="icon" />
      </div>
      <div style={styles.card} />
      {modalVisible && (
        <Modal
          visible={modalVisible}
          onClose={() => setModalVisible(false)} // 모달 닫기
          onApply={handleApplyFilters}
        />
      )}
    </div>
  );
};

export default ExperienceList;
