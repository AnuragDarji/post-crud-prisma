import { prisma } from "../lib/db";
import { createPost } from "../actions/index";
import PostCard from "./postcard";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#FAF8F5] font-['Georgia',serif]">
      {/* Header */}
      <div className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans">
              Your Collection
            </p>
            <h1 className="text-2xl font-bold text-stone-800 leading-tight">
              Posts
            </h1>
          </div>
          <span className="text-xs font-sans text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
            {posts.length} {posts.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* CREATE FORM */}
        <section>
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans mb-4">
            New Post
          </p>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <form action={createPost} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-stone-400 font-sans">
                  Title
                </label>
                <input
                  name="title"
                  placeholder="Give it a title…"
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 text-base font-['Georgia',serif] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-stone-400 font-sans">
                  Description
                </label>
                <input
                  name="description"
                  placeholder="Add a description…"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 text-base font-['Georgia',serif] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-stone-800 hover:bg-stone-900 text-white text-xs uppercase tracking-widest font-sans px-6 py-3 rounded-xl transition-all duration-150 active:scale-95 shadow-sm"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* DIVIDER */}
        {posts.length > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-stone-200" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans">
              All Posts
            </p>
            <div className="flex-1 h-px bg-stone-200" />
          </div>
        )}

        {/* EMPTY STATE */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✦</p>
            <p className="text-stone-400 font-sans text-sm">
              Nothing here yet. Add your first post above.
            </p>
          </div>
        )}

        {/* POST LIST */}
        <section className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </section>
      </div>
    </main>
  );
}