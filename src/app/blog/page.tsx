import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

// hosted on brettberry.dev

export default function BlogListPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
          
          {posts.length === 0 ? (
            <p className="text-gray-400">No blog posts found. Add markdown files to public/blog-posts/</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.slug}`}
                  className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  {post.date && (
                    <p className="text-sm text-gray-400 mb-3">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                  {post.excerpt && (
                    <p className="text-gray-300">{post.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
