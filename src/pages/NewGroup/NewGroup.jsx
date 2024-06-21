import { useState } from "react";
import "./NewGroup.scss";
import Btn from "../../components/smallComponents/Btn/Btn";

function NewGroup() {
  //state for group name
  const [newGroup, setNewGroup] = useState({});
  const [toggleOnline, setToggleOnline] = useState(false);
  const [togglePerson, setTogglePerson] = useState(true);

  //set the group name in the newgroup object
  function groupNaming(e) {
    let groupName = e.target.value;
    setNewGroup((prevState) => ({
      ...prevState,
      groupName: groupName,
    }));
  }

  //set the online
  function online() {
    setToggleOnline(!toggleOnline);

    if (toggleOnline === true) {
      setNewGroup((prevState) => ({
        ...prevState,
        online: true,
      }));
    } else {
      setNewGroup((prevState) => ({
        ...prevState,
        online: false,
      }));
    }
  }

  //set the online
  function person() {
    setTogglePerson(!togglePerson);

    if (togglePerson === true) {
      setNewGroup((prevState) => ({
        ...prevState,
        inperson: true,
      }));
    } else {
      setNewGroup((prevState) => ({
        ...prevState,
        inperson: false,
      }));
    }
  }

  console.log(newGroup);
  return (
    <section className="newGroup">
      <h1>Create New Group</h1>
      <div className="newGroup__col-1">
        <div className="newGroup__input">
          <label>What is this exciting new group called?</label>
          <input type="text" name="groupName" onChange={groupNaming}></input>
        </div>
        <div className="newGroup__input">
          <label>How can people attend {newGroup.groupName}?</label>
          <div className="newGroup__check">
            <Btn
              textBtn={"In-person?"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              inputType="checkbox"
              checked={toggleOnline}
              onChange={online}
              width={"205px"}
              name="inperson"
            />
            <Btn
              textBtn={"Online?"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              inputType="checkbox"
              checked={togglePerson}
              onChange={person}
              width={"205px"}
              name="online"
            />
          </div>
        </div>
        <div className="newGroup__input">
          <label>When do people show up?</label>
          <div className="newGroup__check">
            <Btn
              textBtn={"Sunday"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              onChange={online}
              width={"205px"}
              name="inperson"
            />
            <Btn
              textBtn={"Monday"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              onChange={person}
              width={"205px"}
              name="online"
            />
            <Btn
              textBtn={"Tuesday"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              onChange={online}
              width={"205px"}
              name="inperson"
            />
            <Btn
              textBtn={"Wednesday"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              onChange={person}
              width={"205px"}
              name="online"
            />
            <Btn
              textBtn={"Thursday"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              onChange={online}
              width={"205px"}
              name="inperson"
            />
            <Btn
              textBtn={"Friday"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              onChange={person}
              width={"205px"}
              name="online"
            />
            <Btn
              textBtn={"Saturday"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"Bold"}
              textColor={"white"}
              height={"45px"}
              onChange={person}
              width={"205px"}
              name="online"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewGroup;
