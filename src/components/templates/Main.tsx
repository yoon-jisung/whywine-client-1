import * as React from "react";
import ClickWine from "../atoms/Imgs/ClickWine";
import MainNav from "../organisms/Buttons/MainNav";
import MainWineCon from "../organisms/Containers/MainWineCon";
import MainWineTagCon from "../organisms/Containers/MainWineTagCon";
import MainSearchBar from "../organisms/Inputs/MainSearchBar";
import ReviewModal from "../organisms/Modal/ReviewModal";
import Header from "../organisms/Header/LandingHeader";

const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="mainContainers">
        <MainWineCon />
        <MainWineTagCon />
      </div>
    </div>
  );
};

export default Main;
