import "./NewPost.scss";
import { useDropzone } from "react-dropzone";
import { useState, useEffect, useCallback } from "react";
import supabase from "../../config/supabaseClient";
import { getUserId } from "../../userUtils";
import { v4 as uuidv4 } from "uuid";
// import SelectInput from "../../components/smallComponents/SelectInput/SelectInput";
import Btn from "../../components/smallComponents/Btn/Btn";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [userId, setUserId] = useState();
  const [postId, setPostId] = useState(
    Math.floor(Math.random() * (10 ** 8 - 10 ** 7)) + 10 ** 7
  );
  const [groupName, setGroupName] = useState("");
  const [files, setFiles] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  // const [groups, setGroups] = useState({});
  const [supaUserId, setSupaUserId] = useState("");
  const [imagePreview, setImagePreview] = useState();

  let navigate = useNavigate();
  const CDNURL =
    "https://manuqmuduusjcgdzuyqt.supabase.co/storage/v1/object/public/";

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setFiles(file);
      return file;
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
    } catch (error) {
      console.log("Error for obtaining SupabaseUserID" + error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserId();
      setUserId(user);
    };
    fetchUser();
    getSupaUserID();
  }, []);

  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     const { data, error } = await supabase.from("group").select("id, name");
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       const map = {};
  //       data.forEach((group) => {
  //         map[group.id] = group.name;
  //       });
  //       setGroups(map);
  //     }
  //   };

  //   fetchGroups();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName || !postTitle) {
      return notCreate();
    }

    let imageURL = null;

    if (files) {
      // supabase storage uses authenticated user id instead of our internal id
      const auth_user_id = await getSupaUserID();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("eventImages")
        .upload(auth_user_id + "/" + uuidv4(), files);

      if (uploadError) {
        console.log("Unable to upload image file.");
      }

      if (uploadData) {
        imageURL = CDNURL + uploadData.fullPath;
      }
    }
    // Create a new post in Supabase
    const { postData, error } = await supabase.from("post").insert([
      {
        id: postId,
        created_by: userId,
        group_name: groupName,
        image: imageURL,
        title: postTitle,
        body: postDescription,
      },
    ]);

    if (error) {
      console.error("Error creating post:", error);
    } else {
      console.log("Post created successfully:", postData);
      // Reset form fields
      setGroupName("");
      setFiles(null);
      setPostTitle("");
      setPostDescription("");
      setPostId(Math.floor(Math.random() * (10 ** 8 - 10 ** 7)) + 10 ** 7);
      eventCreate();
      setTimeout(() => navigate(`/explore`), 500);
    }
  };

  // const uploadFiles = async (files) => {
  //   const uploads = [];

  //   for (let file of files) {
  //     const { data, error } = await supabase.storage
  //       .from("postImages")
  //       .upload(supaUserId + "/" + uuidv4(), file);

  //     if (error) {
  //       console.error("Error uploading file:", error);
  //     } else {
  //       uploads.push(data);
  //     }
  //   }

  //   return uploads;
  // };

  // const handleFileChange = (event) => {
  //   setFiles([...event.target.files]);
  // };

  // const handleUpload = async () => {
  //   const uploadedFiles = await uploadFiles(files);
  //   console.log("Uploaded files:", uploadedFiles);
  // };

  //if I use idName, I am using the name within the Input not the label
  // function onChange(name, value, idName, setDataFunction, parsedItems) {
  //   if (name !== undefined && value !== undefined) {
  //     // Check if the value is being erased by the user
  //     const newValue = value === "" ? "" : value;

  //     setDataFunction((prevState) => ({
  //       ...prevState,
  //       [idName]: newValue,
  //     }));
  //   } else {
  //     // Otherwise, it's called to set the form data from local storage
  //     setDataFunction(parsedItems);
  //   }
  // }
  const eventCreate = () => toast.success("Event is Created");
  const notCreate = () =>
    toast.warn("Event name AND description are Required!");

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>Group Name</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input-container">
            {/* <SelectInput
              dropDownInfo={Object.keys(groups).map((key) => ({
                id: key,
                name: groups[key],
              }))}
              labelName={"What group is this event under?"}
              name="groupList"
              onChangeFunction={(name, value) =>
                onChange(name, value, "groupList", setGroupName)
              }
            /> */}
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              name="groupName"
              placeholder="Hiking for All"
              value={groupName}
              required
              onChange={(e) => setGroupName(e.target.value)}
            />
            {/* <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload Files</button> */}

            <div className="newEvent__image-wrapper" {...getRootProps()}>
              <input {...getInputProps()} />
              <Btn textBtn={"Upload Image"} />
              {imagePreview && imagePreview !== undefined ? (
                <img
                  className="newEvent__imageUpload"
                  alt={`${postTitle} image`}
                  src={imagePreview}
                />
              ) : null}
            </div>
          </div>
          <div className="form__input-container">
            <label htmlFor="postTitle">Title</label>
            <input
              type="text"
              name="postTitle"
              required
              placeholder="Made so many new friends!"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor="postDescription">Description</label>
            <textarea
              className="input--large"
              rows="4"
              cols="50"
              type="text"
              name="postDescription"
              placeholder="I had such a blast attending this event..."
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default NewPost;
