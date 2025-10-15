import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "../config/firebase"

// Blog Post Operations
export const blogPostsCollection = collection(db, "blogPosts")

export const createBlogPost = async (postData) => {
  try {
    const docRef = await addDoc(blogPostsCollection, {
      ...postData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: error.message }
  }
}

export const updateBlogPost = async (postId, postData) => {
  try {
    const postRef = doc(db, "blogPosts", postId)
    await updateDoc(postRef, {
      ...postData,
      updatedAt: Timestamp.now(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: error.message }
  }
}

export const deleteBlogPost = async (postId) => {
  try {
    const postRef = doc(db, "blogPosts", postId)
    await deleteDoc(postRef)
    return { success: true }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: error.message }
  }
}

export const getBlogPost = async (postId) => {
  try {
    const postRef = doc(db, "blogPosts", postId)
    const postSnap = await getDoc(postRef)

    if (postSnap.exists()) {
      return { success: true, data: { id: postSnap.id, ...postSnap.data() } }
    } else {
      return { success: false, error: "Post not found" }
    }
  } catch (error) {
    console.error("Error getting blog post:", error)
    return { success: false, error: error.message }
  }
}

export const getAllBlogPosts = async (limitCount = 50) => {
  try {
    const q = query(blogPostsCollection, orderBy("createdAt", "desc"), limit(limitCount))
    const querySnapshot = await getDocs(q)

    const posts = []
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() })
    })

    return { success: true, data: posts }
  } catch (error) {
    console.error("Error getting blog posts:", error)
    return { success: false, error: error.message }
  }
}

export const getBlogPostsByCategory = async (category) => {
  try {
    const q = query(blogPostsCollection, where("category", "==", category), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const posts = []
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() })
    })

    return { success: true, data: posts }
  } catch (error) {
    console.error("Error getting blog posts by category:", error)
    return { success: false, error: error.message }
  }
}

// Image Upload Operations
export const uploadImage = async (file, folder = "images") => {
  try {
    const timestamp = Date.now()
    const fileName = `${folder}/${timestamp}_${file.name}`
    const storageRef = ref(storage, fileName)

    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)

    return { success: true, url: downloadURL, path: fileName }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { success: false, error: error.message }
  }
}

export const deleteImage = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath)
    await deleteObject(imageRef)
    return { success: true }
  } catch (error) {
    console.error("Error deleting image:", error)
    return { success: false, error: error.message }
  }
}

// Contact Form Submissions
export const contactSubmissionsCollection = collection(db, "contactSubmissions")

export const createContactSubmission = async (submissionData) => {
  try {
    const docRef = await addDoc(contactSubmissionsCollection, {
      ...submissionData,
      createdAt: Timestamp.now(),
      status: "unread",
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error creating contact submission:", error)
    return { success: false, error: error.message }
  }
}

export const getAllContactSubmissions = async () => {
  try {
    const q = query(contactSubmissionsCollection, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const submissions = []
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() })
    })

    return { success: true, data: submissions }
  } catch (error) {
    console.error("Error getting contact submissions:", error)
    return { success: false, error: error.message }
  }
}

// Donation Records
export const donationsCollection = collection(db, "donations")

export const createDonation = async (donationData) => {
  try {
    const docRef = await addDoc(donationsCollection, {
      ...donationData,
      createdAt: Timestamp.now(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error creating donation record:", error)
    return { success: false, error: error.message }
  }
}

export const getAllDonations = async () => {
  try {
    const q = query(donationsCollection, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const donations = []
    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() })
    })

    return { success: true, data: donations }
  } catch (error) {
    console.error("Error getting donations:", error)
    return { success: false, error: error.message }
  }
}
