"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react"
import { getBlogPost, getAllBlogPosts } from "../utils/firebaseUtils"

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    setLoading(true)
    const result = await getBlogPost(id)
    if (result.success) {
      setPost(result.data)

      // Load related posts from same category
      const allPostsResult = await getAllBlogPosts()
      if (allPostsResult.success) {
        const related = allPostsResult.data
          .filter((p) => p.id !== id && p.category === result.data.category)
          .slice(0, 2)
        setRelatedPosts(related)
      }
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Back Button */}
      <div className="container-custom py-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
          <ArrowLeft size={20} />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] rounded-lg overflow-hidden"
        >
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Article Content */}
      <article className="container-custom max-w-4xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Category Badge */}
          <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-charcoal text-balance">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{post.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</span>
            </div>
            <span>{post.readTime}</span>

            {/* Share Buttons */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm font-medium">Share:</span>
              <button className="text-gray-600 hover:text-primary transition-colors" aria-label="Share on Facebook">
                <Facebook size={20} />
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors" aria-label="Share on Twitter">
                <Twitter size={20} />
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors" aria-label="Share on LinkedIn">
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: "#1a1a1a",
              lineHeight: "1.8",
            }}
          />
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-charcoal group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
