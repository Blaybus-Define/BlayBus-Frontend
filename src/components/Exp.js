import React from "react";

const buttonStyles = {
  max: {
    backgroundColor: "#29C04F",
    color: "#FFFFFF",
  },
  med: {
    backgroundColor: "#FFBB00",
    color: "#FFFFFF",
  },
  failed: {
    backgroundColor: "#EC4B58",
    color: "#FFFFFF",
  },
  notAchieved: {
    backgroundColor: "#868B94",
    color: "#FFFFFF",
  },
};

const StatusButton = ({ status, width, height }) => {
  const statusText = {
    max: "MAX 달성",
    med: "MED 달성",
    failed: "달성실패",
    notAchieved: "미달성",
  };

  return (
    <button
      style={{
        ...buttonStyles[status],
        borderRadius: "8px",
        padding: "3px 8px",
        fontSize: "12px",
        fontWeight:"400",
        fontWeight: "normal",
        lineHeight:"16.2px",
        width: width || "auto", 
        height: height || "auto", 
        justifyContent:"center",
        alignContent:"center",
        gap:"10px",
      }}
    >
      {statusText[status]}
    </button>
  );
};

// App 컴포넌트로 사용 예시
// const Exp = () => {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//       <StatusButton status="max" width="100px" height="40px" />
//       <StatusButton status="med" width="120px" height="45px" />
//       <StatusButton status="failed" width="90px" height="35px" />
//       <StatusButton status="notAchieved" width="110px" height="50px" />
//     </div>
//   );
// };

export default Exp;
