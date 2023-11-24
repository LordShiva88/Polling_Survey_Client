const PostSurvey = () => {
  return (
    <div>
      <h1>Post Survey</h1>
      <div>
        <h2>Create Survey</h2>
        <form>
          <label>Title:</label>
          <input type="text" name="title" required />
          <label>Description:</label>
          <textarea name="description" required />
          <label>Options:</label>
          <input type="text" required />
          <button type="button">Add Option</button>
          <label>Category:</label>
          <input type="text" name="category" required />
          <button type="submit">Create Survey</button>
        </form>
      </div>
    </div>
  );
};

export default PostSurvey;
