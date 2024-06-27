import "./NewPost.scss";
import { useDropzone } from "react-dropzone";
import { useState, useEffect, useCallback } from "react";
import supabase from "../../config/supabaseClient";
import { getUserId, getAuthUserId } from "../../userUtils";
import { v4 as uuidv4 } from "uuid";
// import SelectInput from "../../components/smallComponents/SelectInput/SelectInput";
import Btn from "../../components/smallComponents/Btn/Btn";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [userId, setUserId] = useState();
  const [groupName, setGroupName] = useState("");
  const [files, setFiles] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [groups, setGroups] = useState([]);
  const [supaUserId, setSupaUserId] = useState("");
  const [imagePreview, setImagePreview] = useState('');

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
  const eventCreate = () => toast.success("Post is Created");
  const notCreate = () =>
    toast.warn("Group name and title are Required!");


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
          map.push({name: group.name});
        });
        setGroups(map)
      }
    };
    
    const fetchAuthId = async () => {
      const auth_user_id = await getAuthUserId();
      setSupaUserId(auth_user_id)
    }

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
    } else {
      console.log("Post created successfully:", postData);
      // Reset form fields
      eventCreate();
      setTimeout(() => navigate(`/explore`), 500);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>Group Name</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input-container">
            <label htmlFor="groupName">Group Name</label>
            <select value={groupName} name="groupName" onChange={(e) => setGroupName(e.target.value)} required>
                { groups.length && groups.map((group, i) => (
                    <option key={i} value={group.name}>{group.name}</option>
                ))}
            </select>

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
