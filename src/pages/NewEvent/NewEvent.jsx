import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { getAuthUserId, getUserId } from "../../userUtils.js";
import "react-toastify/dist/ReactToastify.css";
import create from "../../assets/icons/create.svg";
import Btn from "../../components/smallComponents/Btn/Btn";
import SelectInput from "../../components/smallComponents/SelectInput/SelectInput";
import supabase from "../../config/supabaseClient";
import "./NewEvent.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";

export default function NewEvent() {
  const [newEvent, setNewEvent] = useState({});
  const [toggleOnline, setToggleOnline] = useState(false);
  const [togglePerson, setTogglePerson] = useState(false);
  const [groups, setGroups] = useState({});
  const [value, setValue] = useState(dayjs(new Date()));
  const [supaUserId, setSupaUserId] = useState("");
  const [userId, setUserId] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [imageFile, setImageFile] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const CDNURL =
    "https://manuqmuduusjcgdzuyqt.supabase.co/storage/v1/object/public/";
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
  let navigate = useNavigate();

  //fill image is one is not given
  const defaultImage =
    "https://manuqmuduusjcgdzuyqt.supabase.co/storage/v1/object/public/eventImages/b7bfba08-3b2d-4a0d-bf07-82cb49dc2142/priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg?t=2024-06-28T02%3A03%3A27.752Z";

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const eventCreate = () => toast.success("Event is Created");
  const notCreate = () =>
    toast.warn("Event name, description, and complete address are Required!");

  //location street, city, country
  function addressOnchange(e) {
    let address = e.target.value;
    setNewEvent((prevState) => ({
      ...prevState,
      address: address,
    }));
  }

  // const address = newEvent.location;
  // const encodedAddress = encodeURIComponent(address);
  // const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${VITE_GOOGLE_API_KEY}`;
  // console.log(geocodeUrl);

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

  // / function to get the data from the API
  // let getLatLong = async (location) => {
  //   //function on load
  //   let response = await axios(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${location.address},${location.city},${location.country}&key=${VITE_GOOGLEKEY}`
  //   );
  //   console.log(response);
  //   //return response;
  // };
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
  //set the event name in the newEvent object
  function eventNaming(e) {
    let eventName = e.target.value;
    setNewEvent((prevState) => ({
      ...prevState,
      eventName: eventName,
    }));
  }

  useEffect(() => {
    const getSupaUserID = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user !== null) {
          setSupaUserId(user.id);
        } else {
          setSupaUserId("");
        }
      } catch (error) {}
    };

    const fetchUser = async () => {
      const user = await getUserId();
      setUserId(user);
    };
    fetchUser();
    getSupaUserID();
  }, []);

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

  const getGeoCode = async () => {
    // Replace spaces with plus signs
    const newAddress = newEvent.address.replace(/ /g, "+");
    const newCity = newEvent.city.replace(/ /g, "+");
    const newCountry = newEvent.country.replace(/ /g, "+");

    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress},+${newCity},+${newCountry}&key=${VITE_GOOGLE_API_KEY}`
      );

      if (data.results.length > 0) {
        const fetchedLat = data.results[0].geometry.location.lat;
        const fetchedLng = data.results[0].geometry.location.lng;
        setLat(fetchedLat);
        setLng(fetchedLng);
        return { lat: fetchedLat, lng: fetchedLng };
      } else {
        alert("No results found for the provided address.");
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      alert("Error fetching geocode data.");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !newEvent.eventName ||
      !newEvent.description ||
      !newEvent.address ||
      !newEvent.city ||
      !newEvent.country
    ) {
      return notCreate();
    }

    const { lat, lng } = await getGeoCode();

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
    if (!imageFile) {
      setImageFile(defaultImage);
    }

    // add event
    // get internal user id
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: event_data, error: event_error } = await supabase
      .from("event")
      .insert([
        {
          title: newEvent.eventName,
          description: newEvent.description,
          created_by_group_id: newEvent.groupList,
          event_image: imageURL,
          created_by_user_id: userId,
          online: newEvent.online ? true : false,
          in_person: newEvent.inperson ? true : false,
          location:
            (newEvent.address ? newEvent.address + "," : "") +
            (newEvent.city ? newEvent.city + "," : "") +
            (newEvent.country ? newEvent.country : ""),
          event_date: value,
          lat: lat,
          long: lng,
        },
      ])
      .select();

    if (event_error) {
      console.log(event_error);
    }

    if (event_data) {
      const eventID = event_data[0].id;
      eventCreate();
      setTimeout(() => navigate(`/groups/${newEvent.groupList}`), 500);
      //redirect to group page of that id

      let { data: user_data, user_error } = await supabase
        .from("user")
        .select("*");

      if (user_error) {
        console.log("Could not retrieve logged in user id " + user_error);
      }

      if (user_data) {
        const userID = user_data;
        console.log(userID);
        // add user to event admin
        const { data: event_admin_data, error: event_admin_error } =
          await supabase
            .from("event_admin")
            .insert([{ event_id: eventID, user_id: userID.id }])
            .select();

        if (event_admin_data) {
          console.log(
            "Failed to add user to event admin table " + event_admin_error
          );
        } else {
          console.log("User was successfully added to event admin table.");
        }

        if (event_admin_data) {
          console.log("User was successfully added to event admin table.");
        }

        // add user to event members
        const { data: event_members_data, error: event_members_error } =
          await supabase
            .from("event_participants")
            .insert([{ event_id: eventID, user_id: userID.id }])
            .select();

        if (event_members_error) {
          console.log(
            "Failed to add user to event member table " + event_members_error
          );
        } else {
          console.log("User was successfully added to event members table.");
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
            required
          ></input>
        </div>
        <div className="newEvent__input">
          <label>How can people attend {newEvent.eventName}?</label>
          <div className="newEvent__check">
            {/* make something so one of these is required */}
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

        <br />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DateTimePicker
              label="Date of Event and Start Time"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              required
            />
          </DemoContainer>
        </LocalizationProvider>
        <br />

        {newEvent.inperson && newEvent.inperson ? (
          <div className="newEvent__input">
            <label>Where do people meet-up?</label>
            <div className="newEvent__location">
              <input
                type="text"
                name="address"
                placeholder={"Street Address"}
                onChange={addressOnchange}
                required
              ></input>
              <input
                type="text"
                name="city"
                placeholder={"City"}
                onChange={cityOnchange}
                required
              ></input>
              <input
                type="text"
                name="country"
                placeholder={"Country"}
                onChange={countryOnchange}
                required
              ></input>
            </div>
          </div>
        ) : null}
        <div className="newEvent__input">
          <div className="newEvent__image-wrapper" {...getRootProps()}>
            <input {...getInputProps()} />
            <Btn textBtn={"Click here to upload image"} />
            {imagePreview === undefined ? null : (
              <img
                className="newEvent__imageUpload"
                alt={`${newEvent.eventName} image`}
                src={imagePreview}
              />
            )}
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
              required
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
