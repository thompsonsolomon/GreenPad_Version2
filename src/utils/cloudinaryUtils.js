// Cloudinary image upload utilities

export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    )

    const data = await response.json()

    if (data.secure_url) {
      return {
        success: true,
        url: data.secure_url,
        publicId: data.public_id,
      }
    } else {
      return {
        success: false,
        error: "Failed to upload image",
      }
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export const deleteFromCloudinary = async (publicId) => {
  try {
    // Note: Deletion requires backend implementation with API secret
    // This is a placeholder for the frontend
    console.log("Delete image with publicId:", publicId)
    return {
      success: true,
      message: "Image deletion should be handled on the backend",
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
