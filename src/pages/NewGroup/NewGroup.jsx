import { useState } from "react";
import "./NewGroup.scss";
import Btn from "../../components/smallComponents/Btn/Btn";
import create from "../../assets/icons/create.svg";
import supabase from "../../config/supabaseClient";

function NewGroup() {
  //state for group name
  const [newGroup, setNewGroup] = useState({});
  const [toggleOnline, setToggleOnline] = useState(false);
  const [togglePerson, setTogglePerson] = useState(false);
  const [selected, setSelected] = useState({});

  function onSelect(e) {
    let name = e.target.name;
    setSelected((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
    setNewGroup((prevState) => {
      // Ensure dates is an array before proceeding
      const currentDates = Array.isArray(prevState.dates)
        ? prevState.dates
        : [];

      let updatedDates;
      // Add the date if it doesn't exist
      if (currentDates.some((date) => date === name)) {
        // Remove the date if it already exists
        updatedDates = currentDates.filter((date) => date !== name);
      } else {
        // Add the date if it doesn't exist
        updatedDates = [...currentDates, name];
      }

      return {
        ...prevState,
        dates: updatedDates,
      };
    });

    console.log(e.target.name);
  }

  //location street, city, country
  function location(e) {
    const { name, value } = e.target;
    setNewGroup((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  }

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

  //set the description
  function description(e) {
    let description = e.target.value;
    setNewGroup((prevState) => ({
      ...prevState,
      description: description,
    }));
  }
  const buttonNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  async function handleSubmit(event) {
    event.preventDefault();

    if (!newGroup.groupName || !newGroup.description) {
      console.log("Group name and description cannot be empty.");
    }

    const { data, error } = await supabase
      .from('group')
      .insert([
        { name: newGroup.groupName, description: newGroup.description },
      ])
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log("New Group was successfully added.")
    }
  }

  console.log(newGroup);
  return (
    <section className="newGroup">
      <h1>
        {newGroup.groupName && newGroup.groupName ? (
          <img src={create} alt="create group" />
        ) : null}
        {newGroup.groupName && newGroup.groupName
          ? ` ${newGroup.groupName}`
          : "Create New Group"}
      </h1>
      <div className="newGroup__col-1">
        <div className="newGroup__input">
          <label>What is this exciting new group called?</label>
          <input
            className="newGroup__input--tall"
            type="text"
            name="groupName"
            onChange={groupNaming}
          ></input>
        </div>
        <div className="newGroup__input">
          <label>How can people attend {newGroup.groupName}?</label>
          <div className="newGroup__check">
            <Btn
              textBtn={"In-person?"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"500"}
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
              fontWeight={"500"}
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
          <div className="newGroup__dates">
            {buttonNames &&
              buttonNames.map((btn, index) => (
                <>
                  <Btn
                    key={index}
                    textBtn={btn}
                    bgColor={`${selected[btn] ? "#6c3ed64f" : "#D9D9D9"}`}
                    fontSize={"16px"}
                    fontWeight={"500"}
                    textColor={selected[btn] ? "#FFF" : "#000"}
                    height={"25px"}
                    onClick={onSelect}
                    width={"205px"}
                    name={btn}
                    padding={"2px 8px"}
                  />
                </>
              ))}
          </div>
        </div>
        <div className="newGroup__input">
          <label>Where do people meet-up?</label>
          <div className="newGroup__location">
            <input
              type="text"
              name="address"
              placeholder={"Street Address"}
              onChange={location}
            ></input>
            <input
              type="text"
              name="city"
              placeholder={"City"}
              onChange={location}
            ></input>
            <input
              type="text"
              name="country"
              placeholder={"Country"}
              onChange={location}
            ></input>
          </div>
        </div>
        <div className="newGroup__input">
          <label>Describe your event, tells others what to expect. </label>
          <div className="newGroup__text">
            <textarea
              type="text"
              name="descript"
              placeholder={"This activity will be enjoyable..."}
              onChange={description}
            ></textarea>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>Create Group</button>
    </section>
  );
}

export default NewGroup;
