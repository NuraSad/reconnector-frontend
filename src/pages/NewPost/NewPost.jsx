import './NewPost.scss';

import { useState, useEffect } from 'react';
import supabase from "../../config/supabaseClient";
import {getUserId} from '../../userUtils'
import { v4 as uuidv4 } from 'uuid';

function NewPost() {
    

    useEffect(() => {
        const getSupaUserID = async () => {
            try {
              const { data: { user } } = await supabase.auth.getUser()
              if (user !== null) {
                setSupaUserId(user.id);
              } else {
                setSupaUserId('');
              }
            } catch (error) {}
          }

        const fetchUser = async () => {
            const user = await getUserId();
            setUserId(user);
        };
        fetchUser();
        getSupaUserID();
    }, []);

    const [userId, setUserId] = useState(); 
    const [postId, setPostId] = useState(Math.floor(Math.random()*(10**8-10**7))+10**7);
    const [groupName, setGroupName] = useState('');
    const [files, setFiles] = useState();
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');

    const [message, setMessage] = useState('');

    const [supaUserId, setSupaUserId] = useState('');


    const uploadFiles = async (files) => {
      const uploads = [];
    
      for (let file of files) {
        const { data, error } = await supabase
          .storage
          .from('postImages')
          .upload(supaUserId + '/' + uuidv4(), file);
    
        if (error) {
          console.error('Error uploading file:', error);
        } else {
          uploads.push(data);
        }
      }
    
      return uploads;
    };

    const handleFileChange = (event) => {
      setFiles([...event.target.files]);
    };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(`Uploading...`);
        const uploadedFile = await uploadFiles(files)
        // Create a new post in Supabase
        const { postData, error } = await supabase.from('post').insert([
            {
                id: postId,
                created_by: userId,
                group_name: groupName,
                image: uploadedFile[0].fullPath,
                title: postTitle,
                body: postDescription
            }
        ]);

        if (error) {
            console.error('Error creating post:', error);
            setMessage(`There was an error creating the post: ${error.message}`);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } else {
            setMessage(`Post ${postTitle} created successfully!`);
            setTimeout(() => {
                setMessage('');
            }, 3000);
            setGroupName('');
            setFiles(null);
            setPostTitle('');
            setPostDescription('');
            setPostId(Math.floor(Math.random()*(10**8-10**7))+10**7);
            document.getElementById('file-upload').value = '';
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <h1>New Post</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__input-container">
                        <label htmlFor="groupName">Group Name</label>
                        <input
                            type="text"
                            name="groupName"
                            placeholder="#ski_hooligans"
                            value={groupName}
                            required
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            id='file-upload'
                        />
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
                <p>{message}</p>
            </div>
        </div>
    );
}

export default NewPost;