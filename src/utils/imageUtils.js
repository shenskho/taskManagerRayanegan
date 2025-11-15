/**
 * Generate a placeholder image data URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Data URL for placeholder image
 */
export const getPlaceholderImage = (width = 40, height = 40) => {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e0e0e0"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#999" text-anchor="middle" dominant-baseline="middle">
        ${width}x${height}
      </text>
    </svg>
  `.trim()
  
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Get user avatar with fallback to placeholder
 * @param {string|null|undefined} avatar - User avatar URL
 * @param {number} size - Avatar size (width and height)
 * @returns {string} Avatar URL or placeholder
 */
export const getUserAvatar = (avatar, size = 40) => {
  if (avatar && avatar.startsWith('http')) {
    return avatar
  }
  return getPlaceholderImage(size, size)
}

