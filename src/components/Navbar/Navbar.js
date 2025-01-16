import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import HomeOrange from "../../icons/navbar/home_activate.svg";
import HomeGray from "../../icons/navbar/home_gray.svg";
import ExpOrange from "../../icons/navbar/my_exp_activate.svg";
import ExpGray from "../../icons/navbar/my_exp_gray.svg";
import QuestOrange from "../../icons/navbar/quest_activate.svg";
import QuestGray from "../../icons/navbar/quest_gray.svg";
import NoticeOrange from "../../icons/navbar/notice_activate.svg";
import NoticeGray from "../../icons/navbar/notice_gray.svg";
import MyOrange from "../../icons/navbar/my_activate.svg";
import MyGray from "../../icons/navbar/my_gray.svg";
import colors from "../../colors/colors";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const allowedPaths = [
    "/",
    "/myexp",
    "/quest",
    "/notice",
    "/notice/detail",
    "/profile",
    "/quest",
  ];


  // 현재 경로가 allowedPaths에 포함되지 않으면 null 반환
  if (!allowedPaths.includes(location.pathname)) {
    return null;
  }

  const handleNavigation = (path) => {
    // 현재 경로와 이동하려는 경로가 같으면 무시
    if (location.pathname === path) return;
    navigate(path, { replace: true });
  };

  return (
    <nav className="nav_bar">
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/");
          }}
          style={styles.navContainer}
        >
          <img
            src={location.pathname === "/" ? HomeOrange : HomeGray}
            alt="home"
          />
          홈
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/myexp"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/myexp");
          }}
          style={styles.navContainer}
        >
          <img
            src={location.pathname === "/myexp" ? ExpOrange : ExpGray}
            alt="experience"
          />
          내 경험치
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/quest"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/quest");
          }}
          style={styles.navContainer}
        >
          <img
            src={location.pathname === "/quest" ? QuestOrange : QuestGray}
            alt="quest"
          />
          퀘스트
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/notice"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/notice");
          }}
          style={styles.navContainer}
        >
          <img
            src={
              location.pathname === "/notice"
                ? NoticeOrange
                : location.pathname === "/notice/detail"
                ? NoticeOrange
                : NoticeGray
            }
            alt="notice"
          />
          <span
            style={{
              ...(location.pathname === "/notice/detail" && {
                color: colors.orange[500],
                fontWeight: 700,
              }),
            }}
          >
            게시판
          </span>
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/profile");
          }}
          style={styles.navContainer}
        >
          <img
            src={location.pathname === "/profile" ? MyOrange : MyGray}
            alt="profile"
          />
          프로필
        </NavLink>
      </div>
    </nav>
  );
}

const styles = {
  navContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
