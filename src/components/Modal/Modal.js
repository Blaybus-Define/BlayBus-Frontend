import React, { useEffect, useState } from "react";
import "./Modal.css";
import Close from "../../icons/close.svg";
import colors from "../../colors/colors";
import PressableButton from "../PressableButton";

const Modal = ({ visible, onClose, onApply }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("전체");
  const [selectedClass, setSelectedClass] = useState("전체");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  // 날짜 입력
  const handleDateChange = (text, setInput) => {
    let formatDate = text.replace(/\D/g, ""); // 숫자만 추출

    if (formatDate.length <= 4) {
      formatDate = formatDate;
    } else if (formatDate.length <= 6) {
      formatDate = formatDate.slice(0, 4) + "-" + formatDate.slice(4);
    } else if (formatDate.length <= 8) {
      formatDate =
        formatDate.slice(0, 4) +
        "-" +
        formatDate.slice(4, 6) +
        "-" +
        formatDate.slice(6);
    } else {
      formatDate = formatDate.slice(0, 8);
    }
    setInput(formatDate);
  };

  useEffect(() => {
    // 모달이 열릴 때 스크롤 막기
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  const handleApply = () => {
    onApply(selectedPeriod, selectedClass); // 선택된 값 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className={`modal-overlay ${visible ? "show" : ""}`} onClick={onClose}>
      <div
        className={`modal-content ${visible ? "slide-in" : "slide-out"}`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않음
        style={{ color: colors.gray[900] }}
      >
        {/* 헤더 */}
        <div style={styles.header}>
          <PressableButton onClick={onClose} pressedStyle={{ opacity: 0.5 }}>
            <img src={Close} alt="close" />
          </PressableButton>
          <span className="title-3-bold">조회조건 선택</span>
          <div style={{ width: 24 }} />
        </div>
        {/* 내용 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "20px 24px 0px 24px",
          }}
        >
          <span className="subtitle-1-bold" style={{ marginBottom: 16 }}>
            조회기간
          </span>
          <div style={styles.filterContainer}>
            {["전체", "올해", "직접입력"].map((filter, index) => {
              const isFilter = filter === selectedPeriod;
              return (
                <PressableButton
                  key={index}
                  onClick={() => setSelectedPeriod(filter)}
                  pressedStyle={{ opacity: 0.5 }}
                  style={{
                    ...styles.button,
                    ...(isFilter && {
                      backgroundColor: colors.orange[50],
                      border: `1px solid ${colors.orange[500]}`,
                      color: colors.orange[500],
                    }),
                  }}
                >
                  <span
                    className={
                      isFilter ? "subtitle-1-bold" : "subtitle-1-regular"
                    }
                  >
                    {filter}
                  </span>
                </PressableButton>
              );
            })}
          </div>
          {selectedPeriod === "직접입력" && (
            <div style={{ ...styles.rowContainer, marginBottom: 20 }}>
              <input
                type="tel"
                className="Body-1-r"
                placeholder={"YYYY-MM-DD"}
                value={startDate}
                onChange={(e) => handleDateChange(e.target.value, setStartDate)}
                onFocus={() => setFocusedInput("startDate")}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...styles.input,
                  borderColor:
                    focusedInput === "startDate"
                      ? colors.gray[900]
                      : colors.gray[400],
                }}
              />
              <span className="Body-1-r" style={{ color: colors.gray[600] }}>
                ~
              </span>
              <input
                type="tel"
                className="Body-1-r"
                placeholder={"YYYY-MM-DD"}
                value={endDate}
                onChange={(e) => handleDateChange(e.target.value, setEndDate)}
                onFocus={() => setFocusedInput("endDate")}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...styles.input,
                  borderColor:
                    focusedInput === "endDate"
                      ? colors.gray[900]
                      : colors.gray[400],
                }}
              />
            </div>
          )}
          <span className="subtitle-1-bold" style={{ marginBottom: 16 }}>
            구분
          </span>
          <div style={{ ...styles.filterContainer, marginBottom: 24 }}>
            {["전체", "리더", "직무", "인사평가", "전사"].map(
              (filter, index) => {
                const isFilter = filter === selectedClass;
                return (
                  <PressableButton
                    key={index}
                    onClick={() => setSelectedClass(filter)}
                    pressedStyle={{ opacity: 0.5 }}
                    style={{
                      ...styles.button,
                      ...(isFilter && {
                        backgroundColor: colors.orange[50],
                        border: `1px solid ${colors.orange[500]}`,
                        color: colors.orange[500],
                      }),
                    }}
                  >
                    <span
                      className={
                        isFilter ? "subtitle-1-bold" : "subtitle-1-regular"
                      }
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {filter}
                    </span>
                  </PressableButton>
                );
              }
            )}
          </div>
          {/* 취소/확인 */}
          <div style={styles.rowContainer}>
            <PressableButton
              onClick={() => {
                setSelectedClass("전체");
                setSelectedPeriod("전체");
                onClose();
              }}
              pressedStyle={{ backgroundColor: colors.gray[200] }}
              style={{
                ...styles.yesNoButton,
                flex: 1,
                backgroundColor: colors.gray[100],
              }}
            >
              <span className="title-3-bold">취소</span>
            </PressableButton>
            <PressableButton
              onClick={handleApply}
              pressedStyle={{ backgroundColor: colors.orange[600] }}
              style={{
                ...styles.yesNoButton,
                flex: 2,
                backgroundColor: colors.orange[500],
              }}
            >
              <span className="title-3-bold" style={{ color: "#FFF" }}>
                확인
              </span>
            </PressableButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 24px",
    borderBottom: `1px solid ${colors.gray[300]}`,
  },
  button: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    border: `1px solid ${colors.gray[500]}`,
    backgroundColor: "#FFF",
  },
  filterContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: 20,
  },
  yesNoButton: {
    display: "flex",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  rowContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  input: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    color: colors.gray[900],
    borderRadius: 8,
    border: "1px solid",
    padding: "10px 0px",
    outline: "none",
    transition: "border-color 0.3s",
    textAlign: "center",
    direction: "ltr",
  },
};

export default Modal;
