import './NewPost.scss';

import { useState, useEffect } from 'react';
import supabase from "../../config/supabaseClient";
import { useSession } from '../../sessionContext';

function NewPost() {

    const session = useSession();
    const auth_user_id = session.user.id;

    const getUser = async () => {
        const { data: user_data, user_error } = await supabase.from("user").select("id").eq("auth_user_id", auth_user_id);
        return parseInt(user_data[0].id);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUserId(user);
        };
        fetchUser();
    }, []);

    const [userId, setUserId] = useState(getUser()); 
    const [postId, setPostId] = useState(Math.floor(Math.random()*(10**8-10**7))+10**7);
    const [groupName, setGroupName] = useState('');
    const [images, setImages] = useState(null);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new post in Supabase
        const { postData, error } = await supabase.from('post').insert([
            {
                id: postId,
                created_by: userId,
                group_name: groupName,
                image: images,
                title: postTitle,
                body: postDescription
            }
        ]);

        if (error) {
            console.error('Error creating post:', error);
        } else {
            console.log('Post created successfully:', postData);
            // Reset form fields
            setGroupName('');
            setImages(null);
            setPostTitle('');
            setPostDescription('');
            setPostId(Math.floor(Math.random()*(10**8-10**7))+10**7);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
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
                            multiple
                            onChange={handleImageChange}
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
            </div>
        </div>
    );
}

export default NewPost;