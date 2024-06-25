import { useState, useCallback, useEffect } from "react";
import "./UpdateProfilePopup.scss";
import Btn from "../../smallComponents/Btn/Btn";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";

const CDNURL =
  "https://manuqmuduusjcgdzuyqt.supabase.co/storage/v1/object/public/";

export default function UpdateProfilePopup({userInit, onClose}) {
  const [user, setUser] = useState(userInit)
  const [fetchError, setFetchError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [imagePreview, setImagePreview] = useState(user.avatar ?? null);
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

  function onInputChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const profileUpdate = () => toast.success("Profile Updated!");
  const notUpdated = () =>
    toast.warn("Location AND company are required!");

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from("company").select();
      if (error) {
        console.log(error);
        setFetchError("Could not Fetch the Companies");
      } else {
        setFetchError(null);
        setCompanies(data);
      }
    };

    fetchCompanies();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user.location || !user.company_id ) {
      return notUpdated();
    }
    let imageURL = null;

    if (imageFile) {
      // supabase storage uses authenticated user id instead of our internal id
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("userAvatar")
        .upload(user.auth_user_id + "/" + uuidv4(), imageFile);

      if (uploadError) {
        console.log("Unable to upload image file.");
      }

      if (uploadData) {
        imageURL = CDNURL + uploadData.fullPath;
      }
    }
    // add event
    const { data: user_data, error: user_error } = await supabase
      .from("user")
      .update([
        {
          first_name: user.first_name,
          last_name: user.last_name,
          company_id: user.company_id,
          email: user.email,
          location: user.location,
          preferred_radius: user.preferred_radius,
          avatar: imageURL,
        },
      ])
      .eq('id', user.id)
      .select()
    
    if (user_error) {
      console.log(user_error);
    }

    if (user_data) {
      const newUserData = user_data[0];
    //   console.log("User was successfully updated.");
      profileUpdate()
      onClose()
      setUser(newUserData)
    }
  }
//
  return (
    <section className="profile-popup">
        <h1>
            Profile Info
        </h1>
        <button className="close-btn" onClick={onClose}>X</button>
        <label htmlFor="first_name"> First Name:
            <input className="input name" type='text' name='first_name' value={user.first_name ?? ''} onChange={(e) => onInputChange(e)} minLength='2'/>
        </label>
        <label htmlFor="last_name"> Last Name:
            <input className="input name" type='text' name='last_name' value={user.last_name ?? ''} onChange={(e) => onInputChange(e)} minLength='2'/>
        </label>
        <label htmlFor="email">Email:
            <input className="input name" type='email' name='email' value={user.email ?? ''} onChange={(e) => onInputChange(e)} minLength='2' required/>
        </label>
        <label htmlFor="company_id">Choose your company:
            <select value={user.company_id ?? ''} name="company_id" onChange={(e) => onInputChange(e)} required>
                { companies && companies.map((company, i) => (
                    <option key={i} value={company.id}>{company.name}</option>
                ))}
            </select>
        </label>
        <label htmlFor="location">Enter your city:
            <input className="input name" type='text' name='location' value={user.location ?? ''} onChange={(e) => onInputChange(e)} minLength='2' required/>
        </label>
        <label htmlFor="preferred_radius">Preferred radius:
            <input name="preferred_radius" type="number" value={user.preferred_radius ?? 5} onChange={(e) => onInputChange(e)} min="5"/>
        </label>
        <div className="image-wrapper" {...getRootProps()}>
            <input {...getInputProps()} />
            <Btn textBtn={"Click here to upload image"} />
            <img
            alt={`${user.first_name}'s avatar`}
            src={imagePreview}
            />
        </div>
        <button className="btn submit" onClick={handleSubmit}>Update profile</button>
       <ToastContainer position="top-center" />
    </section>
  );
}