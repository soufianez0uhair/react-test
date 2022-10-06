const Post = ({post}) => {
    return (
        <div className="post">
            <h1 className="post__title">{post.title}</h1>
            <h2 className="post__body">{post.body}</h2>
        </div>
    )
}

export default Post;