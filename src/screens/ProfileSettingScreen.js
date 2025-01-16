import PressableButton from "../components/PressableButton";
import { theme } from "../themes/theme";
import Back from "../icons/arrow_back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import colors from "../colors/colors";
import { useEffect, useState } from "react";
import { BottomButton } from "../components/BottomButton";
import { customAxios } from "../customAxios";

const ProfileSettingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [beforeItem, setBeforeItem] = useState("default");
  const [selectedItem, setSelectedItem] = useState("default");
  const { profileCharacter } = location.state || {};

  useEffect(() => {
    setBeforeItem(profileCharacter);
  }, []);

  const handleChangeProfile = async () => {
    try {
      console.log(selectedItem.toUpperCase());
      const response = await customAxios.put(`/members/update-char`, {
        profileCharacter: selectedItem.toUpperCase(),
      });
      console.log("PUT: ", response);
      navigate(-1);
    } catch (error) {
      console.error("PUT error: ", error);
    }
  };

  const profiles = {
    profile: {
      default: require("../images/profile/character/profile_default.png"),
      flower: require("../images/profile/character/profile_flower.png"),
      cloud: require("../images/profile/character/profile_cloud.png"),
      music: require("../images/profile/character/profile_music.png"),
      heart: require("../images/profile/character/profile_heart.png"),
      star: require("../images/profile/character/profile_star.png"),
    },
    button: {
      default: require("../images/profile/button/profile_default_btn.png"),
      flower: require("../images/profile/button/profile_flower_btn.png"),
      cloud: require("../images/profile/button/profile_cloud_btn.png"),
      music: require("../images/profile/button/profile_music_btn.png"),
      heart: require("../images/profile/button/profile_heart_btn.png"),
      star: require("../images/profile/button/profile_star_btn.png"),
    },
  };

  const buttonData = [
    { id: "default", imgWidth: 36 },
    { id: "flower", imgWidth: 58 },
    { id: "music", imgWidth: 65 },
    { id: "cloud", imgWidth: 66 },
    { id: "heart", imgWidth: 68 },
    { id: "star", imgWidth: 60 },
  ];

  return (
    <div
      className="page"
      style={{
        ...theme.noticeTheme.container,
        backgroundColor: colors.Primary.bg,
      }}
    >
      {/* header */}
      <div
        style={{
          ...theme.noticeTheme.header,
          justifyContent: "space-between",
        }}
      >
        <PressableButton
          onClick={() => navigate(-1)}
          pressedStyle={{ opacity: 0.5 }}
        >
          <img src={Back} alt="back" style={{ width: 24, height: 24 }} />
        </PressableButton>
        <span className="title-3-bold">프로필 설정</span>
        <div style={{ width: 24 }} />
      </div>
      {/* profile */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 40,
        }}
      >
        <img
          src={profiles.profile[selectedItem]}
          alt="profile"
          style={{ width: 274, height: 274, marginTop: 48 }}
        />
      </div>
      {/* selectZone */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          backgroundColor: "#FFFFFFB3",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 20,
          boxShadow: "0px -2px 8px rgba(159, 32, 0, 0.1)",
        }}
      >
        {/* select */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            width: "100%",
            marginBottom: 16,
          }}
        >
          {buttonData.map((button) => (
            <div
              key={button.id}
              onClick={() => setSelectedItem(button.id)}
              style={{
                ...styles.selectButton,
                ...(selectedItem === button.id && {
                  backgroundColor: colors.orange[50],
                  borderColor: colors.orange[500],
                }),
              }}
            >
              <img
                src={profiles.button[button.id]}
                alt={button.id}
                style={{ width: button.imgWidth }}
              />
            </div>
          ))}
        </div>
        {/* button */}
        <BottomButton
          onClick={handleChangeProfile}
          disabledCondition={beforeItem === selectedItem}
          text="저장하기"
        />
      </div>
    </div>
  );
};

const styles = {
  selectButton: {
    display: "flex",
    width: 106,
    height: 106,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.gray[400],
    borderRadius: 8,
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
};

export default ProfileSettingScreen;
