import React from "react";
import "../fonts/font.css";
import colors from "../colors/colors";
import { theme } from "../themes/theme";

const QuestScreen = () => {
  return (
    <div className="page" style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <button style={styles.navButton}>
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/56d53050-64c3-4a76-88d2-ed9988899eac"
            alt="Previous"
            style={styles.navIcon}
          />
        </button>
        <span style={styles.headerTitle}>2025년 1월</span>
        <button style={styles.navButton}>
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f9e2e97c-a932-49fd-8235-798ad42cfefe"
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

      {/* Cards Section */}
      <div style={styles.cardsContainer}>
        {tasks.map((task, index) => (
          <div key={index} style={styles.card}>
            <div style={{ ...styles.cardIcon, backgroundColor: task.iconBg }}>
              <img src={task.icon} alt={task.title} style={styles.cardImage} />
            </div>
            <div style={styles.cardDetails}>
              <div style={styles.cardHeader}>
                <span style={styles.cardTitle}>{task.title}</span>
                <div style={{ ...styles.badge, backgroundColor: task.badgeBg }}>
                  <span style={styles.badgeText}>{task.badgeText}</span>
                </div>
              </div>
              <div style={styles.cardSubDetails}>
                <div style={{ ...styles.status, backgroundColor: task.statusBg }}>
                  <span style={styles.statusText}>{task.status}</span>
                </div>
                <div style={styles.monthBox}>
                  <span style={styles.monthText}>{task.month}</span>
                </div>
              </div>
              <div style={styles.cardFooter}>
                <span style={styles.dateText}>{task.date}</span>
                <span style={styles.attemptsText}>{task.attempts}</span>
              </div>
            </div>
          </div>
        ))}
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

const tasks = [
  {
    title: "업무개선",
    badgeText: "리더부여",
    badgeBg: "#FFEFEB",
    icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/668a35b8-6eb9-4912-b120-aa7a3e3568f8",
    iconBg: "#F2F3F6",
    status: "미달성",
    statusBg: "#868B94",
    month: "1월",
    date: "2024.01.12",
    attempts: "5회",
  },
  {
    title: "헬특근",
    badgeText: "MAX 달성",
    badgeBg: "#28BF4F",
    icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/abfda834-2e6d-4e45-8ce8-14f6537e2344",
    iconBg: "#FFCCC0",
    status: "달성",
    statusBg: "#28BF4F",
    month: "1월",
    date: "2024.01.15",
    attempts: "3회",
  },
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
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.1)",
  },
  navButton: {
    backgroundColor: "transparent",
    border: "none",
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212124",
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
    padding: 8,
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
  },
  tabSubtitle: {
    fontSize: 12,
  },
  cardsContainer: {
    padding: "0 16px",
  },
  card: {
    display: "flex",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.1)",
  },
  cardIcon: {
    width: 80,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginRight: 16,
  },
  cardImage: {
    width: 66,
    height: 66,
  },
  cardDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212124",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF5C35",
  },
  cardSubDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  status: {
    padding: "4px 8px",
    borderRadius: 8,
    color: "#FFFFFF",
    fontSize: 12,
  },
  monthBox: {
    padding: "4px 8px",
    borderRadius: 8,
    backgroundColor: "#EAEBEE",
  },
  monthText: {
    fontSize: 12,
    color: "#868B94",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "#868B94",
  },
  attemptsText: {
    fontSize: 12,
    color: "#212124",
  },
};

export default QuestScreen;
