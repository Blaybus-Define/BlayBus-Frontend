import colors from "../colors/colors";
import PressableButton from "./PressableButton";

export const BottomButton = ({ disabledCondition, text, onClick }) => {
  return (
    <PressableButton
      onClick={onClick}
      pressedStyle={{ backgroundColor: colors.orange[600] }}
      style={{
        ...styles.container,
        backgroundColor: disabledCondition
          ? colors.gray[300]
          : colors.orange[500],
      }}
      disabled={disabledCondition}
    >
      <span
        className="title-3-bold"
        style={{
          color: disabledCondition ? colors.gray[500] : "#FFF",
        }}
      >
        {text}
      </span>
    </PressableButton>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
};
