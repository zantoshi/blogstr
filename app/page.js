"use client";
import { getBlogPosts } from "@/lib/nostr";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const blogPosts = await getBlogPosts();
        // Handle the blogs data as needed
        console.log(blogPosts);
        setBlogs(blogPosts);
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching blog posts:", error);
      }
    }

    getBlogs();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between space-y-8 p-24">
      <div className="space-y-2">
        <h1 className="text-5xl font-bold ">Santos' Blog</h1>
        <p className="text-lg text-slate-600">
          Welcome to a stream of my thoughts.
        </p>
      </div>
      <div className="flex flex-row space-x-2">
        {blogs?.map((blog) => {
          <div className="w-60 h-60 rounded-lg border-2 border-slate-500 ">
            <Image
              width={250}
              height={20}
              className="w-auto rounded-lg"
              src="https://images.unsplash.com/photo-1699819897142-674d5615835b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image Alt Text"
            />
            <div className="ml-4 mt-2">
              <h3 className="text-base font-semibold">{blog.tags[1][1]}</h3>
              <p className="text-base">{blog[0][1]}</p>
              <p className="text-base font-slate-500">{blog.tags[2][1]}</p>
            </div>
          </div>;
        })}
      </div>
    </main>
  );
}
