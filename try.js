const http = require("http");

const processedRequests = new Map();
let orderCount = 0;

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/orders") {
    res.writeHead(404);
    return res.end("Not found");
  }

  const key = req.headers["idempotency-key"];

  if (!key) {
    res.writeHead(400);
    return res.end("Idempotency-Key is required");
  }

  if (processedRequests.has(key)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Idempotency-Replayed": "true",
    });

    return res.end(JSON.stringify(processedRequests.get(key)));
  }

  const order = {
    orderId: ++orderCount,
    status: "created",
  };

  processedRequests.set(key, order);

  res.writeHead(201, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(order));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Idempotency demo listening on port 3000");
});
