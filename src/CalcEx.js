// 경험치 관련 계산 함수
const level_table = {
  F: {
    levels: [
      "F1-I",
      "F1-Ⅱ",
      "F2-I",
      "F2-Ⅱ",
      "F2-Ⅲ",
      "F3-I",
      "F3-Ⅱ",
      "F3-Ⅲ",
      "F4-I",
      "F4-Ⅱ",
      "F4-Ⅲ",
      "F5",
    ],
    experience: {
      "F1-I": 0,
      "F1-Ⅱ": 13500,
      "F2-I": 27000,
      "F2-Ⅱ": 39000,
      "F2-Ⅲ": 51000,
      "F3-I": 63000,
      "F3-Ⅱ": 78000,
      "F3-Ⅲ": 93000,
      "F4-I": 108000,
      "F4-Ⅱ": 126000,
      "F4-Ⅲ": 144000,
      F5: 162000,
    },
  },
  B: {
    levels: ["B1", "B2", "B3", "B4", "B5", "B6"],
    experience: {
      B1: 0,
      B2: 24000,
      B3: 52000,
      B4: 78000,
      B5: 117000,
      B6: 169000,
    },
  },
  G: {
    levels: ["G1", "G2", "G3", "G4", "G5", "G6"],
    experience: {
      G1: 0,
      G2: 24000,
      G3: 52000,
      G4: 78000,
      G5: 117000,
      G6: 169000,
    },
  },
  T: {
    levels: ["T1", "T2", "T3", "T4", "T5", "T6"],
    experience: {},
  },
};

// 총 획득 경험치
// return 다음 레벨, 다음 레벨 경험치, 남은 경험치, %
export const getTotalExpInfo = (level, totalExp) => {
  if (!level) {
    return {
      nextLevel: "None",
      nextLevelExp: 0,
      remainExp: 0,
      percent: 0,
    };
  }

  const { levels, experience } = level_table[level.slice(0, 1)];
  const currentIndex = levels.indexOf(level);

  // 최고 레벨일 경우
  if (currentIndex === levels.length - 1) {
    return {
      nextLevel: "max",
      nextLevelExp: experience[level],
      remainExp: 0,
      percent: 100,
    };
  } else if (currentIndex === -1) {
    // 잘못된 값일 경우
    return {
      nextLevel: "None",
      nextLevelExp: 0,
      remainExp: 0,
      percent: 0,
    };
  }

  const nextLevel = levels[currentIndex + 1];
  const nextLevelExp = experience[nextLevel];
  const remainExp = Math.max(nextLevelExp - totalExp, 0); // 음수 방지
  const percent = Math.round((totalExp / nextLevelExp) * 100);
  return {
    nextLevel,
    nextLevelExp,
    remainExp,
    percent,
  };
};
