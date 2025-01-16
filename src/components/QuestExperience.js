import React from "react";
import dart from "../images/exp/exp_dart.png"; // 기본 아이콘
import TaskIcon from "../images/exp/duty_image.png"; // 직무 아이콘
import TaskIconGray from "../images/exp/duty_image_gray.png"; // 직무 회색 아이콘
import LeaderAssignmentIcon from "../images/exp/leader_image.png"; // 리더 부여 아이콘
import LeaderAssignmentIconGray from "../images/exp/leader_image_gray.png"; // 리더 부여 회색 아이콘
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
    직무별: isIncomplete ? TaskIconGray : TaskIcon, // "미완성"이면 회색 아이콘 사용
    리더부여: isIncomplete ? LeaderAssignmentIconGray : LeaderAssignmentIcon, // "미완성"이면 회색 아이콘 사용
  };

  const icon = badgeIcons[badgeText] || dart; // badgeText에 해당하는 아이콘, 기본값은 dart

  // PNG 크기 스타일 매핑
  const pngStyles = {
    직무별: {
      width: "50px",
      height: "45px",
    },
    리더부여: {
      width: "65px",
      height: "65px",
    },
    기본: {
      width: "50px",
      height: "60px",
    },
  };

  // 현재 PNG 아이콘 스타일
  const currentPngStyle = pngStyles[badgeText] || pngStyles.기본;

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
    iconWrapper: {
      width: "80px",
      height: "80px",
      background: isIncomplete ? "#D3D3D3" : "#FFCCC0", // 동그라미 배경
      borderRadius: "100px",
      marginRight: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    pngIcon: {
      ...currentPngStyle, // PNG 아이콘 크기 적용
      objectFit: "contain",
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
      <div style={styles.iconWrapper}>
        <img src={icon} alt="Icon" style={styles.pngIcon} /> {/* PNG 스타일 적용 */}
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
