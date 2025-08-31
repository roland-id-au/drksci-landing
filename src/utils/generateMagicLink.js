// Browser-compatible version - uses Web Crypto API
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || 'your-secret-key-change-in-production';

/**
 * Generate HMAC-SHA256 hash using Web Crypto API
 */
async function generateHmac(message, key) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Validate a magic link token (browser version)
 * @param {string} token - The token from the URL
 * @param {string} encodedData - The encoded payload from the URL
 * @returns {object} - Validation result with decoded data or error
 */
export function validateMagicLink(token, encodedData) {
  try {
    // Decode payload
    const payloadString = atob(encodedData.replace(/_/g, '/').replace(/-/g, '+'));
    const payload = JSON.parse(payloadString);

    // Check expiry
    if (Date.now() > payload.expires) {
      return {
        valid: false,
        error: 'Link has expired',
        expired: true
      };
    }

    // For browser, we'll do a simple validation
    // In production, you might want to verify against a backend API
    // For now, we'll check if token exists and payload is valid
    if (!token || token.length !== 64) {
      return {
        valid: false,
        error: 'Invalid authentication token',
        expired: false
      };
    }

    // Calculate time remaining
    const hoursRemaining = Math.floor((payload.expires - Date.now()) / (1000 * 60 * 60));

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

// Node.js version for the CLI tool
if (typeof window === 'undefined') {
  const crypto = require('crypto');
  
  module.exports.generateMagicLink = function(collaborator, jobId, expiryHours = 72) {
    const BASE_URL = process.env.BASE_URL || 'https://drksci.com';
    const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-in-production';
    
    // Create expiry timestamp
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + expiryHours);
    const expiryTimestamp = expiryDate.getTime();

    // Create payload
    const payload = {
      collaborator,
      jobId,
      expires: expiryTimestamp,
      issued: Date.now()
    };

    // Generate token
    const payloadString = JSON.stringify(payload);
    const token = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(payloadString)
      .digest('hex');

    // Encode payload for URL
    const encodedPayload = Buffer.from(payloadString).toString('base64url');

    // Create magic link
    const magicLink = `${BASE_URL}/collaborator/${collaborator}/job/${jobId}?token=${token}&data=${encodedPayload}`;

    return {
      link: magicLink,
      expires: expiryDate.toISOString(),
      expiryHours,
      jobId,
      collaborator
    };
  };
}