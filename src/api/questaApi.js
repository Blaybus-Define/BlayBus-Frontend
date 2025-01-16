import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

// 나의 퀘스트 조회 API
export const fetchMyQuests = async (year, month, week) => {
  try {
    const params = { year, month };
    if (week) params.week = week; // 선택적 파라미터 추가

    const response = await axios.get(`${BASE_URL}/quests/member`, {
      params, // Query Parameters
      headers: {
        Cookie: document.cookie, // 필요 시 쿠키 포함
      },
      withCredentials: true, // 인증 정보 포함
    });
    return response.data; // API 응답 반환
  } catch (error) {
    console.error("퀘스트 조회 실패:", error);
    throw error; // 에러 전달
  }
};
