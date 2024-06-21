import React, { useState } from "react";

import "./SingleGrpModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import Btn from "../../smallComponents/Btn/Btn";
import Map from "../../../pages/Map/Map";
import listavatars from "../../../data/listAvatars.json";
import BackDrop from "../../smallComponents/BackDrop/BackDrop";
const SingleGrpModal = ({ setOpenModal,groupId }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <BackDrop />
      <div className="singlegrpmodal">
        <div className="singlegrpmodal__close">
          <CloseIcon onClick={() => setOpenModal(false)} />{" "}
        </div>
        <section className="singlegrpmodal-content">
          <div className="singlegrpmodal-content-grp">
            <h1>#Zen Yoga After Hours</h1>
            <div className="singlegrpmodal-content-grp-info">
              <p>Monday @ 3:30pm</p>
              <p>In-person Event</p>
            </div>
            <div className="singlegrpmodal-content-grp-btns">
              <Btn
                textBtn={"Attending-Event"}
                bgColor={"#6c3ed64f"}
                fontSize={"16px"}
                fontWeight={"Bold"}
                textColor={"white"}
                height={"35px"}
                inputType="checkbox"
                checked={toggle}
                onChange={() => setToggle(!toggle)}
              />
              <Btn
                textBtn={"View Group"}
                bgColor={"#6c3ed64f"}
                fontSize={"16px"}
                fontWeight={"Bold"}
                textColor={"white"}
                height={"35px"}
              />
            </div>
            <p className="singlegrpmodal-content-grp-stmt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec
              suscipit, erat a rhoncus cursus, orci dui varius augue, vel
              blandit augue magna ut orci. Pellentesque in lorem volutpat,
              blandit urna eu, laoreet magna. Pellentesque sed eros tellus.
              Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem
              tincidunt faucibus ac vitae felis. Nam in sodales felis, nec
              dictum ex. In feugiat facilisis sapien, sed lobortis dui porttitor
              ut. Praesent consectetur nisl a nisi varius, ut auctor sem
              malesuada.
            </p>
            <h3>Gear You Need</h3>
            <p className="singlegrpmodal-content-grp-gear">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse lacinia eros vitae nunc feugiat sollicitudin.
              <ul>
                <li>
                  Donec suscipit, erat a rhoncus cursus, orci dui varius augue,
                  vel blandit augue magna ut orci.
                </li>
                <li>
                  Pellentesque in lorem volutpat, blandit urna eu, laoreet
                  magna. Pellentesque sed eros tellus. Donec gravida porta nibh
                  ac luctus.
                </li>
                <li>
                  Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis.
                  Nam in sodales felis, nec dictum ex.
                </li>
              </ul>
            </p>
            <div className="singlegrpmodal-content-grp-map">
              <h3>Location</h3>
              <Map />
            </div>
          </div>
          <div className="singlegrpmodal-content-joiners">
            <h1>Who's Joining</h1>
            <div className="singlegrpmodal-content-joiners-list">
              {" "}
              {listavatars.map((i, index) => (
                <div
                  className="singlegrpmodal-content-joiners-list-ppl"
                  key={index}
                >
                  <div className="avatarImage">
                    <img src={i.src} alt="" />
                  </div>
                  <div className="avatarName">
                    <p>{i.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleGrpModal;
