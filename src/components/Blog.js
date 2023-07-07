import Toggleable from './Toggleable'

/*
const LikeButton = ({ blog }) => {
  return (
    <button onClick={LikeArticle}></button>
  );
}
*/

const Blog = ({ blog, onLikeArticle, onDeleteArticle }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    < div style={blogStyle}>
      {blog.title}
      <div>
        likes: {blog.likes}
        <button onClick={(event) => { onLikeArticle(event, blog) }}>Like This</button>
      </div>
      <Toggleable showButtonText="show details" hideButtonText="hide details">
        <div>
          author: {blog.author}
        </div>
      </Toggleable>
      <button onClick={(event) => { onDeleteArticle(event, blog) }}>Delete</button>
    </div >)
}

export default Blog