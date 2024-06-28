import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import create from "../../assets/icons/create.svg";
import Btn from "../../components/smallComponents/Btn/Btn";
import supabase from "../../config/supabaseClient";
import { getAuthUserId, getUserId } from "../../userUtils.js";
import "./NewGroup.scss";

const CDNURL =
  "https://manuqmuduusjcgdzuyqt.supabase.co/storage/v1/object/public/";

function NewGroup() {
  //state for group name
  const [newGroup, setNewGroup] = useState({});
  const [imagePreview, setImagePreview] = useState();
  const [imageFile, setImageFile] = useState();

  let navigate = useNavigate();

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

  const groupCreate = () => toast.success("Group is Created");
  const notCreate = () =>
    toast.warn("Group name AND description are Required!");

  //set the group name in the newgroup object
  function groupNaming(e) {
    let groupName = e.target.value;
    setNewGroup((prevState) => ({
      ...prevState,
      groupName: groupName,
    }));
  }

  //set the description
  function description(e) {
    let description = e.target.value;
    setNewGroup((prevState) => ({
      ...prevState,
      description: description,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!newGroup.groupName || !newGroup.description) {
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

    // add group
    const { data: group_data, error: group_error } = await supabase
      .from("group")
      .insert([
        {
          name: newGroup.groupName,
          description: newGroup.description,
          image: imageURL,
        },
      ])
      .select();

    if (group_error) {
      console.log(group_error);
    }

    if (group_data) {
      const groupID = group_data[0].id;
      console.log("New Group was successfully added.");

      // get internal user id
      const userID = await getUserId();

      if (userID) {
        // add user to group admin
        const { data: group_admin_data, error: group_admin_error } =
          await supabase
            .from("group_admin")
            .insert([{ group_id: groupID, user_id: userID }])
            .select();

        if (group_admin_error) {
          console.log(
            "Failed to add user to group admin table " + group_admin_error
          );
        }

        if (group_admin_data) {
          console.log("User was successfully added to group admin table.");
        }

        // add user to group members
        const { data: group_members_data, error: group_members_error } =
          await supabase
            .from("group_members")
            .insert([{ group_id: groupID, user_id: userID }])
            .select();

        if (group_members_error) {
          console.log(
            "Failed to add user to group member table " + group_members_error
          );
        }

        if (group_members_data) {
          console.log("User was successfully added to group member table.");
          groupCreate();
          //I want this to navigate to the groupID
          setTimeout(() => navigate(`/groups`), 1000);
          //redirect to group page of that id
        }
      }
    }
  }

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
          <div className="newGroup__image-wrapper" {...getRootProps()}>
            <input {...getInputProps()} />
            <Btn textBtn={"Click here to upload image"} />
            <img className="newGroup__imageUpload" alt="" src={imagePreview} />
          </div>
        </div>
        <div className="newGroup__input">
          <ToastContainer position="top-center" />
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
      <Btn
        bgColor={"#6c3ed64f"}
        fontSize={"16px"}
        fontWeight={"500"}
        textColor={"white"}
        textBtn={"Create Group"}
        onClick={handleSubmit}
        height={"45px"}
        marginTop={"2rem"}
      />
      <ToastContainer position="top-center" />
    </section>
  );
}

export default NewGroup;
