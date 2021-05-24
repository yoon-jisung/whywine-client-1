import * as React from "react";
import GoToMainBtn from "../../atoms/Buttons/GoToMainBtn";
import GoToSurveyBtn from "../../atoms/Buttons/GoToSurveyBtn";

interface Props {
  isOpen: Boolean;
}

function SurveyModal({ isOpen }: Props) {
  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      {isOpen ? (
        <div className="SurveyModal">
          <h1>나의 와인 성향 테스트</h1>
          <br></br>
          <h1>어떤 와인 고를지 고민이시군요 ! </h1>
          <p>잘 오셨습니다. 이제부터 몆가지 간단한 설문 조사를 통해</p>
          <p>나에게 꼭 맞는 와인을 추천해드릴게요 따라오세요~</p>
          <div className="SurveyModalBtn">
            <GoToSurveyBtn />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SurveyModal;