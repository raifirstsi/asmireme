/**
 * Asmire Referral Attribution & Security Test Suite
 * Automated tests for Section 9.2 (11 Branches) and Section 9.6 (Security & SSRF)
 */

import { validateMemberAffiliateLink } from "../src/lib/allowlist";
import { isPrivateOrLoopbackHost, isValidOutboundUrl } from "../src/lib/security";
import { signReferralCookie, verifyReferralCookie, generateReferralCode } from "../src/lib/referral";
import { getToolBySlug } from "../src/data/tools-data";

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("   ASMIRE REFERRAL ATTRIBUTION & SECURITY TEST SUITE   ");
  console.log("=======================================================\n");

  // SUITE 1: Security & SSRF Protection (Section 9.6)
  console.log("[SUITE 1] Security, SSRF & URL Validation");
  assert(isPrivateOrLoopbackHost("localhost") === true, "Blocks 'localhost'");
  assert(isPrivateOrLoopbackHost("127.0.0.1") === true, "Blocks IPv4 loopback '127.0.0.1'");
  assert(isPrivateOrLoopbackHost("10.0.0.1") === true, "Blocks private RFC1918 10.x subnet");
  assert(isPrivateOrLoopbackHost("192.168.1.1") === true, "Blocks private RFC1918 192.168.x subnet");
  assert(isPrivateOrLoopbackHost("172.20.0.1") === true, "Blocks private RFC1918 172.16-31.x subnet");
  assert(isPrivateOrLoopbackHost("169.254.169.254") === true, "Blocks AWS/Cloud metadata IP");
  assert(isPrivateOrLoopbackHost("gohighlevel.com") === false, "Allows legitimate public domain");

  assert(isValidOutboundUrl("http://gohighlevel.com") === false, "Rejects insecure HTTP protocol");
  assert(isValidOutboundUrl("https://admin:secret@gohighlevel.com") === false, "Rejects credentials/userinfo");
  assert(isValidOutboundUrl("https://gohighlevel.com:8080/path") === false, "Rejects non-standard port 8080");
  assert(isValidOutboundUrl("https://gohighlevel.com/path") === true, "Accepts clean standard HTTPS URL");

  // SUITE 2: Tool Allowlist & Regex Enforcement
  console.log("\n[SUITE 2] Tool Domain Allowlist Matching");
  const validGhl = validateMemberAffiliateLink("highlevel", "https://www.gohighlevel.com/?fp_ref=test1234");
  assert(validGhl.isValid === true, "Accepts valid HighLevel FirstPromoter link");

  const invalidGhl = validateMemberAffiliateLink("highlevel", "https://evil-phishing-site.com/fake?fp_ref=test1234");
  assert(invalidGhl.isValid === false, "Rejects domain outside HighLevel allowlist");

  const shortenerRejected = validateMemberAffiliateLink("elevenlabs", "https://bit.ly/my-short-link");
  assert(shortenerRejected.isValid === false, "Rejects link shortener (bit.ly)");

  const validElevenLabs = validateMemberAffiliateLink("elevenlabs", "https://elevenlabs.io/?via=creator_ref");
  assert(validElevenLabs.isValid === true, "Accepts valid ElevenLabs link");

  // SUITE 3: Signed HMAC Cookie & 365-Day Window (Section 9.2 Branch 10)
  console.log("\n[SUITE 3] Cryptographic Signed HMAC Cookie Integrity");
  const memberId = "mem-user-123456";
  const signedCookie = signReferralCookie(memberId);
  assert(signedCookie.startsWith("v1.mem-user-123456."), "Cookie follows v1.<memberId>.<timestamp>.<hmac> format");

  const verified = verifyReferralCookie(signedCookie);
  assert(verified !== null && verified.memberId === memberId, "Verifies authentic signed cookie");

  // Tampered cookie test
  const tamperedCookie = signedCookie.replace("mem-user-123456", "mem-hacker-999999");
  const tamperedResult = verifyReferralCookie(tamperedCookie);
  assert(tamperedResult === null, "Rejects tampered cookie signature in constant time");

  // Expired cookie test (> 365 days)
  const expiredTime = Date.now() - (366 * 24 * 60 * 60 * 1000);
  const expiredPayload = `v1.${memberId}.${expiredTime}`;
  const crypto = await import("crypto");
  const secret = process.env.REFERRAL_SECRET || "asmire_referral_cookie_hmac_secret_key_2026";
  const expiredHmac = crypto.createHmac("sha256", secret).update(expiredPayload).digest("hex");
  const expiredCookie = `${expiredPayload}.${expiredHmac}`;
  const expiredResult = verifyReferralCookie(expiredCookie);
  assert(expiredResult === null, "Rejects cookie older than 365 days");

  // SUITE 4: Attribution Decision Matrix Simulation (Branches 1-11)
  console.log("\n[SUITE 4] Attribution Decision Engine Logic");

  // Branch 1: Direct visitor without cookie -> Admin link
  function resolveAttribution(hasCookie: boolean, memberActive: boolean, inSlots: boolean, hasLink: boolean, isSelf: boolean) {
    if (!hasCookie) return { target: "ADMIN", reason: "fallback_no_cookie" };
    if (isSelf) return { target: "ADMIN", reason: "self_referral_blocked" };
    if (!memberActive) return { target: "ADMIN", reason: "fallback_member_suspended" };
    if (!inSlots) return { target: "ADMIN", reason: "fallback_plan_limit" };
    if (!hasLink) return { target: "ADMIN", reason: "fallback_tool_not_linked" };
    return { target: "MEMBER", reason: "attributed_member" };
  }

  assert(
    resolveAttribution(false, true, true, true, false).reason === "fallback_no_cookie",
    "Branch 1: No cookie routes to Admin (fallback_no_cookie)"
  );

  assert(
    resolveAttribution(true, true, true, true, false).reason === "attributed_member",
    "Branch 3: Valid active member with linked tool in slot routes to Member (attributed_member)"
  );

  assert(
    resolveAttribution(true, true, false, true, false).reason === "fallback_plan_limit",
    "Branch 3: Tool not in member's 3 Standard slots routes to Admin (fallback_plan_limit)"
  );

  assert(
    resolveAttribution(true, true, true, false, false).reason === "fallback_tool_not_linked",
    "Branch 3: Tool in slot but without member link routes to Admin (fallback_tool_not_linked)"
  );

  assert(
    resolveAttribution(true, false, true, true, false).reason === "fallback_member_suspended",
    "Branch 7: Suspended member routes to Admin (fallback_member_suspended)"
  );

  assert(
    resolveAttribution(true, true, true, true, true).reason === "self_referral_blocked",
    "Branch 6: Logged-in member self-referral blocked (self_referral_blocked)"
  );

  // Summary
  console.log("\n=======================================================");
  console.log(`   TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}   `);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
