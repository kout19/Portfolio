import React from "react";
// import Header from "../components/Header";
const Blog = () => {
  const posts = [
    {
      id: "1",
      title: "How i built y Portfolio",
      date: "2024-11-17",
      excerpt: "An overview of the tools and technologies I used to create this portfolio",
    },
    {
      id: "2",
      title: "Greeting started with React",
      date: "2024-11-10",
      excerpt: "A beginner-friendly guide to learning React and building your first app",
    },
  ];
  return (
    <div>
      {/* <Header /> */}
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="boder-b pb-4">
              <a href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-semibold text-blue-600 cursor-pointer">{post.title}</h2>
              </a>
              <p className="text-gray-500">{post.date}</p>
              <p className="">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )

}
export default Blog;