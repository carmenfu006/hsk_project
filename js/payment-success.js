clearInfoSession();

const payment_intent = new URL(location.href).searchParams.get('payment_intent');

if (!payment_intent) {
  window.location.href = window.location.origin;
}