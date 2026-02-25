import Blogs from "./Blogs";

export default function User({ user }) {
  if (!user) return null;
  
  return (
    <div>
      <h2>{user.name}</h2>

      <h4>added blogs</h4>
      <Blogs blogs={user.blogs} />
    </div>
  );
}