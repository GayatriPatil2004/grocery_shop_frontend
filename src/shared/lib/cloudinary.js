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
  if (!publicId) {
    return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400';
  }

  // If publicId is already a full URL, return it directly
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId;
  }

  // If Cloudinary is not configured, map simple keys to nice Unsplash fallback images
  if (!CLOUD_NAME || CLOUD_NAME === 'your_cloud_name') {
    const fallbacks = {
      'basmati_rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
      'toor_dal': 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?auto=format&fit=crop&q=80&w=400',
      'sunflower_oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
      'atta_flour': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
      'amul_milk': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400',
      'amul_butter': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400',
      'amul_cheese': 'https://images.unsplash.com/photo-1486887396183-f2407578f78a?auto=format&fit=crop&q=80&w=400',
      'vanilla_tub': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=400',
      'chocobar': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400',
      'ice_bag': 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=400',
      'water_bottle': 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&q=80&w=400',
      'cigarettes': 'https://images.unsplash.com/photo-1519098901907-287768e13224?auto=format&fit=crop&q=80&w=400'
    };
    return fallbacks[publicId] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400';
  }

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
