import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyExpScreen from "./screens/MyExpScreen";
import { getFirebaseToken } from "./FCM";
import { Toaster } from "react-hot-toast";
import { setupInterceptors, customAxios } from "./customAxios";
import NoticeDetailScreen from "./screens/notice/NoticeDetailScreen";
import NoticeScreen from "./screens/notice/NoticeScreen";

const Layout = () => (
  <div className="page">
    <div className="wrap">
      <Outlet />
    </div>
    <Navbar />
  </div>
);

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // FCM
  useEffect(() => {
    const requestPermission = async () => {
      if (!("Notification" in window)) {
        console.warn("이 브라우저는 알림을 지원하지 않습니다.");
        return;
      }

      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await getFirebaseToken(); // FCM 토큰 가져오기
        } else {
          console.warn("알림 권한이 거부되었습니다.");
          alert(
            "알림 권한을 허용하지 않으셨습니다. 알림 권한은 브라우저 설정에서 변경할 수 있습니다."
          );
        }
      } else {
        await getFirebaseToken();
      }
    };

    requestPermission();
  }, []);

  // Interceptor 초기화
  React.useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLogin) return;
      try {
        const response = await customAxios.get("/members/info");
        if (response.status === 200) {
          setIsLogin(true);
        }
        console.log("로그인중");
      } catch (error) {
        console.error("login state error: ", error);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<h2>메인</h2>} />
          <Route path="/myexp" element={<MyExpScreen />} />
          <Route path="/notice" element={<NoticeScreen />} />
          <Route path="/notice-detail" element={<NoticeDetailScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route
          path="/login"
          element={<LoginScreen setIsLogin={setIsLogin} />}
        />
      </Routes>
    </>
  );
}

export default App;
