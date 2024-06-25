import { useState, useCallback, useEffect } from "react";
import "./NewEvent.scss";
import Btn from "../../components/smallComponents/Btn/Btn";
import create from "../../assets/icons/create.svg";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../config/supabaseClient";
import SelectInput from "../../components/smallComponents/SelectInput/SelectInput";
import DateInput from "../../components/smallComponents/DateInput/DateInput";
import { useLocation } from "react-router-dom";
import { getAuthUserId } from "../../userUtils.js";
import { v4 as uuidv4 } from "uuid";

const CDNURL =
  "https://manuqmuduusjcgdzuyqt.supabase.co/storage/v1/object/public/";

export default function NewEvent(id) {
  const location = useLocation();
  //here is the groupId for the group coming in, put the name into the first select intpu
  // const startGroup = location.state.groupId;
  //state for event name
  const [newEvent, setnewEvent] = useState({});
  const [toggleOnline, setToggleOnline] = useState(false);
  const [togglePerson, setTogglePerson] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [thisGroup, setThisGroup] = useState();
  const [groups, setGroups] = useState(null);
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
  function physicalLocation(e) {
    const { name, value } = e.target;
    setnewEvent((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  }

  //set the event name in the newEvent object
  function eventNaming(e) {
    let eventName = e.target.value;
    setnewEvent((prevState) => ({
      ...prevState,
      eventName: eventName,
    }));
  }

  //set the event name in the newEvent object
  function date(e) {
    let dateStart = e.target.value;
    setnewEvent((prevState) => ({
      ...prevState,
      startDate: dateStart,
    }));
  }

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase.from("group").select();
      if (error) {
        console.log(error);
        setFetchError("Could not Fetch the Group");
      } else {
        setFetchError(null);
        setGroups(data);
      }
    };

    fetchGroups();
  }, []);

  //set the online
  function online() {
    setToggleOnline(!toggleOnline);

    if (toggleOnline === true) {
      setnewEvent((prevState) => ({
        ...prevState,
        online: true,
      }));
    } else {
      setnewEvent((prevState) => ({
        ...prevState,
        online: false,
      }));
    }
  }

  //set the online
  function person() {
    setTogglePerson(!togglePerson);

    if (togglePerson === true) {
      setnewEvent((prevState) => ({
        ...prevState,
        inperson: true,
      }));
    } else {
      setnewEvent((prevState) => ({
        ...prevState,
        inperson: false,
      }));
    }
  }

  //set the description
  function description(e) {
    let description = e.target.value;
    setnewEvent((prevState) => ({
      ...prevState,
      description: description,
    }));
  }

  useEffect(() => {
    const fetchGroupId = async (startGroup) => {
      const { data, error } = await supabase
        .from("group")
        .select("*")
        .eq("id", startGroup)
        .single();

      if (error) {
        setFetchError("Could not Fetch the Company");
      }
      if (data) {
        setThisGroup(data);

        setFetchError(null);
      }
    };
    fetchGroupId(id);
  }, [id]);

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
        .from("groupImages")
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
          created_by_group: newEvent.groupList,
          online: newEvent.online,
        },
      ])
      .select();
    if (event_error) {
      console.log(event_error);
    }

    if (event_data) {
      const eventID = event_data[0].id;
      console.log("New Event was successfully added.");

      // get internal user id
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const auth_user_id = user.id;

      let { data: user_data, user_error } = await supabase
        .from("user")
        .select("id")
        .eq("auth_user_id", auth_user_id);

      if (user_error) {
        console.log("Could not retrieve logged in user id " + user_error);
      }

      if (user_data) {
        const userID = user_data[0].id;

        // add user to event admin
        const { data: event_admin_data, error: event_admin_error } =
          await supabase
            .from("event_admin")
            .insert([{ event_id: eventID, user_id: userID }])
            .select();

        if (event_admin_data) {
          console.log(
            "Failed to add user to event admin table " + event_admin_error
          );
        }

        if (event_admin_data) {
          console.log("User was successfully added to event admin table.");
        }

        // add user to event members
        const { data: event_members_data, error: event_members_error } =
          await supabase
            .from("event_members")
            .insert([{ event_id: eventID, user_id: userID }])
            .select();

        if (event_members_error) {
          console.log(
            "Failed to add user to event member table " + event_members_error
          );
        }

        if (event_members_data) {
          console.log("User was successfully added to event member table.");
          eventCreate();
          //I want this to navigate to the eventID
          //setTimeout(() => navigate(`/events/${eventID}`), 1000);
          //redirect to event page of that id
        }
      }
    }
  }
  console.log(groups);
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
            labelName={"What group is this event under?"}
            objArray={groups}
            name={"groupList"}
            onChangeFunction={(name, value) =>
              onChange(name, value, "groupList", setnewEvent)
            }
            value={thisGroup}
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

        {/*make this into a date selector */}
        <div className="newEvent__input">
          <div className="newEvent__dates">
            <DateInput
              labelName={"When do people show up?"}
              onChangeFunction={date}
              name={"date"}
            />
          </div>
        </div>

        <div className="newEvent__input">
          <label>Where do people meet-up?</label>
          <div className="newEvent__location">
            <input
              type="text"
              name="address"
              placeholder={"Street Address"}
              onChange={physicalLocation}
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
        <div className="newEvent__input">
          <div className="newEvent__image-wrapper" {...getRootProps()}>
            <input {...getInputProps()} />
            <Btn textBtn={"Click here to upload image"} />

            <img
              className="newEvent__imageUpload"
              alt={`${newEvent.eventName} image`}
              src={imagePreview}
            />
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
