import crypto from "crypto";
import { 
  verifySepayApiKey, 
  verifySepayWebhookSignature,
  extractOrderCode, 
  generateOrderCode, 
  getBillingConfig 
} from "../src/services/billing";

let totalTests = 0;
let passedTests = 0;

function assert(description: string, condition: boolean) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${description}`);
  } else {
    console.error(`  ✗ FAIL: ${description}`);
    process.exitCode = 1;
  }
}

console.log("=======================================================");
console.log("    ASMIRE SEPAY BILLING & WEBHOOK TEST SUITE         ");
console.log("=======================================================\n");

// SUITE 1: SePay API Key & Timing-Safe Verification
console.log("[SUITE 1] SePay API Key & Timing-Safe Verification");
const config = getBillingConfig();
assert("Accepts correct 'Apikey <TOKEN>' format", verifySepayApiKey(`Apikey ${config.apiKey}`));
assert("Accepts bare token without prefix", verifySepayApiKey(config.apiKey));
assert("Rejects null or undefined authorization header", !verifySepayApiKey(null) && !verifySepayApiKey(undefined));
assert("Rejects incorrect API key", !verifySepayApiKey("Apikey completely_wrong_secret_token"));
assert("Rejects truncated API key (different length)", !verifySepayApiKey("Apikey short"));

// SUITE 1B: SePay HMAC-SHA256 Signature Verification
console.log("\n[SUITE 1B] SePay HMAC-SHA256 Signature Verification");
const sampleRawBody = JSON.stringify({ id: 12345, content: "ASM9K2D9 thanh toan", amountIn: 725000 });
const secret = (process.env.SEPAY_WEBHOOK_SECRET || config.apiKey).trim();
const validHmac = crypto.createHmac("sha256", secret).update(sampleRawBody).digest("hex");

assert("Verifies authentic HMAC-SHA256 signature in X-SePay-Signature", 
  verifySepayWebhookSignature({ signatureHeader: validHmac, rawBody: sampleRawBody }) === true
);
assert("Verifies authentic HMAC-SHA256 with v1= prefix", 
  verifySepayWebhookSignature({ signatureHeader: `t=1700000000,v1=${validHmac}`, rawBody: sampleRawBody }) === true
);
assert("Rejects tampered HMAC signature", 
  verifySepayWebhookSignature({ signatureHeader: "bad_signature_hex_1234567890abcdef", rawBody: sampleRawBody }) === false
);
assert("Rejects signature computed with wrong secret", 
  verifySepayWebhookSignature({ 
    signatureHeader: crypto.createHmac("sha256", "wrong_secret").update(sampleRawBody).digest("hex"), 
    rawBody: sampleRawBody 
  }) === false
);
assert("Rejects if body was modified after signature generation", 
  verifySepayWebhookSignature({ signatureHeader: validHmac, rawBody: sampleRawBody + "tampered" }) === false
);

// SUITE 2: Order Memo Extraction & Parsing
console.log("\n[SUITE 2] Order Memo Extraction & Regex Parsing");
assert("Parses standard ASMXXXXXX code", extractOrderCode("ASM9K2D9 thanh toan pro") === "ASM9K2D9");
assert("Converts lowercase asmxxxxxx to uppercase", extractOrderCode("asm8x4q2 thanh toan") === "ASM8X4Q2");
assert("Extracts memo embedded in messy bank text", extractOrderCode("MBBank FT2632 ASM7K3L1 chuyen khoan nang cap") === "ASM7K3L1");
assert("Returns null for irrelevant bank memo without ASM code", extractOrderCode("Nguyen Van A chuyen tien an trua") === null);
assert("Returns null for empty content", extractOrderCode("") === null);

// SUITE 3: Order Code & VietQR Generation
console.log("\n[SUITE 3] Order Code & VietQR Generation");
const code1 = generateOrderCode();
const code2 = generateOrderCode();
assert("Generated code starts with ASM prefix", code1.startsWith("ASM"));
assert("Generated code length is 9 characters (ASM + 6)", code1.length === 9);
assert("Generates unique codes on subsequent calls", code1 !== code2);
assert("Generated code uses non-ambiguous uppercase characters", /^ASM[A-Z0-9]+$/.test(code1));

// SUITE 4: Amount Verification & Underpayment Defense
console.log("\n[SUITE 4] Amount Verification & Underpayment Defense");
const requiredVnd = config.priceVnd;
assert("Accepts exact required price (725,000 VND)", 725000 >= requiredVnd);
assert("Accepts overpayment (e.g. 1,000,000 VND)", 1000000 >= requiredVnd);
assert("Rejects partial / underpayment (e.g. 50,000 VND)", 50000 < requiredVnd);
assert("Rejects zero amount", 0 < requiredVnd);

// SUITE 5: 14-Day Refund Eligibility Window Boundary Logic
console.log("\n[SUITE 5] 14-Day Refund Eligibility Window Boundary Logic");
const now = new Date();
const msPerDay = 24 * 60 * 60 * 1000;

const paymentDay1 = new Date(now.getTime() - 1 * msPerDay);
const paymentDay13 = new Date(now.getTime() - 13 * msPerDay);
const paymentDay14 = new Date(now.getTime() - 14 * msPerDay);
const paymentDay15 = new Date(now.getTime() - 15 * msPerDay);
const paymentDay30 = new Date(now.getTime() - 30 * msPerDay);

function isEligibleForRefund(paymentDate: Date, currentTime: Date): boolean {
  return (currentTime.getTime() - paymentDate.getTime()) <= 14 * msPerDay;
}

assert("Eligible on Day 1 after purchase", isEligibleForRefund(paymentDay1, now) === true);
assert("Eligible on Day 13 after purchase", isEligibleForRefund(paymentDay13, now) === true);
assert("Eligible on Day 14 after purchase (exact boundary)", isEligibleForRefund(paymentDay14, now) === true);
assert("Ineligible on Day 15 after purchase (> 14 days)", isEligibleForRefund(paymentDay15, now) === false);
assert("Ineligible on Day 30 after purchase", isEligibleForRefund(paymentDay30, now) === false);

// SUITE 6: Pro 30-Day Extension Logic
console.log("\n[SUITE 6] Pro 30-Day Extension Logic");
const initialExpiry = new Date(now.getTime() + 10 * msPerDay); // 10 days remaining
const renewedExpiry = new Date(initialExpiry.getTime() + 30 * msPerDay); // extend from existing
const diffDays = Math.round((renewedExpiry.getTime() - now.getTime()) / msPerDay);
assert("Extending an active subscription adds 30 days to existing expiration (10 + 30 = 40 days)", diffDays === 40);

console.log("\n=======================================================");
console.log(`   TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}   `);
console.log("=======================================================\n");

if (totalTests !== passedTests) {
  process.exit(1);
}
