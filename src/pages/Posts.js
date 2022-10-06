import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { selectAllPosts, getStatusPosts, getErrorPosts, fetchPosts } from "../redux/postsSlice";

const Posts = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getStatusPosts);
    const postsError = useSelector(getErrorPosts);

    useEffect(() => {
        if(postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    let postsEl = '';
    if(postsStatus === 'loading') {
        postsEl = <Loader />
    } else if(postsStatus === 'succeeded') {
        postsEl = posts.map(post => (
            <Post key={post.id} post={post} />
        ))
    } else if(postsStatus === 'rejected') {
        postsEl = postsError;
    }

    return (
        <div className="home">
            {
                postsEl
            }
        </div>
    )
}

export default Posts;