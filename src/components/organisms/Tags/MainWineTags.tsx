import React, { useState } from "react";
import MainResetTagBtn from "../../atoms/Buttons/MainResetTagBtn";
import MainTypeTag from "../../atoms/Tags/MainTypeTag";
import MainLabel from "../../atoms/Tags/MainLabel";
import wine from "../../../img/wine_main.png";
import MainTags from "../../atoms/Tags/MainTags";

interface Tags {
  userMainTag: string[];
  userTypeTag: string[];
  setUserMainTag: React.Dispatch<React.SetStateAction<string[]>>;
  setTypeTag: React.Dispatch<React.SetStateAction<string[]>>;
  tags: any;
}
const body =
  "와인에서 말하는 바디란 와인을 마실 때 입안에서 느껴지는 무게감을 뜻합니다. (알코올 함량이 높으면 바디감이 묵직해 집니다)";
const tannin =
  "탄닌은 미각이 아니라 촉각입니다. 덜 익은 감에서 느껴지는 떫은 맛이 탄닌의 느낌과 가장 흡사합니다.";
const acidity =
  "과일에서 느껴지는 새콤한 신맛을 뜻 합니다. 와인의 산미는 전체적인 맛을 잡아주는 역할을 합니다.";
const sweetness =
  "와인에서 단맛은 기본적으로 포도가 가지고 있는 당분 때문에 느껴지는 맛 입니다.";
const wineFlavor = [body, tannin, acidity, sweetness];

const MainWineTags = ({
  userMainTag,
  setUserMainTag,
  userTypeTag,
  setTypeTag,
  tags,
}: Tags) => {
  const [userTags, setUserTags] = useState(JSON.parse(tags));

  return (
    <div>
      {/* <div className="mainLabelBox">
        <MainLabel />
      </div> */}
      <div className={"mainTagBox"}>
        <img src={wine} />

        <div className="typeTag">
          <MainTypeTag userTypeTag={userTypeTag} setTypeTag={setTypeTag} />
        </div>
        <div className="bodyTanninTag">
          <MainTags
            tags={tags}
            userTags={userTags[0]}
            tagTitle="바디."
            degreeENG={["body_light", "body_medium", "body_bold"]}
            degreeKOR={["가벼운", "적당한", "무거운"]}
            userMainTag={userMainTag}
            setUserMainTag={setUserMainTag}
            wineFlavor={wineFlavor[0]}
          />
          <MainTags
            tags={tags}
            userTags={userTags[1]}
            tagTitle="탄닌."
            degreeENG={["tannins_smooth", "tannins_medium", "tannins_tannic"]}
            degreeKOR={["부드러운", "적당한", "떫은"]}
            userMainTag={userMainTag}
            setUserMainTag={setUserMainTag}
            wineFlavor={wineFlavor[1]}
          />
        </div>
        <div className="aciditySweetnessTag">
          <MainTags
            tags={tags}
            userTags={userTags[2]}
            tagTitle="산미."
            degreeENG={["acidity_soft", "acidity_medium", "acidity_acidic"]}
            degreeKOR={["낮은", "적당한", "높은"]}
            userMainTag={userMainTag}
            setUserMainTag={setUserMainTag}
            wineFlavor={wineFlavor[2]}
          />
          <MainTags
            tags={tags}
            userTags={userTags[3]}
            tagTitle="당도."
            degreeENG={["sweetness_dry", "sweetness_medium", "sweetness_sweet"]}
            degreeKOR={["씁쓸한", "적당한", "달달한"]}
            userMainTag={userMainTag}
            setUserMainTag={setUserMainTag}
            wineFlavor={wineFlavor[3]}
          />
        </div>
      </div>
    </div>
  );
};

export default MainWineTags;
