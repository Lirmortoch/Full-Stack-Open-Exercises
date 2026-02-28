export default function User({ user }) {
  if (!user) return <div>Loading...</div>;
  
  return (
    <div>
      <h2 className="text-2xl mb-4">{user.name}</h2>

      <h4 className="text-xl">added blogs</h4>
      <ul className="pr-6 pl-6 mt-2 list-disc">
        {
          user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
        }
      </ul>
    </div>
  );
}