const Comments = ({ commentsData }) => {
  return (
    <>
      <div>
        {commentsData.map((commentData) => (
          <div key={commentData._id}>{commentData.CommentText}</div>
        ))}
      </div>
    </>
  );
};

export default Comments;
