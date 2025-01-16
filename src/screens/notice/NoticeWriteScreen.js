import { useNavigate } from "react-router-dom";
import { theme } from "../../themes/theme";
import PressableButton from "../../components/PressableButton";
import Close from "../../icons/close.svg";
import colors from "../../colors/colors";
import { useRef, useState } from "react";
import { customAxios } from "../../customAxios";
import { BottomButton } from "../../components/BottomButton";

const NoticeWriteScreen = ({ mode }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const textareaRef = useRef(null);

  // 내용에 맞춰 높이 조정
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight >= 177
          ? textareaRef.current.scrollHeight
          : 177
      }px`;
    }
  };

  const handlePost = async () => {
    try {
      await customAxios.post("/post", {
        title: title,
        content: content,
      });
      navigate(-1, { state: { from: "/notice/write" } });
    } catch (error) {
      console.log("post error: ", error);
    }
  };

  return (
    <div style={theme.noticeTheme.container}>
      {/* header */}
      <div
        style={{
          ...theme.noticeTheme.header,
          justifyContent: "space-between",
          backgroundColor: "#FFF",
          color: colors.gray[900],
        }}
      >
        <PressableButton
          onClick={() => navigate(-1)}
          pressedStyle={{ opacity: 0.5 }}
        >
          <img src={Close} alt="back" style={{ width: 24, height: 24 }} />
        </PressableButton>
        <span className="title-3-bold">게시글 작성</span>
        <div style={{ width: 24 }} />
      </div>

      <div style={styles.container}>
        {/* title */}
        <span className="Body-2-b">제목</span>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onFocus={() => setFocusedInput("title")}
          onBlur={() => setFocusedInput(null)}
          className="Body-1-r"
          style={{
            ...styles.titleContainer,
            borderColor:
              focusedInput === "title" ? colors.gray[900] : colors.gray[400],
          }}
        />
        {/* content */}
        <span className="Body-2-b">내용</span>
        <textarea
          ref={textareaRef}
          placeholder="게시글의 내용을 작성해주세요."
          value={content}
          onChange={(e) => {
            handleInput();
            setContent(e.target.value);
          }}
          onFocus={() => setFocusedInput("content")}
          onBlur={() => setFocusedInput(null)}
          className="Body-1-r"
          style={{
            ...styles.titleContainer,
            height: 177,
            outline: "none",
            borderColor:
              focusedInput === "content" ? colors.gray[900] : colors.gray[400],
          }}
        />
      </div>
      <div style={{ width: "100%", padding: 20 }}>
        <BottomButton
          onClick={handlePost}
          disabledCondition={title === "" || content === ""}
          text="작성 완료"
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    padding: 20,
  },
  titleContainer: {
    width: "100%",
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 8,
    padding: "10px 16px",
    borderWidth: 1,
    borderStyle: "solid",
    lineHeight: 1.8,
  },
};

export default NoticeWriteScreen;
