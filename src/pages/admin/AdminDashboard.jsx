"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { LogOut, FileText, Mail, DollarSign, Plus, Edit, Trash2, BarChart3, Users } from "lucide-react"
import { logout } from "../../utils/authUtils"
import { useAuth } from "../../contexts/AuthContext"
import { getAllBlogPosts, deleteBlogPost, getAllContactSubmissions, getAllDonations } from "../../utils/firebaseUtils"
import BlogPostEditor from "../../components/admin/BlogPostEditor"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [blogPosts, setBlogPosts] = useState([])
  const [contactSubmissions, setContactSubmissions] = useState([])
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const [postsResult, submissionsResult, donationsResult] = await Promise.all([
      getAllBlogPosts(),
      getAllContactSubmissions(),
      getAllDonations(),
    ])

    if (postsResult.success) setBlogPosts(postsResult.data)
    if (submissionsResult.success) setContactSubmissions(submissionsResult.data)
    if (donationsResult.success) setDonations(donationsResult.data)

    setLoading(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate("/admin")
  }

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const result = await deleteBlogPost(postId)
      if (result.success) {
        setBlogPosts(blogPosts.filter((post) => post.id !== postId))
        alert("Blog post deleted successfully!")
      } else {
        alert("Failed to delete blog post: " + result.error)
      }
    }
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
    setShowEditor(true)
  }

  const handleCreatePost = () => {
    setEditingPost(null)
    setShowEditor(true)
  }

  const handleEditorClose = () => {
    setShowEditor(false)
    setEditingPost(null)
    loadData()
  }

  console.log(contactSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const handleRowClick = (submission) => {
    setSelectedSubmission(submission);
  };
  const handleCloseModal = async () => {
    if (selectedSubmission?.status === "unread") {
      try {
        // 1️⃣ Update status locally for immediate UI feedback
        setContactSubmissions((prev) =>
          prev.map((item) =>
            item.id === selectedSubmission.id
              ? { ...item, status: "read" }
              : item
          )
        );

        // 2️⃣ Update Firestore document
        const submissionRef = doc(db, "contactSubmissions", selectedSubmission.id);
        await updateDoc(submissionRef, { status: "read" });

        console.log("✅ Status updated to 'read' in Firestore");
      } catch (error) {
        console.error("❌ Error updating status:", error);
      }
    }

    // 3️⃣ Close modal
    setSelectedSubmission(null);
  };

  const totalDonations = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0)
  const unreadSubmissions = contactSubmissions.filter((sub) => sub.status === "unread").length

  const stats = [
    {
      label: "Total Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Contact Messages",
      value: contactSubmissions.length,
      icon: Mail,
      color: "bg-green-500",
      badge: unreadSubmissions > 0 ? `${unreadSubmissions} new` : null,
    },
    {
      label: "Total Donations",
      value: `$${totalDonations.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-accent",
    },
    {
      label: "Total Donors",
      value: donations.length,
      icon: Users,
      color: "bg-primary",
    },
  ]

  if (showEditor) {
    return <BlogPostEditor post={editingPost} onClose={handleEditorClose} />
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-charcoal">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
            </div>
            <button onClick={handleLogout} className="btn-outline flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container-custom">
          <nav className="flex gap-8">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "blog", label: "Blog Posts", icon: FileText },
              { id: "contacts", label: "Contact Messages", icon: Mail },
              { id: "donations", label: "Donations", icon: DollarSign },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-primary"
                    }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                            <Icon size={24} className="text-white" />
                          </div>
                          {stat.badge && (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                              {stat.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-charcoal mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-serif font-bold mb-4 text-charcoal">Recent Blog Posts</h3>
                    <div className="space-y-3">
                      {blogPosts.slice(0, 5).map((post) => (
                        <div key={post.id} className="flex items-center justify-between py-2 border-b">
                          <div>
                            <p className="font-medium text-charcoal">{post.title}</p>
                            <p className="text-sm text-gray-600">{post.category}</p>
                          </div>
                          <button onClick={() => handleEditPost(post)} className="text-primary hover:text-primary-dark">
                            <Edit size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-serif font-bold mb-4 text-charcoal">Recent Messages</h3>
                    <div className="space-y-3">
                      {contactSubmissions.slice(0, 5).map((submission) => (
                        <div key={submission.id} className="py-2 border-b">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-charcoal">{submission.name}</p>
                              <p className="text-sm text-gray-600">{submission.subject}</p>
                            </div>
                            {submission.status === "unread" && (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blog Posts Tab */}
            {activeTab === "blog" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-charcoal">Blog Posts</h2>
                  <button onClick={handleCreatePost} className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    Create New Post
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {blogPosts.map((post) => (
                          <tr key={post.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <p className="font-medium text-charcoal">{post.title}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                                {post.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{post.author}</td>
                            <td className="px-6 py-4 text-gray-700">
                              {post.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditPost(post)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Edit"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Messages Tab */}
            {activeTab === "contacts" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Contact Messages</h2>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {contactSubmissions.map((submission) => (
                          <tr key={submission.id} onClick={() => handleRowClick(submission)}
                            className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-charcoal">{submission.name}</td>
                            <td className="px-6 py-4 text-gray-700">{submission.email}</td>
                            <td className="px-6 py-4 text-gray-700">{submission.subject}</td>
                            <td className="px-6 py-4 text-gray-700">
                              {submission.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                onClick={() => handleRowClick(submission)}
                                className={`px-2 py-1 rounded-full  cursor-pointer text-sm ${submission.status === "unread"
                                  ? "bg-red-100 text-gray-800"
                                  : "bg-green-100 text-green-800"
                                  }`}
                              >
                                {submission.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>


                {/* Modal */}
                <AnimatePresence>
                  {selectedSubmission && (
                    <motion.div
                      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                      >
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">
                          {selectedSubmission.subject}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          From: <span className="font-medium">{selectedSubmission.name}</span> <br />
                          Email: {selectedSubmission.email}
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg text-gray-700 mb-6">
                          <span>Message</span>
                          <br /> <br />
                          {selectedSubmission.message}
                        </div>
                        <div className="text-right">
                          <button
                            onClick={handleCloseModal}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Donations Tab */}
            {activeTab === "donations" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Donations</h2>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {donations.map((donation) => (
                          <tr key={donation.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-charcoal">{donation.name}</td>
                            <td className="px-6 py-4 text-gray-700">{donation.email}</td>
                            <td className="px-6 py-4 font-semibold text-primary">
                              ${donation.amount?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                {donation.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {donation.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${donation.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : donation.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {donation.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
