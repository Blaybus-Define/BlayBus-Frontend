import React from "react";
import dart from "../images/exp/exp_dart.png"; // 기본 아이콘
import TaskIcon from "../images/exp/duty_image.png"; // 직무 아이콘
import LeaderAssignmentIcon from "../images/exp/leader_image.png"; // 리더 부여 아이콘
import colors from "../colors/colors";

const QuestExperience = ({
  title,
  badgeText,
  maxBadgeText,
  month,
  date,
  count,
  points,
}) => {
  const isIncomplete = maxBadgeText === "미완성"; // "미완성" 여부 확인

  // badgeText에 따른 아이콘 매핑
  const badgeIcons = {
    직무별: TaskIcon,
    리더부여: LeaderAssignmentIcon,
  };

  const icon = badgeIcons[badgeText] || dart; // badgeText에 해당하는 아이콘, 기본값은 dart

  const styles = {
    container: {
      display: "flex",
      width: "350px",
      height: "120px",
      alignItems: "center",
      background: isIncomplete ? "#F0F0F0" : "#ffffff", // "미완성"일 경우 회색으로 변경
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0px 2px 11px #9E1F0026",
    },
    icon: {
      width: "80px",
      height: "80px",
      background: isIncomplete ? "#D3D3D3" : "#FFCCC0", // 아이콘 배경색도 변경
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
      background: isIncomplete ? "#C4C4C4" : "#28BF4F", // "미완성"일 경우 회색으로 변경
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
        <img src={icon} alt="Icon" style={styles.iconImage} /> {/* 동적 아이콘 */}
      </div>
      <div style={styles.details}>
        <div style={styles.detailRow}>
          <span style={styles.detailTitle}>{title}</span>
          <div style={styles.badge}>
            <span style={styles.badgeText}>{badgeText}</span>
          </div>
        </div>
        <div style={styles.detailRow}>
          <div style={styles.maxBadge}>
            <span style={styles.maxBadgeText}>{maxBadgeText}</span>
          </div>
          {month && (
            <div style={styles.monthBadge}>
              <span style={styles.monthBadgeText}>{month}</span>
            </div>
          )}
        </div>
        <div style={styles.dateRow}>
          {date && <span style={styles.date}>{date}</span>}
          <span style={styles.count}>{count}</span>
        </div>
      </div>
      <span style={styles.points}>{points}</span>
      <span style={styles.pointUnit}>do</span>
    </div>
  );
};

export default QuestExperience;
