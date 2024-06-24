import { useState } from "react";
import create from "../../assets/icons/create.svg";
import Btn from "../../components/smallComponents/Btn/Btn";
import supabase from "../../config/supabaseClient";
import "./NewGroup.scss";
import { v4 as uuidv4 } from "uuid";
import ImageUploading from "react-images-uploading";

function NewGroup() {
  //state for group name
  const [newGroup, setNewGroup] = useState({});
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
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
      .insert([{ name: newGroup.groupName, description: newGroup.description }])
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
        }
      }
    }
  }

  async function uploadImage(e) {
    let file = e.target.files[0];
    console.log(file);
    //the user can only upload to their folder
    // add group
    const { data: group_data, error: group_error } = await supabase
      .from("group")
      .insert([{ image: newGroup.image }])
      .select();

    if (group_error) {
      console.log(group_error);
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
          <label>Upload an image for {newGroup.groupName}?</label>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              // onImageUpdate,
              // onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt="" width="100%" />
                    {/* <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div> */}
                  </div>
                ))}
                <div className="newGroup__imageUpload">
                  <Btn
                    textBtn={"Click or Drop to Upload Image"}
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  />
                  <Btn textBtn={"Remove Image"} onClick={onImageRemoveAll} />
                </div>
              </div>
            )}
          </ImageUploading>
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
