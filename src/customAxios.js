import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isInterceptorSetup = false;

const setupInterceptors = (navigate) => {
  if (isInterceptorSetup) return; // 이미 설정된 경우 중복 방지
  isInterceptorSetup = true;

  // 요청 Interceptor
  customAxios.interceptors.request.use(
    (config) => {
      // 요청 전 처리 (헤더 추가 등 필요 시 여기에 작성 가능)
      return config;
    },
    (error) => {
      // 요청 에러 처리
      return Promise.reject(error);
    }
  );

  // 응답 Interceptor
  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.warn("로그인 만료");
        navigate("/login", { replace: true });
      }
      // 다른 에러는 그대로 전달
      return Promise.reject(error);
    }
  );
};

export { customAxios, setupInterceptors };
