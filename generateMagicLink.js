#!/usr/bin/env node

const crypto = require('crypto');

// Configuration - Update these for your environment
const BASE_URL = process.env.BASE_URL || 'https://drksci.com';
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-in-production';

/**
 * Generate a magic link for a job application
 */
function generateMagicLink(collaborator, jobId, expiryHours = 72) {
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
    collaborator,
    token,
    payload: encodedPayload
  };
}

// Parse command line arguments
const args = process.argv.slice(2);

// Handle different command formats
if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
Magic Link Generator for Job Applications
==========================================

Usage:
  node generateMagicLink.js <collaborator> <jobId> [expiryHours]

Arguments:
  collaborator  - Name of the collaborator (e.g., 'blake')
  jobId        - Job identifier (e.g., 'qld-655778-25' or 'company/dept/role/2025')
  expiryHours  - Hours until link expires (default: 72)

Examples:
  node generateMagicLink.js blake qld-655778-25
  node generateMagicLink.js blake qld-655778-25 168
  node generateMagicLink.js blake "google/cloud/sre/2025" 24

Environment Variables:
  BASE_URL    - Base URL for links (default: https://drksci.com)
  SECRET_KEY  - Secret key for token generation (MUST be set in production)

Output:
  Generates a secure, time-limited access link for the job application page.
  The link includes authentication token and will expire after the specified time.
  `);
  process.exit(0);
}

if (args.length < 2) {
  console.error('Error: Missing required arguments');
  console.log('Usage: node generateMagicLink.js <collaborator> <jobId> [expiryHours]');
  console.log('Run with --help for more information');
  process.exit(1);
}

const [collaborator, jobId, expiryHours = 72] = args;

// Generate the magic link
const result = generateMagicLink(collaborator, jobId, parseInt(expiryHours));

// Output results
console.log('\n' + '='.repeat(60));
console.log('MAGIC LINK GENERATED');
console.log('='.repeat(60));
console.log(`\nCollaborator: ${result.collaborator}`);
console.log(`Job ID:       ${result.jobId}`);
console.log(`Expires:      ${result.expires}`);
console.log(`Valid for:    ${result.expiryHours} hours`);
console.log('\n' + '-'.repeat(60));
console.log('SHARE THIS LINK WITH THE HIRING MANAGER:');
console.log('-'.repeat(60));
console.log(`\n${result.link}\n`);
console.log('-'.repeat(60));

// Optional: Output just the link for piping to other commands
if (process.env.LINK_ONLY === 'true') {
  console.log(result.link);
}