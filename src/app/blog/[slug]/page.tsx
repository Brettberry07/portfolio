import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import Header from "@/components/blog/Header";
import Body from "@/components/blog/Body";
import Footer from "@/components/blog/Footer";

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-900">
        <Header title={post.title} date={post.date} />
        <Body content={post.content} />
        <Footer />
      </main>
    </>
  );
}
