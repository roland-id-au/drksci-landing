#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.BASE_URL || 'https://drksci.com';
const SECRET_KEY = process.env.SECRET_KEY || 'bd23c1bf280ee3f795cd91631b9ea8594ced53deb1dbecfe57fa0ddfaa720396';
const SHORT_URLS_FILE = path.join(__dirname, 'src/data/shortUrls.json');

/**
 * Generate an ultra-short magic link with mapping storage
 */
function generateUltraShortLink(collaborator, jobId, expiryHours = 72, jobTitle = '', company = '') {
  // Create expiry timestamp
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + expiryHours);
  const expiryTimestamp = Math.floor(expiryDate.getTime() / 1000);

  // Create compact payload for authentication
  const payload = {
    c: collaborator.substring(0, 3),
    j: jobId,
    e: expiryTimestamp,
    i: Math.floor(Date.now() / 1000)
  };

  // Generate authentication token
  const payloadString = JSON.stringify(payload);
  const fullToken = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadString)
    .digest('hex');
  
  const shortToken = fullToken.substring(0, 16);
  const encodedPayload = Buffer.from(payloadString).toString('base64url');

  // Generate short code for URL mapping
  const shortCode = crypto
    .createHash('sha256')
    .update(`${collaborator}-${jobId}-${expiryTimestamp}-${Date.now()}`)
    .digest('hex')
    .substring(0, 8);

  // Create mapping entry
  const mappingEntry = {
    collaborator,
    jobId,
    expires: expiryTimestamp,
    token: shortToken,
    data: encodedPayload,
    created: Math.floor(Date.now() / 1000),
    jobTitle: jobTitle || `Job Application`,
    company: company || 'Company'
  };

  // Load existing mappings or create new
  let shortUrls = {};
  try {
    if (fs.existsSync(SHORT_URLS_FILE)) {
      shortUrls = JSON.parse(fs.readFileSync(SHORT_URLS_FILE, 'utf8'));
    }
  } catch (error) {
    console.warn('Could not read existing short URLs file, creating new one');
  }

  // Add new mapping
  shortUrls[shortCode] = mappingEntry;

  // Save mappings
  try {
    // Ensure directory exists
    const dir = path.dirname(SHORT_URLS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(SHORT_URLS_FILE, JSON.stringify(shortUrls, null, 2));
    console.log(`✅ Short URL mapping saved to ${SHORT_URLS_FILE}`);
  } catch (error) {
    console.error(`❌ Failed to save mapping: ${error.message}`);
  }

  // Create links
  const ultraShortLink = `${BASE_URL}/a/${shortCode}`;
  const mediumLink = `${BASE_URL}/c/${collaborator}/j/${jobId}?t=${shortToken}&d=${encodedPayload}`;
  const fullLink = `${BASE_URL}/collaborator/${collaborator}/job/${jobId}?token=${fullToken}&data=${encodedPayload}`;

  return {
    ultraShortLink,
    mediumLink,
    fullLink,
    shortCode,
    expires: expiryDate.toISOString(),
    expiryHours,
    jobId,
    collaborator,
    jobTitle: mappingEntry.jobTitle,
    company: mappingEntry.company
  };
}

// CLI interface
const args = process.argv.slice(2);

if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
Ultra-Short Magic Link Generator
=================================

Usage:
  node generateUltraShortLink.js <collaborator> <jobId> [expiryHours] [jobTitle] [company]

Arguments:
  collaborator  - Name of the collaborator (e.g., 'blake')
  jobId        - Job identifier (e.g., 'qld-655778-25')
  expiryHours  - Hours until link expires (default: 72)
  jobTitle     - Job title for the mapping (optional)
  company      - Company name for the mapping (optional)

Examples:
  node generateUltraShortLink.js blake qld-655778-25
  node generateUltraShortLink.js blake qld-655778-25 168 "Director of Innovation" "QLD Gov"

Features:
  - Creates ultra-short URLs (e.g., /a/b2b19f8b)
  - Stores mappings in src/data/shortUrls.json
  - Generates multiple link formats for flexibility
  `);
  process.exit(0);
}

if (args.length < 2) {
  console.error('❌ Error: Missing required arguments');
  console.log('Usage: node generateUltraShortLink.js <collaborator> <jobId> [expiryHours] [jobTitle] [company]');
  console.log('Run with --help for more information');
  process.exit(1);
}

const [
  collaborator, 
  jobId, 
  expiryHours = 72, 
  jobTitle = 'Job Application', 
  company = 'Company'
] = args;

const result = generateUltraShortLink(
  collaborator, 
  jobId, 
  parseInt(expiryHours), 
  jobTitle, 
  company
);

// Display results
console.log('\n' + '='.repeat(70));
console.log('🚀 ULTRA-SHORT MAGIC LINK GENERATED');
console.log('='.repeat(70));
console.log(`\n📋 Job Details:`);
console.log(`   Title: ${result.jobTitle}`);
console.log(`   Company: ${result.company}`);
console.log(`   Reference: ${result.jobId}`);
console.log(`   Collaborator: ${result.collaborator}`);
console.log(`\n⏰ Validity:`);
console.log(`   Expires: ${result.expires}`);
console.log(`   Valid for: ${result.expiryHours} hours`);
console.log(`   Short Code: ${result.shortCode}`);

console.log('\n' + '='.repeat(70));
console.log('🔗 ULTRA-SHORT LINK (83% shorter!):');
console.log('='.repeat(70));
console.log(`\n${result.ultraShortLink}\n`);

console.log('='.repeat(70));
console.log('📧 SHARE THIS LINK WITH HIRING MANAGERS');
console.log('='.repeat(70));

// Optional: show all formats
if (process.env.SHOW_ALL_FORMATS === 'true') {
  console.log('\n📎 Alternative formats:');
  console.log(`   Medium: ${result.mediumLink}`);
  console.log(`   Full:   ${result.fullLink}`);
}