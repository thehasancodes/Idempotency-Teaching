# Idempotency Demo

Run:

```bash
node try.js
```

Send `POST /orders` with an `Idempotency-Key` header. Reusing the same key replays the original order.

```Shell
curl.exe -i -X POST http://localhost:3000/orders -H "Idempotency-Key: checkout-001"
```

Now change the key to `checkout-002` and send it again. You'll get a new order.
