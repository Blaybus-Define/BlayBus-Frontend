import React, { useEffect, useState } from "react";
import { theme } from "../../themes/theme";
import { useLocation, useNavigate } from "react-router-dom";
import colors from "../../colors/colors";
import { NoticeBox } from "../../components/NoticeBox";
import { customAxios } from "../../customAxios";
import PressableButton from "../../components/PressableButton";
import Add from "../../icons/add.svg";

const NoticeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin");
  const [post, setPost] = useState([]);

  const loadPost = async () => {
    try {
      const { data } = await customAxios.get("/post");
      console.log("GET post: ", data);
      setPost(data.postResponseList);
    } catch (error) {
      console.error("GET error: ", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadPost();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (location.state?.from === "/notice/write") {
      loadPost();
      console.log("게시글 변경 GET");
    }
  }, [location.state?.from]);

  return (
    <div className="page" style={theme.noticeTheme.container}>
      {/* header */}
      <div style={theme.noticeTheme.header}>
        <span className="title-3-bold">게시판</span>
      </div>

      <div style={styles.contentContainer}>
        {post.map((post, index) => {
          return (
            <NoticeBox
              key={index}
              title={post.title}
              content={post.content}
              date={post.createdAt}
              onClick={() => {
                navigate("/notice/detail", {
                  state: {
                    title: post.title,
                    content: post.content,
                    date: post.createdAt,
                  },
                });
              }}
            />
          );
        })}
      </div>
      {/* admin account */}
      {isAdmin === "true" && (
        <PressableButton
          onClick={() => {
            navigate("/notice/write");
          }}
          style={styles.button}
          pressedStyle={{ backgroundColor: colors.orange[600] }}
        >
          <img src={Add} alt="add" style={{ width: 20 }} />
          <span
            className="subtitle-1-bold"
            style={{ color: "#FFF", marginLeft: 4 }}
          >
            글쓰기
          </span>
        </PressableButton>
      )}
    </div>
  );
};

const styles = {
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    alignItems: "start",
    backgroundColor: "#FFF",
    color: colors.gray[900],
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    padding: "12px 20px",
    backgroundColor: colors.orange[500],
    position: "fixed",
    bottom: 64,
    right: 20,
  },
};

export default NoticeScreen;
