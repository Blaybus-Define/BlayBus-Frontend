import { getTotalExpInfo } from "../CalcEx";
import colors from "../colors/colors";
import { theme } from "../themes/theme";
import LevelChip from "./LevelChip";

export const MyExpBox = ({
  levelName = "F1-I",
  totalExperience = 0,
  bgWhite = false,
}) => {
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

  // 경험치 계산
  const { nextLevel, nextLevelExp, remainExp, percent } = getTotalExpInfo(
    levelName,
    totalExperience
  );

  return (
    <div
      style={{
        ...theme.boxTheme.boxContainer,
        ...(bgWhite && { backgroundColor: "#FFF" }),
      }}
    >
      <div
        style={{
          ...theme.boxTheme.rowContainer,
          marginBottom: 12,
        }}
      >
        <div style={styles.subContainer}>
          <LevelChip
            text={
              levelName && levelName.length > 3
                ? `${levelName.slice(0, 2)} - ${levelName.slice(3)}`
                : levelName
            }
            color={level_color[levelName]}
          />
          <span className="Body-2-b" style={{ marginLeft: 8 }}>
            총 획득 경험치
          </span>
        </div>
        <div style={styles.subContainer}>
          <span className="Body-2-b" style={{ color: level_color[levelName] }}>
            {totalExperience.toLocaleString()}
          </span>
          <pre className="Body-2-b" style={{ color: colors.gray[600] }}>
            {" "}
            / {nextLevelExp.toLocaleString()}do
          </pre>
        </div>
      </div>
      <div style={theme.boxTheme.barContainer}>
        <div
          style={{
            ...theme.boxTheme.colorbar,
            width: `${percent}%`,
            backgroundColor: level_color[levelName],
          }}
        />
      </div>
      <div style={{ ...theme.boxTheme.rowContainer, marginTop: 8 }}>
        <span className="label-1-r">{levelName}</span>
        <div style={styles.subContainer}>
          <span className="label-1-b" style={{ color: level_color[levelName] }}>
            {`${remainExp.toLocaleString()}do`}
          </span>
          <pre className="label-1-r" style={{ color: colors.gray[600] }}>
            {" "}
            남았어요!
          </pre>
        </div>
        <span className="label-1-r">{nextLevel}</span>
      </div>
    </div>
  );
};

const styles = {
  subContainer: { display: "flex", alignItems: "center" },
};
