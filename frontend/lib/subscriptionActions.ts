// File: lib/subscription/actions.ts
import Cookies from "js-cookie";


const API_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_API_URL || "https://api.m3ntha.ch"
  : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5000";
const token = Cookies.get("token");

export async function startCheckout(planId: "standard" | "pro") {

  try {
    const res = await fetch(`${API_URL}/api/subscriptions/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan: planId }),
    });

    const data = await res.json();
    if (!res.ok || !data.success || !data.data) {
      throw new Error(data?.error?.message || "Checkout failed");
    }

    return data.data; // URL Stripe
  } catch (err) {
    console.error("Checkout error:", err);
    throw err;
  }
}
