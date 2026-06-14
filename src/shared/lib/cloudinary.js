// src/shared/lib/cloudinary.js
// Cloudinary configuration and utility functions

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Get optimized Cloudinary image URL with transformations
 * @param {string} publicId - The Cloudinary public ID of the image
 * @param {object} options - Transformation options
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height
 * @param {string} options.crop - Crop mode (fill, fit, scale, etc.)
 * @param {string} options.quality - Quality (auto, auto:low, auto:best, etc.)
 * @param {string} options.format - Format (auto, webp, jpg, png)
 * @returns {string} Optimized image URL
 */
export const getImageUrl = (publicId, options = {}) => {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options;

  const transforms = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop && (width || height)) transforms.push(`c_${crop}`);

  const transformString = transforms.join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
};

/**
 * Upload an image to Cloudinary (unsigned upload - no backend needed)
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder path in Cloudinary
 * @returns {Promise<object>} Upload response with public_id, secure_url, etc.
 */
export const uploadImage = async (file, folder = 'grocery_shop') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  return response.json();
};

/**
 * Get a placeholder image URL (for products without images)
 * @param {number} width
 * @param {number} height
 * @returns {string}
 */
export const getPlaceholderUrl = (width = 400, height = 400) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill,f_auto/grocery_shop/placeholder`;
};

export default {
  getImageUrl,
  uploadImage,
  getPlaceholderUrl,
  CLOUD_NAME,
};
