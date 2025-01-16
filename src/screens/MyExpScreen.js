import React, { useState, useEffect, useRef } from "react";
import "../fonts/font.css";
import colors from "../colors/colors";
import { theme } from "../themes/theme";
import Help from "../icons/help.svg";
import PressableButton from "../components/PressableButton";
import LevelChip from "../components/LevelChip";
import LevelTableF from "../images/myexp/leveltable_f.png";
import LevelTableB from "../images/myexp/leveltable_b.png";
import LevelTableG from "../images/myexp/leveltable_g.png";
import { customAxios } from "../customAxios";
import { getTotalExpInfo } from "../CalcEx";

const MyExpScreen = ({ myLevel }) => {
  const level_color = {
    "F1-I": colors.Level.Bronze,
    "F1-Ⅱ": colors.Level.Bronze,
    "F2-I": colors.Level.Sliver,
    "F2-Ⅱ": colors.Level.Sliver,
    "F2-Ⅲ": colors.Level.Sliver,
    "F3-I": colors.Level.Gold,
    "F3-Ⅱ": colors.Level.Gold,
    "F3-Ⅲ": colors.Level.Gold,
    "F4-I": colors.Level.Sapphier,
    "F4-Ⅱ": colors.Level.Sapphier,
    "F4-Ⅲ": colors.Level.Sapphier,
    F5: colors.Level.Ruby,

    B1: colors.Level.Bronze,
    B2: colors.Level.Sliver,
    B3: colors.Level.Gold,
    B4: colors.Level.Sapphier,
    B5: colors.Level.Ruby,
    B6: colors.Level.Amethyst,

    G1: colors.Level.Bronze,
    G2: colors.Level.Sliver,
    G3: colors.Level.Gold,
    G4: colors.Level.Sapphier,
    G5: colors.Level.Ruby,
    G6: colors.Level.Amethyst,

    T1: colors.Level.Bronze,
    T2: colors.Level.Sliver,
    T3: colors.Level.Gold,
    T4: colors.Level.Sapphier,
    T5: colors.Level.Ruby,
    T6: colors.Level.Amethyst,
  };

  const [tableVisible, setTableVisible] = useState(false);
  const [annualExpPercents, setAnnualExpPercents] = useState([]);
  const [firstHalfPerformanceExp, setFirstHalfPerformanceExp] = useState(0);
  const [secondHalfPerformanceExp, setSecondHalfPerformanceExp] = useState(0);
  const [jobRoleExp, setJobRoleExp] = useState(0);
  const [leaderExp, setLeaderExp] = useState(0);
  const [annualExp, setAnnualExp] = useState(0);
  const [projectExp, setProjectExp] = useState(0);
  const [previousExp, setPreviousExp] = useState(0);
  // 올해 획득 가능한 경험치
  const levelName =
    myLevel && myLevel.length > 3
      ? `${myLevel.slice(0, 2)} - ${myLevel.slice(3)}`
      : myLevel;

  const tableRef = useRef(null);

  useEffect(() => {
    // table 영역 외부 클릭 시 tableVisible을 false로 설정
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setTableVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const { data } = await customAxios.get("/experiences/status");
        console.log("Get experiences: ", data);
        setFirstHalfPerformanceExp(data.firstHalfPerformanceExp);
        setSecondHalfPerformanceExp(data.secondHalfPerformanceExp);
        setJobRoleExp(data.jobRoleExp);
        setLeaderExp(data.leaderExp);
        setAnnualExp(data.annualExp);
        setProjectExp(data.projectExp);
        setPreviousExp(data.previousExp);

        const percents = [
          `${data.firstHalfPerformanceExp / 9000}%`,
          `${data.secondHalfPerformanceExp / 9000}%`,
          `${data.jobRoleExp / 9000}%`,
          `${data.leaderExp / 9000}%`,
        ];
        setAnnualExpPercents(percents);
      } catch (error) {
        console.err("Get experiences: ", error);
      }
    };
    loadExperiences();
  }, []);

  const ColorBar = ({ percent }) => {
    return (
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: percent[0],
            height: 12,
            backgroundColor: colors.orange[900],
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
          }}
        />
        <div
          style={{
            width: percent[1],
            height: 12,
            backgroundColor: colors.orange[600],
          }}
        />
        <div
          style={{
            width: percent[2],
            height: 12,
            backgroundColor: colors.orange[400],
          }}
        />
        <div
          style={{
            width: percent[3],
            height: 12,
            backgroundColor: colors.orange[200],
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
          }}
        />
      </div>
    );
  };

  const LabelEx = ({ index, percent }) => {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: [
              colors.orange[900],
              colors.orange[600],
              colors.orange[400],
              colors.orange[200],
            ][index],
            borderRadius: 30,
            marginRight: 8,
            marginTop: 3,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              ...styles.subText,
              lineHeight: 1.4,
              marginBottom: 4,
            }}
          >
            {["상반기", "하반기", "직무별", "리더부여"][index]}
            <br />
            {["인사평가", "인사평가", "퀘스트", "퀘스트"][index]}
          </span>
          <span className="subtitle-2-bold">
            {percent}
            <span style={styles.percent}>%</span>
          </span>
        </div>
      </div>
    );
  };

  const LabelLevel = ({ fullLevel, index }) => {
    const level = fullLevel.slice(0, 1);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span className="label-1-b" style={{ marginBottom: 4 }}>
          {level === "F"
            ? ["F1", "F2", "F3", "F4", "F5"][index]
            : level === "B"
            ? ["B1", "B2", "B3", "B4", "B5", "B6"][index]
            : ["G1", "G2", "G3", "G4", "G5", "G6"][index]}
        </span>
        <span style={styles.subText}>
          {level === "F"
            ? ["0", "27,000", "63,000", "108,000", "162,000"][index]
            : level === "B"
            ? ["0", "24,000", "52,000", "78,000", "117,000", "169,000"][index]
            : ["0", "24,000", "52,000", "78,000", "117,000", "169,000"][index]}
        </span>
      </div>
    );
  };

  // 경험치 계산
  const { nextLevel, nextLevelExp, remainExp, percent } = getTotalExpInfo(
    myLevel,
    annualExp + previousExp
  );

  return (
    <div
      className="page"
      style={{
        ...theme.pageTheme.container,
        backgroundColor: colors.Primary.bg,
        padding: "85px 20px 40px 20px",
      }}
    >
      {/* header */}
      <div style={theme.pageTheme.header}>
        <span className="title-3-bold">내 경험치</span>
      </div>
      {/* 총 획득 경험치 */}
      <div style={{ ...theme.boxTheme.boxContainer, marginTop: 20 }}>
        <span className="Body-2-b" style={{ marginBottom: 4 }}>
          총 획득 경험치
        </span>
        <span style={styles.subText}>
          올해+작년 획득 총 경험치 / 다음 레벨 요구 경험치
        </span>
        <div
          style={{
            ...theme.boxTheme.rowContainer,
            marginTop: 8,
            marginBottom: 12,
          }}
        >
          <div style={styles.subContainer}>
            <span className="title-3-bold">{percent}</span>
            <span style={styles.percent}>%</span>
          </div>
          <div style={styles.subContainer}>
            <span className="Body-2-b" style={{ color: level_color[myLevel] }}>
              {annualExp + previousExp}
            </span>
            <pre style={styles.grayDo}> / {nextLevelExp}do</pre>
          </div>
        </div>
        <div style={theme.boxTheme.barContainer}>
          <div
            style={{
              ...theme.boxTheme.colorbar,
              width: `${(annualExp + previousExp) / nextLevelExp}%`,
              backgroundColor: level_color[myLevel],
            }}
          />
        </div>
        <div style={{ ...theme.boxTheme.rowContainer, marginTop: 8 }}>
          <span className="label-1-r">{levelName}</span>
          <div style={styles.subContainer}>
            <span className="label-1-b" style={{ color: level_color[myLevel] }}>
              {remainExp}do
            </span>
            <pre style={styles.subText}> 남았어요!</pre>
          </div>
          <span className="label-1-r">
            {nextLevel && nextLevel.length > 3
              ? `${nextLevel.slice(0, 2)} - ${nextLevel.slice(3)}`
              : nextLevel}
          </span>
        </div>
      </div>
      {/* 올해 획득한 경험치 */}
      <div style={theme.boxTheme.boxContainer}>
        <span className="Body-2-b" style={{ marginBottom: 4 }}>
          올해 획득한 경험치
        </span>
        <span style={styles.subText}>
          올해 획득한 경험치 / 올해 획득 가능한 경험치
        </span>
        <div
          style={{
            ...theme.boxTheme.rowContainer,
            marginTop: 8,
          }}
        >
          <div style={styles.subContainer}>
            <span className="title-3-bold">{Math.round(annualExp / 9000)}</span>
            <span style={styles.percent}>%</span>
          </div>
          <div style={styles.subContainer}>
            <span style={styles.orangeDo}>{annualExp}</span>
            <pre style={styles.grayDo}> / 9,000do</pre>
          </div>
        </div>
        <div style={{ ...theme.boxTheme.barContainer, margin: "12px 0px" }}>
          <div style={{ ...theme.boxTheme.colorbar, width: "100%" }}>
            <ColorBar percent={annualExpPercents} />
          </div>
        </div>
        <div
          style={{
            ...styles.subContainer,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {annualExpPercents.map((percent, index) => (
            <LabelEx key={index} percent={parseFloat(percent)} index={index} />
          ))}
        </div>
      </div>
      {/* 올해 전사 프로젝트 경험치 */}
      <div style={theme.boxTheme.boxContainer}>
        <div style={theme.boxTheme.rowContainer}>
          <span className="Body-2-b" style={{ marginBottom: 4 }}>
            올해 전사 프로젝트 경험치
          </span>
          <span style={styles.orangeDo}>
            {projectExp}
            <span style={styles.grayDo}>do</span>
          </span>
        </div>
        <span style={styles.subText}>
          올해 획득 가능한 경험치(9000do)에 포함되지 않습니다.
        </span>
      </div>
      {/* 작년까지 획득한 경험치 */}
      <div style={theme.boxTheme.boxContainer}>
        <span className="Body-2-b" style={{ marginBottom: 4 }}>
          작년까지 획득한 경험치
        </span>
        <span style={styles.subText}>
          작년까지 획득한 경험치 / 다음 레벨 요구 경험치
        </span>
        <div
          style={{
            ...theme.boxTheme.rowContainer,
            marginTop: 8,
            marginBottom: 12,
          }}
        >
          <div style={styles.subContainer}>
            <span className="title-3-bold">
              {Math.round(previousExp / nextLevelExp)}
            </span>
            <span style={styles.percent}>%</span>
          </div>
          <div style={styles.subContainer}>
            <span style={styles.orangeDo}>{previousExp}</span>
            <pre style={styles.grayDo}> / {nextLevelExp}do</pre>
          </div>
        </div>
        <div style={theme.boxTheme.barContainer}>
          <div
            style={{
              ...theme.boxTheme.colorbar,
              width: `${previousExp / nextLevelExp}%`,
              backgroundColor: colors.orange[500],
            }}
          />
        </div>
      </div>
      <div style={{ ...theme.boxTheme.boxContainer, marginBottom: 29 }}>
        <div style={styles.subContainer}>
          <span className="Body-2-b">내 레벨</span>
          <div
            ref={tableRef}
            style={{
              display: "flex",
              position: "relative",
            }}
          >
            <PressableButton
              onClick={() => setTableVisible(!tableVisible)}
              style={{ display: "flex", marginLeft: 8 }}
              pressedStyle={{ opacity: 0.5 }}
            >
              <img src={Help} alt="icon" style={{ width: 20, height: 20 }} />
            </PressableButton>
            {tableVisible && (
              <img
                src={
                  myLevel.slice(0, 1) === "F"
                    ? LevelTableF
                    : myLevel.slice(0, 1) === "B"
                    ? LevelTableB
                    : LevelTableG
                }
                alt="table"
                style={{
                  width: 220,
                  position: "absolute",
                  zIndex: 11,
                  bottom: 14,
                  left: -18,
                }}
              />
            )}
          </div>
        </div>
        <div
          style={{
            ...theme.boxTheme.rowContainer,
            height: 26,
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          <div style={{ ...theme.boxTheme.barContainer, height: 8 }}>
            <div
              style={{
                ...theme.boxTheme.colorbar,
                width: `${(annualExp + previousExp) / 162000}%`,
                backgroundColor: level_color[myLevel],
                height: 8,
              }}
            />
            <div
              style={{
                position: "absolute",
                zIndex: 10,
                left: `${((annualExp + previousExp) / 162000) * 100 - 4}%`,
              }}
            >
              <LevelChip text={levelName} color={level_color[myLevel]} />
            </div>
          </div>
        </div>
        <div
          style={{
            ...styles.subContainer,
            width: "100%",
            justifyContent: "space-between",
            padding: "0px 0px 0px 6px",
          }}
        >
          {(myLevel.startsWith("F") ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5]).map(
            (n) => (
              <LabelLevel key={n} fullLevel="F1-I" index={n} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  subContainer: { display: "flex", alignItems: "center" },
  subText: {
    fontFamily: "Pretendard",
    fontWeight: 400,
    fontSize: 12,
    color: colors.gray[600],
  },
  percent: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: 12,
    color: colors.gray[600],
  },
  orangeDo: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: 14,
    color: colors.orange[500],
  },
  grayDo: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: 14,
    color: colors.gray[600],
  },
};

export default MyExpScreen;
