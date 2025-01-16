import React from "react";
import dart from "../images/exp/exp_dart.png";
import TaskIcon from "../images/exp/duty_image.png";
import LeaderIcon from "../images/exp/leader_image.png";
import EvaluationIcon from "../images/exp/evaluation_image.png";
import ProjectIcon from "../images/exp/project_image.png";
import colors from "../colors/colors";

const Experience = ({
  title,
  badgeText,
  maxBadgeText,
  month,
  date,
  count,
  points,
  questType,
  experience,
}) => {
  const isAchieved = experience > 0; // 경험치에 따라 달성 여부 결정

  // Badge to Icon Mapping
  const badgeIcons = {
    TASK: TaskIcon,
    LEADER: LeaderIcon,
    EVALUATION: EvaluationIcon,
    PROJECT: ProjectIcon,
  };

  const icon = badgeIcons[questType] || dart; // Default icon fallback
  const badgeContent =
    questType === "TASK" ? "직무별" : questType === "LEADER" ? "리더부여" : "평가";

  const styles = {
    container: {
      display: "flex",
      width: "350px",
      height: "120px",
      alignItems: "center",
      background: "#FFFFFF",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0px 2px 11px #9E1F0026",
    },
    icon: {
      width: "80px",
      height: "80px",
      background: "#FFCCC0",
      borderRadius: "100px",
      paddingLeft: "12px",
      marginRight: "18px",
    },
    iconImage: {
      height: "66px",
      marginTop: "4px",
      objectFit: "fill",
    },
    details: {
      flex: 1,
      marginRight: "4px",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
    },
    detailTitle: {
      color: "#212124",
      fontSize: "14px",
      fontWeight: "bold",
      marginRight: "10px",
    },
    badge: {
      width: "58px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#FFEFEB",
      borderRadius: "16px",
      paddingTop: "5px",
      paddingBottom: "5px",
    },
    badgeText: {
      color: "#FF5C35",
      fontSize: "12px",
      fontWeight: "bold",
    },
    maxBadge: {
      width: "66px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#28BF4F",
      borderRadius: "8px",
      paddingTop: "5px",
      paddingBottom: "5px",
      marginRight: "8px",
    },
    maxBadgeText: {
      color: "#FFFFFF",
      fontSize: "12px",
    },
    monthBadge: {
      width: "32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#EAEBEE",
      borderRadius: "8px",
      paddingTop: "5px",
      paddingBottom: "5px",
    },
    monthBadgeText: {
      color: colors.gray[600],
      fontSize: "12px",
    },
    dateRow: {
      display: "flex",
      alignItems: "center",
      marginRight: "15px",
    },
    date: {
      color: colors.gray[600],
      fontSize: "12px",
      marginRight: "11px",
    },
    divider: {
      width: "1px",
      height: "7px",
      marginRight: "7px",
      objectFit: "fill",
    },
    count: {
      color: colors.gray[900],
      fontSize: "12px",
      fontFamily: "Pretendard",
      flex: 1,
    },
    points: {
      color: colors.gray[900],
      fontSize: "14px",
      fontWeight: "bold",
      marginRight: "3px",
      fontFamily: "Pretendard",
    },
    pointUnit: {
      color: colors.gray[600],
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: "Pretendard",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        <img src={icon} alt="Icon" style={styles.iconImage} />
      </div>
      <div style={styles.details}>
        <div style={styles.detailRow}>
          <span style={styles.detailTitle}>{title}</span>
          <div style={styles.badge}>
            <span style={styles.badgeText}>{badgeContent}</span>
          </div>
        </div>
        <div style={styles.detailRow}>
          <div style={styles.maxBadge}>
            <span style={styles.maxBadgeText}>{maxBadgeText}</span>
          </div>
          <div style={styles.monthBadge}>
            <span style={styles.monthBadgeText}>{month}</span>
          </div>
        </div>
        <div style={styles.dateRow}>
          <span style={styles.date}>{date}</span>
          <img src={dart} alt="Divider" style={styles.divider} />
          <span style={styles.count}>{count}</span>
        </div>
      </div>
      <span style={styles.points}>{points}</span>
      <span style={styles.pointUnit}>do</span>
    </div>
  );
};

export default Experience;
