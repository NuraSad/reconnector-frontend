import "./BtnList.scss";
import plus from "../../../assets/icons/icon_plus.svg";
// import BtnPlus from "../../smallComponents/BtnPlus/BtnPlus";
import LinkBtn from "../../smallComponents/LinkBtn/LinkBtn";

function BtnList({ groupdId, onClickEvents, events }) {
  return (
    <section className="btnList">
      {events.map((each) => (
        <LinkBtn
          key={each.id}
          textBtn={each.title}
          padding={"1rem"}
          fontSize={"14px"}
          bgColor={"#6c3ed64f"}
          image={plus}
          imgHeight={"15px"}
          onClickFunction={onClickEvents}
        />
      ))}
    </section>
  );
}

export default BtnList;
