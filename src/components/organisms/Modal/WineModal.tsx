import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReviewBtn from "../../atoms/Buttons/ReviewBtn";
import Like from "../../atoms/Icons/like";
import ReviewInput from "../../atoms/Inputs/ReviewInput";
import ReviewWineName from "../../atoms/Texts/ReviewWineName";
import Stars from "../../atoms/Icons/Stars";
import Reviews from "../Reviews/Reviews";
import axios from "axios";
import SignInModal from "../Modal/SignInModal";
import Image from "../../atoms/Imgs/Image";
import wineSample from "../../../img/wine_sample.png";
import Rating from "../../organisms/Ratings/ModalRating";
import GuestReviews from "../Reviews/GuestReviews";

require("dotenv").config();
const server = process.env.REACT_APP_API_SERVER || "https://localhost:4000/";

interface Props {
  closeModal: () => void;
  ModalOpen: boolean;
  ModalEl: any;
  image: any;
  randomWine: {
    name: string;
    id: number;
    likeCount: number;
    description: string;
    image: string;
    price: number;
    sort: string;
    tags: object[];
    rating_avg: number;
  };
  landingCommentList: any;
  handleComments: () => void;
  isUserInfo: {
    id: number;
    email: string;
    nickname: string;
    image: string;
    likes: number;
    bad: [];
    good: [];
    tags?: [];
    wines?: [];
  };
}

type Comment = {
  user: string;
  text: string;
  rating: number;
};

function WineModal({
  closeModal,
  image,
  ModalEl,
  randomWine,
  landingCommentList,
  handleComments,
  isUserInfo,
  ModalOpen,
}: Props) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState("게스트");
  const [signInOpen, setsSignIn] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [commentList, setCommentList] = useState<any[]>([]);
  // ! 랜더링 될 코멘트들 [{},{},{}....]

  const [comment, setComment] = useState<Comment>({
    // ! 현재 코멘트 상태
    user: userName,
    text: "",
    rating: rating,
  });

  const handleTextArea = (e: any) => {
    setComment({
      text: `${e.target.value}`,
      user: `${userName}`,
      rating: rating,
    });
  };
  // * TextArea 값 상태

  const handleSubmitClick = async () => {
    // * comment 상태 초기화
    await axios
      .post(
        `${server}comment`,
        {
          rating: comment.rating,
          wineId: randomWine.id,
          text: comment.text,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((data) => {
        handleComments();
      })
      .catch((err) => {
        switch (err.response.data.message) {
          case "rating is empty":
            return alert("평점을 입력해주세요");
          case "text is empty":
            return alert("리뷰가 비어있습니다");
        }
      });

    if (comment.text !== "") {
      setComment({
        text: "",
        user: `${userName}`,
        rating: 0,
      });
    } else if (comment.text === "") {
      setComment({
        text: "",
        user: `${userName}`,
        rating: 0,
      });
    }
  };
  // * 댓글 작성버튼을 누르면 랜딩시켜줄 comments에 작성된 comment가 들어감

  let login: any = sessionStorage.getItem("login");

  useEffect(() => {
    if (userName === "게스트") {
      if (commentList.length === 0) {
        return setCommentList(landingCommentList);
      }
    }
    if (userName !== "게스트") {
      // setModalUserInfo(isUserInfo);
      setCommentList(landingCommentList);
    }
  });

  useEffect(() => {}, [ModalOpen]);

  useEffect(() => {
    setCommentList(landingCommentList);
    if (JSON.parse(login) && sessionStorage.getItem("userInfo")) {
      let userInfo: any = sessionStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      setUserName(`${userInfo.nickname}`);
    } else if (!JSON.parse(login)) {
      setUserName("게스트");
      // * 세션 스토리지 로그인 상태가 거짓이면 유저이름을 "게스트"값으로 돌린다.
    }
  }, []);

  return (
    <section ref={ModalEl} className="winemodal">
      <div className="reviewHeader">
        <ReviewWineName name={randomWine.name} />
      </div>
      <div className="hrDiv">
        <hr className="hr2"></hr>
      </div>
      <div className="likeBox">
        <div>
          <div className="wineimg">
            <Image src={image} alt="와인" placeholderImg={wineSample} />
            <Like wineId={randomWine.id} isUserInfo={isUserInfo} />
            <div className="reviewHeader_">
              <div>{randomWine.likeCount}Likes!</div>
              <div>{randomWine.price}₩</div>
              <Rating
                rating_avg={randomWine.rating_avg}
                Style={"ModalWineRating2"}
              />
              <hr></hr>
            </div>
          </div>
          <div className="modalDescription">{randomWine.description}</div>
        </div>
      </div>

      {userName === "게스트" ? (
        <div className="guestReview review">
          <div className="guestReviewInput">
            <div>댓글을 작성하려면 로그인을 하셔야합니다.</div>
            <div
              className="guestBtn"
              onClick={() => setsSignIn(true)}
              style={{ cursor: "pointer" }}
            >
              로그인 바로가기
            </div>
          </div>

          <SignInModal
            isOpen={signInOpen}
            closeModal={() => setsSignIn(false)}
          />
          <ul className="reviewUl">
            {commentList.map((el: any) => {
              return (
                <GuestReviews
                  isUserInfo={isUserInfo}
                  commentText={el.text}
                  commentRating={el.rating}
                  key={el.id}
                  commentId={el.id}
                  bad_count={el.bad_count}
                  good_count={el.good_count}
                  createdAt={el.createdAt}
                  updatedAt={el.updatedAt}
                  user={el.user}
                  handleComments={handleComments}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="review">
          <div className="reviewInput">
            <div>
              <ReviewInput handleTextArea={handleTextArea} comment={comment} />
              <div className="stars_btn">
                <div style={{ display: "flex" }}>
                  {[1, 2, 3, 4, 5].map((idx) => {
                    return (
                      <Stars
                        key={idx}
                        idx={idx}
                        rating={rating}
                        hoverRating={hoverRating}
                        setRating={setRating}
                        setHoverRating={setHoverRating}
                      />
                    );
                  })}
                </div>
                <ReviewBtn handleClick={() => handleSubmitClick()} />
              </div>
            </div>
          </div>

          <ul className="reviewUl">
            {commentList.map((el: any) => {
              return (
                <Reviews
                  isUserInfo={isUserInfo}
                  commentText={el.text}
                  commentRating={el.rating}
                  key={el.id}
                  commentId={el.id}
                  bad_count={el.bad_count}
                  good_count={el.good_count}
                  createdAt={el.createdAt}
                  updatedAt={el.updatedAt}
                  user={el.user}
                  handleComments={() => handleComments()}
                />
              );
            })}
          </ul>
        </div>
      )}
      <span>
        <i className="fas fa-door-open modalExit" onClick={closeModal}></i>
      </span>
    </section>
  );
}

export default WineModal;
