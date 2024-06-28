import "./NewPost.scss";
import { useDropzone } from "react-dropzone";
import { useState, useEffect, useCallback } from "react";
import supabase from "../../config/supabaseClient";
import { getUserId, getAuthUserId } from "../../userUtils";
import { v4 as uuidv4 } from "uuid";
import SelectInput from "../../components/smallComponents/SelectInput/SelectInput";
import Btn from "../../components/smallComponents/Btn/Btn";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StravaEmbed from "../../components/smallComponents/StravaEmbed/StravaEmbed";

function NewPost() {
  const [userId, setUserId] = useState();
  const [embedCode, setEmbedCode] = useState("");

  const [postId, setPostId] = useState(
    Math.floor(Math.random() * (10 ** 8 - 10 ** 7)) + 10 ** 7
  );
  const [groupName, setGroupName] = useState("");
  // const [files, setFiles] = useState();
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  // const [groups, setGroups] = useState({});
  const [supaUserId, setSupaUserId] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [groups, setGroups] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [isValid, setIsValid] = useState(true);
  const [KM, setKM] = useState(0);
  const [actLength, setActLength] = useState(0);
  const [embed, setEmbed] = useState({
    embedType: "activity",
    embedId: 10597199340,
    style: "standard",
  });
  const [files, setFiles] = useState(null);

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

  const eventCreate = () => toast.success("Event is Created");
  const notCreate = () =>
    toast.warn("Event name AND description are Required!");
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const isValidEmbedCode = (code) => {
    // Basic validation for an iframe tag (you can extend this for other types of embeds)
    const iframePattern = /<iframe.*<\/iframe>/;
    return iframePattern.test(code);
  };

  const handleInputChange = (e) => {
    const code = e.target.value;
    if (isValidEmbedCode(code)) {
      setEmbedCode(code);
      //cut up the string and find the type, id and style all as a state of objects and send
      //that back to the component
      // setIsValid(true);
    } else {
      // setIsValid(false);
      console.log("no code in embed");
    }
  };

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

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await getUserId();
  //     setUserId(user);
  //   };
  //   const fetchGroups = async () => {
  //     const { data, error } = await supabase.from("group").select("id, name");
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       const map = [];
  //       data.forEach((group) => {
  //         map.push({ name: group.name });
  //       });
  //       setGroups(map);
  //     }
  //   };
  //   const fetchAuthId = async () => {
  //     const auth_user_id = await getAuthUserId();
  //     setSupaUserId(auth_user_id);
  //   };
  //   fetchUser();
  //   fetchAuthId();
  //   fetchGroups();
  //   getSupaUserID();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserId();
      setUserId(user);
    };
    const fetchGroups = async () => {
      const { data, error } = await supabase.from("group").select("id, name");
      if (error) {
        console.log(error);
      } else {
        const map = [];
        data.forEach((group) => {
          map.push({ name: group.name });
        });
        setGroups(map);
      }
    };
    const fetchAuthId = async () => {
      const auth_user_id = await getAuthUserId();
      setSupaUserId(auth_user_id);
    };

    fetchUser();
    fetchAuthId();
    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName || !postTitle) {
      return notCreate();
    }

    let imageURL = null;

    if (files) {
      // supabase storage uses authenticated user id instead of our internal id

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("postImages")
        .upload(supaUserId + "/" + uuidv4(), files);

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
        created_by: userId,
        group_name: groupName,
        images: imageURL,
        title: postTitle,
        body: postDescription,
      },
    ]);

    if (error) {
      console.error("Error creating post:", error);
    }
    if (postData) {
      setPostId(Math.floor(Math.random() * (10 ** 8 - 10 ** 7)) + 10 ** 7);
      eventCreate();
      setTimeout(() => navigate(`/explore`), 500);
      console.log("Post created successfully:", postData);
    }
  };
  console.log(groupName);
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>Create Post</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input-container">
            {/* <label htmlFor="groupName">Group Name</label> */}
            {/* <select
              className="selectInput__input"
              value={groupName}
              name="groupName"
              onChange={(e) => setGroupName(e.target.value)}
              required
            >
              {groups.length &&
                groups.map((group, i) => (
                  <option key={i} value={group.name}>
                    {group.name}
                  </option>
                ))}
            </select> */}
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              name="groupName"
              placeholder="Hiking for All"
              value={groupName}
              required
              onChange={(e) => setGroupName(e.target.value)}
            />
            <label htmlFor="groupName">Kilometers Completed</label>
            <input
              type="text"
              name="km"
              placeholder="km..."
              value={KM}
              required
              onChange={(e) => setKM(e.target.value)}
            />

            <label htmlFor="groupName">Length of Activity</label>
            <input
              type="text"
              name="activityLength"
              placeholder="how long did were you active..."
              value={actLength}
              required
              onChange={(e) => setActLength(e.target.value)}
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
            <div>
              <label className="embedLabel" htmlFor="embedInput">
                Paste Embed Code
              </label>
              <textarea
                className="input--large embedLabel"
                id="embedInput"
                value={embedCode}
                onChange={(e) => setEmbedCode(e.target.value)}
                placeholder="Paste your embed code here"
                rows="4"
                cols="50"
              />
              {!isValid && <p style={{ color: "red" }}>Invalid embed code</p>}
              <StravaEmbed
                embedType={embed.embedType}
                embedId={embed.embedId}
                style={embed.style}
              />
            </div>
            <button
              style={{ marginLeft: "auto", padding: "0 1rem" }}
              type="submit"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default NewPost;
