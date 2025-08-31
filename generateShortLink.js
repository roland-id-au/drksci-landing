#!/usr/bin/env node

const crypto = require('crypto');

// Configuration
const BASE_URL = process.env.BASE_URL || 'https://drksci.com';
const SECRET_KEY = process.env.SECRET_KEY || 'bd23c1bf280ee3f795cd91631b9ea8594ced53deb1dbecfe57fa0ddfaa720396';

/**
 * Generate a short magic link using a compact token
 */
function generateShortLink(collaborator, jobId, expiryHours = 72) {
  // Create expiry timestamp
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + expiryHours);
  const expiryTimestamp = Math.floor(expiryDate.getTime() / 1000); // Use seconds for shorter encoding

  // Create compact payload
  const payload = {
    c: collaborator.substring(0, 3), // First 3 chars of collaborator
    j: jobId,
    e: expiryTimestamp,
    i: Math.floor(Date.now() / 1000)
  };

  // Generate shorter token (first 16 chars of hash)
  const payloadString = JSON.stringify(payload);
  const fullToken = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadString)
    .digest('hex');
  
  // Take first 16 characters for shorter token
  const shortToken = fullToken.substring(0, 16);

  // Encode payload more compactly
  const encodedPayload = Buffer.from(payloadString).toString('base64url');

  // Create shorter magic link using 't' and 'd' params
  const shortLink = `${BASE_URL}/c/${collaborator}/j/${jobId}?t=${shortToken}&d=${encodedPayload}`;

  // Alternative ultra-short format (requires server-side lookup)
  const ultraShortCode = crypto
    .createHash('sha256')
    .update(`${collaborator}-${jobId}-${expiryTimestamp}`)
    .digest('hex')
    .substring(0, 8);
  
  const ultraShortLink = `${BASE_URL}/a/${ultraShortCode}`;

  return {
    shortLink,
    ultraShortLink,
    fullLink: `${BASE_URL}/collaborator/${collaborator}/job/${jobId}?token=${fullToken}&data=${encodedPayload}`,
    expires: expiryDate.toISOString(),
    expiryHours,
    jobId,
    collaborator,
    shortCode: ultraShortCode
  };
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
Short Magic Link Generator
===========================

Usage:
  node generateShortLink.js <collaborator> <jobId> [expiryHours]

Examples:
  node generateShortLink.js blake qld-655778-25
  node generateShortLink.js blake qld-655778-25 168

Output:
  Generates shorter, more shareable links for job applications.
  `);
  process.exit(0);
}

if (args.length < 2) {
  console.error('Error: Missing required arguments');
  console.log('Usage: node generateShortLink.js <collaborator> <jobId> [expiryHours]');
  process.exit(1);
}

const [collaborator, jobId, expiryHours = 72] = args;
const result = generateShortLink(collaborator, jobId, parseInt(expiryHours));

console.log('\n' + '='.repeat(60));
console.log('SHORT MAGIC LINKS GENERATED');
console.log('='.repeat(60));
console.log(`\nCollaborator: ${result.collaborator}`);
console.log(`Job ID:       ${result.jobId}`);
console.log(`Expires:      ${result.expires}`);
console.log(`Valid for:    ${result.expiryHours} hours`);
console.log('\n' + '-'.repeat(60));
console.log('SHORTER LINK (with params):');
console.log('-'.repeat(60));
console.log(`\n${result.shortLink}\n`);
console.log('-'.repeat(60));
console.log('ULTRA-SHORT LINK (requires server lookup):');
console.log('-'.repeat(60));
console.log(`\n${result.ultraShortLink}\n`);
console.log('Short Code: ' + result.shortCode);
console.log('-'.repeat(60));