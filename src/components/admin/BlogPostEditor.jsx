"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Save, Upload } from "lucide-react"
import { createBlogPost, updateBlogPost } from "../../utils/firebaseUtils"
import { uploadToCloudinary } from "../../utils/cloudinaryUtils"

export default function BlogPostEditor({ post, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    category: "Agriculture",
    author: "",
    readTime: "",
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadMethod, setUploadMethod] = useState("cloudinary") // 'cloudinary' or 'firebase'

  const categories = ["Agriculture", "Climate", "Water", "Education", "Conservation", "Economy"]

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        image: post.image || "",
        category: post.category || "Agriculture",
        author: post.author || "",
        readTime: post.readTime || "",
      })
      setImagePreview(post.image || "")
    }
  }, [post])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = formData.image

    // Upload image if a new one was selected
    if (imageFile) {
      setUploadingImage(true)

      // Use Cloudinary for image upload
      const uploadResult = await uploadToCloudinary(imageFile)

      setUploadingImage(false)

      if (uploadResult.success) {
        imageUrl = uploadResult.url
      } else {
        alert("Failed to upload image: " + uploadResult.error)
        setLoading(false)
        return
      }
    }

    const postData = {
      ...formData,
      image: imageUrl,
    }

    let result
    if (post) {
      result = await updateBlogPost(post.id, postData)
    } else {
      result = await createBlogPost(postData)
    }

    if (result.success) {
      alert(post ? "Blog post updated successfully!" : "Blog post created successfully!")
      onClose()
    } else {
      alert("Failed to save blog post: " + result.error)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-[10px] shadow-xl max-w-4xl w-full my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-serif font-bold text-charcoal">
            {post ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary"
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Read Time *</label>
              <input
                type="text"
                name="readTime"
                required
                value={formData.readTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary"
                placeholder="e.g., 5 min read"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
            <textarea
              name="excerpt"
              required
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary resize-none"
              placeholder="Brief description of the post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary resize-none font-mono text-sm"
              placeholder="Write your blog post content here (HTML supported)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image (Cloudinary Upload)</label>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Upload size={18} className="text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary"
                  />
                </div>
                <p className="text-sm text-gray-600">Upload a new image or keep the existing one</p>
              </div>
              {imagePreview && (
                <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || uploadingImage ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {uploadingImage ? "Uploading Image..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save size={20} />
                  {post ? "Update Post" : "Create Post"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
