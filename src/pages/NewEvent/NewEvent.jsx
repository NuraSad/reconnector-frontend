import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import create from "../../assets/icons/create.svg";
import Btn from "../../components/smallComponents/Btn/Btn";
import DateInput from "../../components/smallComponents/DateInput/DateInput";
import SelectInput from "../../components/smallComponents/SelectInput/SelectInput";
import supabase from "../../config/supabaseClient";
import { getAuthUserId } from "../../userUtils.js";
import "./NewEvent.scss";

const CDNURL =
  "https://manuqmuduusjcgdzuyqt.supabase.co/storage/v1/object/public/";

export default function NewEvent() {
  const [newEvent, setNewEvent] = useState({});
  const [toggleOnline, setToggleOnline] = useState(false);
  const [togglePerson, setTogglePerson] = useState(false);
  const [groups, setGroups] = useState({});
  const [imagePreview, setImagePreview] = useState();
  const [imageFile, setImageFile] = useState();

  // let navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      return file;
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const eventCreate = () => toast.success("Event is Created");
  const notCreate = () =>
    toast.warn("Event name AND description are Required!");

  //location street, city, country
  function addressOnchange(e) {
    let address = e.target.value;
    setNewEvent((prevState) => ({
      ...prevState,
      address: address,
    }));
  }

  function cityOnchange(e) {
    let city = e.target.value;
    setNewEvent((prevState) => ({
      ...prevState,
      city: city,
    }));
  }

  function countryOnchange(e) {
    let country = e.target.value;
    setNewEvent((prevState) => ({
      ...prevState,
      country: country,
    }));
  }

  //set the event name in the newEvent object
  function eventNaming(e) {
    let eventName = e.target.value;
    setNewEvent((prevState) => ({
      ...prevState,
      eventName: eventName,
    }));
  }

  //set the event name in the newEvent object
  function dateOnchange(name, date) {
    setNewEvent((prevState) => ({
      ...prevState,
      date: date,
    }));
  }

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase.from("group").select("id, name");
      if (error) {
        console.log(error);
      } else {
        const map = {};
        data.forEach((group) => {
          map[group.id] = group.name;
        });
        setGroups(map);
      }
    };

    fetchGroups();
  }, []);

  //set the online
  function onlineOnchange() {
    setToggleOnline((prevState) => {
      const newToggleOnline = !prevState;
      setNewEvent((prevState) => ({
        ...prevState,
        online: newToggleOnline,
      }));
      return newToggleOnline;
    });
  }

  //set the person
  function personOnchange() {
    setTogglePerson((prevState) => {
      const newTogglePerson = !prevState;
      setNewEvent((prevState) => ({
        ...prevState,
        inperson: newTogglePerson,
      }));
      return newTogglePerson;
    });
  }

  //set the description
  function description(e) {
    let description = e.target.value;
    setNewEvent((prevState) => ({
      ...prevState,
      description: description,
    }));
  }

  //if I use idName, I am using the name within the Input not the label
  function onChange(name, value, idName, setDataFunction, parsedItems) {
    if (name !== undefined && value !== undefined) {
      // Check if the value is being erased by the user
      const newValue = value === "" ? "" : value;

      setDataFunction((prevState) => ({
        ...prevState,
        [idName]: newValue,
      }));
    } else {
      // Otherwise, it's called to set the form data from local storage
      setDataFunction(parsedItems);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!newEvent.eventName || !newEvent.description || !newEvent.groupList) {
      return notCreate();
    }

    let imageURL = null;

    if (imageFile) {
      // supabase storage uses authenticated user id instead of our internal id
      const auth_user_id = await getAuthUserId();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("eventImages")
        .upload(auth_user_id + "/" + uuidv4(), imageFile);

      if (uploadError) {
        console.log("Unable to upload image file.");
      }

      if (uploadData) {
        imageURL = CDNURL + uploadData.fullPath;
      }
    }
    // add event
    const { data: event_data, error: event_error } = await supabase
      .from("event")
      .insert([
        {
          title: newEvent.eventName,
          description: newEvent.description,
          event_image: imageURL,
          created_by_group_id: newEvent.groupList,
          online: newEvent.online ? true : false,
          in_person: newEvent.inperson ? true : false,
          location:
            (newEvent.address ? newEvent.address + "," : "") +
            (newEvent.city ? newEvent.city + "," : "") +
            (newEvent.country ? newEvent.country : ""),
          event_date: newEvent.eventDate,
        },
      ])
      .select();

    if (event_error) {
      console.log(event_error);
    }

    if (event_data) {
      const eventID = event_data[0].id;
      console.log("New Event was successfully added.");
      eventCreate();
      //I want this to navigate to the eventID
      //setTimeout(() => navigate(`/events/${eventID}`), 1000);
      //redirect to event page of that id
    }
  }
  console.log(newEvent);
  return (
    <section className="newEvent">
      <h1>
        {newEvent.eventName && newEvent.eventName ? (
          <img src={create} alt="create event" />
        ) : null}
        {newEvent.eventName && newEvent.eventName
          ? ` ${newEvent.eventName}`
          : "Create New Event"}
      </h1>
      <div className="newEvent__col-1">
        <div className="newEvent__input">
          <label></label>
          <SelectInput
            dropDownInfo={Object.keys(groups).map((key) => ({
              id: key,
              name: groups[key],
            }))}
            labelName={"What group is this event under?"}
            name="groupList"
            onChangeFunction={(name, value) =>
              onChange(name, value, "groupList", setNewEvent)
            }
          />
        </div>
        <div className="newEvent__input">
          <label>What is the event name?</label>
          <input
            className="newEvent__input--tall"
            type="text"
            name="eventName"
            onChange={eventNaming}
          ></input>
        </div>
        <div className="newEvent__input">
          <label>How can people attend {newEvent.eventName}?</label>
          <div className="newEvent__check">
            <Btn
              textBtn={"In-person?"}
              bgColor={"#6c3ed64f"}
              fontSize={"16px"}
              fontWeight={"500"}
              textColor={"white"}
              height={"45px"}
              inputType="checkbox"
              checked={togglePerson}
              onChange={personOnchange}
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
              checked={toggleOnline}
              onChange={onlineOnchange}
              width={"205px"}
              name="online"
            />
          </div>
        </div>

        {/*make this into a date selector */}
        <div className="newEvent__input">
          <div className="newEvent__dates">
            <DateInput
              labelName={"Select Date"}
              onChangeFunction={dateOnchange}
              name="eventDate"
            />
          </div>
        </div>
        <div className="newEvent__input">
          <label>Enter in the starting time.</label>
          <input
            className="newEvent__input--tall"
            type="text"
            name="eventStart"
            // onChange={eventStart}
          ></input>
        </div>
        <div className="newEvent__input">
          <label>Enter in the ending time.</label>
          <input
            className="newEvent__input--tall"
            type="text"
            name="eventEnd"
            // onChange={eventEnd}
          ></input>
        </div>

        {newEvent.inperson && newEvent.inperson ? (
          <div className="newEvent__input">
            <label>Where do people meet-up?</label>
            <div className="newEvent__location">
              <input
                type="text"
                name="address"
                placeholder={"Street Address"}
                onChange={addressOnchange}
              ></input>
              <input
                type="text"
                name="city"
                placeholder={"City"}
                onChange={cityOnchange}
              ></input>
              <input
                type="text"
                name="country"
                placeholder={"Country"}
                onChange={countryOnchange}
              ></input>
            </div>
          </div>
        ) : null}

        <div className="newEvent__input">
          <div className="newEvent__image-wrapper" {...getRootProps()}>
            <input {...getInputProps()} />
            <Btn textBtn={"Click here to upload image"} />
            {newEvent.imagePreview && newEvent.imagePreview !== undefined ? (
              <img
                className="newEvent__imageUpload"
                alt={`${newEvent.eventName} image`}
                src={imagePreview}
              />
            ) : null}
          </div>
        </div>
        <div className="newEvent__input">
          <label>Describe your event, tells others what to expect. </label>
          <div className="newEvent__text">
            <textarea
              type="text"
              name="descript"
              placeholder={"This activity will be enjoyable..."}
              onChange={description}
            ></textarea>
          </div>
        </div>
      </div>
      <Btn
        bgColor={"#6c3ed64f"}
        fontSize={"16px"}
        fontWeight={"500"}
        textColor={"white"}
        textBtn={"Create event"}
        onClick={handleSubmit}
        height={"45px"}
        marginTop={"2rem"}
      />
      <ToastContainer position="top-center" />
    </section>
  );
}
