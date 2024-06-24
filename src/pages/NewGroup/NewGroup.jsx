import { useState, useCallback } from "react";
import create from "../../assets/icons/create.svg";
import Btn from "../../components/smallComponents/Btn/Btn";
import supabase from "../../config/supabaseClient";
import "./NewGroup.scss";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewGroup() {
  //state for group name
  const [newGroup, setNewGroup] = useState({});
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
      //I have set file information in here, which is going to Supabase?
      setImageName(file);
      return file;
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const notify = () => toast("Group is Completed");

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
      return alert("Group name and description cannot be empty.");
    }

    // add group
    const { data: group_data, error: group_error } = await supabase
      .from("group")
      .insert([
        {
          name: newGroup.groupName,
          description: newGroup.description,
          image: imageName,
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
          notify();
        }
      }
    }
  }

  // console.log(newGroup);
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
            <img className="newGroup__imageUpload" alt="" src={image} />
          </div>
        </div>
        <div className="newGroup__input">
          <ToastContainer />
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
    </section>
  );
}

export default NewGroup;
