import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import toast from "react-hot-toast";
// import axios from "axios";

// Firebase 초기화
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "blaybus-define.firebaseapp.com",
  projectId: "blaybus-define",
  storageBucket: "blaybus-define.firebasestorage.app",
  messagingSenderId: "853414956152",
  appId: "1:853414956152:web:9d065c119c7a963e85318d",
  measurementId: "G-H7TL40LF9S",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// FCM 토큰 가져오기
export async function getFirebaseToken() {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) {
      localStorage.setItem("fcmToken", token);
      // setting(token);
    } else {
      console.warn("알림 토큰을 가져올 수 없습니다.");
    }
  } catch (error) {
    console.error("Error getting token: ", error);
  }
}
