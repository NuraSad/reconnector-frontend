import "./BtnList.scss";
import plus from "../../../assets/icons/icon_plus.svg";
// import BtnPlus from "../../smallComponents/BtnPlus/BtnPlus";
import LinkBtn from "../../smallComponents/LinkBtn/LinkBtn";
import BtnPlus from "../../smallComponents/BtnPlus/BtnPlus";

function BtnList({ groupdId, onClickEvents, events }) {
  return (
    <section className="btnList">
      {events.map((each) => (
        // <BtnPlus
        //   key={each.id}
        //   textBtn={each.title}
        //   padding={"1rem"}
        //   fontSize={"14px"}
        //   bgColor={"#6c3ed64f"}
        //   image={plus}
        //   imgHeight={"15px"}
        //   onClickFunction={onClickEvents}
        // />
        <button key={each.id} className="btnList__btn" onClick={onClickEvents}>
          <div className="btnList__btn__imgDiv">
            <img style={{ height: "15px" }} src={plus} alt={"plus"} />
            {each.title}
          </div>
        </button>
      ))}
    </section>
  );
}

export default BtnList;
