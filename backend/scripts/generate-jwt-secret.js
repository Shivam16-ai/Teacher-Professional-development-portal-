// Script to generate a secure JWT secret for production
const crypto = require('crypto');

console.log('\n===========================================');
console.log('  JWT Secret Generator');
console.log('===========================================\n');

// Generate 64-byte (512-bit) random secret
const secret = crypto.randomBytes(64).toString('hex');

console.log('Your secure JWT secret:\n');
console.log(secret);
console.log('\n');
console.log('Add this to your .env file:');
console.log(`JWT_SECRET=${secret}`);
console.log('\n===========================================\n');
console.log('⚠️  IMPORTANT: Keep this secret secure!');
console.log('   - Never commit to version control');
console.log('   - Never share publicly');
console.log('   - Use different secrets for dev/prod');
console.log('\n===========================================\n');
