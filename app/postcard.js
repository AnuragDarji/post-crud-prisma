"use client";

import { useState } from "react";
import { deletePost, updatePost } from "../actions/index";

export default function PostCard({ post, index }) {
  const [editing, setEditing] = useState(false);

  return (
    <article className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-300 font-sans">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-xl font-bold text-stone-800 mt-0.5 leading-snug truncate">
              {post.title}
            </h2>
            {post.description && (
              <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                {post.description}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-1 shrink-0">
            {/* Edit pencil */}
            <button
              onClick={() => setEditing((prev) => !prev)}
              title={editing ? "Cancel edit" : "Edit post"}
              className={`transition-colors duration-150 ${
                editing
                  ? "text-amber-500"
                  : "text-stone-300 hover:text-amber-400"
              }`}
            >
              {editing ? (
                /* X icon when editing */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                /* Pencil icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z"
                  />
                </svg>
              )}
            </button>

            {/* Delete */}
            <form action={deletePost.bind(null, post.id)}>
              <button
                type="submit"
                title="Delete post"
                className="text-stone-300 hover:text-red-400 transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 01-1-1V5a1 1 0 011-1h6a1 1 0 011 1v1a1 1 0 01-1 1H9z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* UPDATE FORM — animated slide in/out */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          editing ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-stone-50/70 border-t border-stone-100">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-300 font-sans mb-3">
            Edit Post
          </p>
          <form
            action={async (formData) => {
              await updatePost(formData);
              setEditing(false);
            }}
            className="flex gap-3"
          >
            <input type="hidden" name="id" value={post.id} />
            <input
              name="title"
              defaultValue={post.title}
              required
              className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-stone-700 text-sm font-['Georgia',serif] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              placeholder="Title"
            />
            <input
              name="description"
              defaultValue={post.description || ""}
              className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-stone-700 text-sm font-['Georgia',serif] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              placeholder="Description"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-stone-900 text-xs uppercase tracking-widest font-sans px-5 py-2.5 rounded-xl transition-all duration-150 active:scale-95 shrink-0"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}