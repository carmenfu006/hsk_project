// payment-success.js only applies to payment-success.html

// To clear all session storage when user successfully make payment.
clearInfoSession();

const payment_intent = new URL(location.href).searchParams.get('payment_intent');

// Prevent accessing payment success page when no payment_intent params exists in url.
if (!payment_intent) {
  window.location.href = window.location.origin;
}