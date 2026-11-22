import { getPaypalConfig, getPaypalAccessToken, createPaypalOrder } from "../src/services/paypal";

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

async function runTests() {
  console.log("=======================================================");
  console.log("       ASMIRE PAYPAL BILLING TEST SUITE                ");
  console.log("=======================================================\n");

  // SUITE 1: Configuration & Credentials Check
  console.log("[SUITE 1] PayPal Configuration & Environment Setup");
  const config = getPaypalConfig();
  assert("PayPal client ID is loaded and non-empty", !!config.clientId && config.clientId.length > 20);
  assert("PayPal client secret is loaded and non-empty", !!config.clientSecret && config.clientSecret.length > 20);
  assert("PayPal base URL points to sandbox or live", config.baseUrl.includes("paypal.com"));

  // SUITE 2: OAuth2 Bearer Token Exchange
  console.log("\n[SUITE 2] PayPal OAuth2 Token Exchange");
  try {
    const token = await getPaypalAccessToken();
    assert("Successfully received OAuth2 access token from PayPal", !!token && token.length > 10);
  } catch (err: any) {
    assert(`PayPal token acquisition failed: ${err.message}`, false);
  }

  // SUITE 3: Order Creation API
  console.log("\n[SUITE 3] PayPal Orders v2 Initialization");
  try {
    const dummyUserId = "11111111-2222-3333-4444-555555555555";
    const dummyOrderCode = "ASMTEST1";
    const order = await createPaypalOrder({
      userId: dummyUserId,
      orderCode: dummyOrderCode,
      amountUsd: 29.0,
    });
    assert("PayPal Order ID is returned", !!order.id && typeof order.id === "string");
    assert("PayPal Order status is CREATED", order.status === "CREATED");
  } catch (err: any) {
    assert(`PayPal order creation failed: ${err.message}`, false);
  }

  console.log("\n=======================================================");
  console.log(`   TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
  console.log("=======================================================\n");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
