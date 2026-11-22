/**
 * Asmire PayPal v2 Orders & Checkout Service
 * Supports Sandbox and Live environments
 */

export function getPaypalConfig() {
  const mode = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    process.env.PAYPAL_CLIENT_ID ||
    "BAAOVsab586blJV_Z-RRQbzQwQpcoU2hS1fWcmGN0HLkvvxsodTt3TV6WwlLheX1o2dpu74YDIYg6Uy8Z0";
  const clientSecret =
    process.env.PAYPAL_CLIENT_SECRET ||
    "ELXWNLNmi-hlXBbsvp6GxCmbrytDIANaBfhGyNpx77l203drYNLo4zjBhzbWMQGyTfjM0nHGOS-IBUM4";
  const baseUrl = mode === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

  return { mode, clientId, clientSecret, baseUrl };
}

/**
 * Exchange Client ID & Secret for an OAuth2 Bearer Access Token
 */
export async function getPaypalAccessToken(): Promise<string> {
  const { clientId, clientSecret, baseUrl } = getPaypalConfig();

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials (CLIENT_ID or CLIENT_SECRET)");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to acquire PayPal access token (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.access_token;
}

/**
 * Create a new PayPal Checkout Order v2
 */
export async function createPaypalOrder({
  userId,
  orderCode,
  amountUsd = 29.0,
}: {
  userId: string;
  orderCode: string;
  amountUsd?: number;
}): Promise<{ id: string; status: string }> {
  const token = await getPaypalAccessToken();
  const { baseUrl } = getPaypalConfig();

  const formattedAmount = amountUsd.toFixed(2);

  const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderCode,
          custom_id: userId,
          description: "Asmire Pro Membership (30-Day Cycle)",
          amount: {
            currency_code: "USD",
            value: formattedAmount,
          },
        },
      ],
      application_context: {
        brand_name: "Asmire AI",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PayPal create order failed (${res.status}): ${errText}`);
  }

  return await res.json();
}

/**
 * Capture an approved PayPal order
 */
export async function capturePaypalOrder(orderId: string): Promise<any> {
  const token = await getPaypalAccessToken();
  const { baseUrl } = getPaypalConfig();

  const res = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PayPal capture failed (${res.status}): ${errText}`);
  }

  return await res.json();
}
