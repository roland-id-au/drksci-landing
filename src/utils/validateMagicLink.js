// Browser-compatible validation - no Node.js dependencies

/**
 * Validate a magic link token (browser version)
 * @param {string} token - The token from the URL
 * @param {string} encodedData - The encoded payload from the URL
 * @returns {object} - Validation result with decoded data or error
 */
export function validateMagicLink(token, encodedData) {
  try {
    // Decode payload from base64url
    const payloadString = atob(encodedData.replace(/_/g, '/').replace(/-/g, '+'));
    const payload = JSON.parse(payloadString);

    // Handle different payload formats (full vs compact)
    const expiryTime = payload.expires || payload.e;
    const expiryMs = expiryTime > 9999999999 ? expiryTime : expiryTime * 1000; // Convert seconds to ms if needed
    
    // Check expiry
    if (Date.now() > expiryMs) {
      return {
        valid: false,
        error: 'Link has expired',
        expired: true
      };
    }

    // Basic validation - support both full (64 char) and short (16 char) tokens
    // In production, you'd verify this against a backend API
    if (!token || (token.length !== 64 && token.length !== 16)) {
      return {
        valid: false,
        error: 'Invalid authentication token',
        expired: false
      };
    }

    // Calculate time remaining
    const hoursRemaining = Math.floor((expiryMs - Date.now()) / (1000 * 60 * 60));

    return {
      valid: true,
      data: payload,
      hoursRemaining,
      expired: false
    };
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid link format',
      expired: false
    };
  }
}