# Creating a Server in Node.js

There are two ways to create a server in Node.js:

1. **Using the built-in `http` module** (the "normal approach").
2. **Using the `Express` framework** (a more advanced and flexible approach).

Below, both methods are explained in detail.

---

## 1. Normal Approach (Using `http` Module)

This approach uses Node.js's built-in `http` module to create a server.

### Code Example:

```javascript
const http = require("http");

// Create a server
const server = http.createServer((req, res) => {
    res.write("Second time server is running");
    res.end();
});

// Start the server on port 7424
server.listen(7424, () => {
    console.log("Server is running on http://localhost:7424");
});
```

### Explanation:

1. **`http.createServer`**: Creates an HTTP server and takes a callback function that handles incoming requests (`req`) and sends responses (`res`).
2. **`res.write`**: Writes a response to the client.
3. **`res.end`**: Signals that the response is complete.
4. **`server.listen`**: Starts the server on the specified port (`7424`).
5. **Callback in `server.listen`**: Logs a message when the server starts.

### Run the Server:

1. Save the file as `server.js`.
2. Run the file using Node.js:
   ```bash
   node server.js
   ```
3. Open your browser and navigate to `http://localhost:7424`. You should see:
   ```
   Second time server is running
   ```

---

## 2. Using Express Framework

Express is a popular Node.js framework that simplifies server creation and routing.

### Steps:

1. Install Express:
   ```bash
   npm install express
   ```

2. Create the server using Express.

### Code Example:

```javascript
const express = require("express");

// Create an Express app
const app = express();

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    res.send("Server is running with Express!");
});

// Start the server on port 7424
app.listen(7424, () => {
    console.log("Express server is running on http://localhost:7424");
});
```

### Explanation:

1. **`express()`**: Creates an Express application.
2. **`app.get`**: Defines a route for HTTP GET requests to the root URL (`/`).
3. **`res.send`**: Sends a response to the client.
4. **`app.listen`**: Starts the server on the specified port (`7424`).
5. **Callback in `app.listen`**: Logs a message when the server starts.

### Run the Server:

1. Save the file as `express_server.js`.
2. Run the file using Node.js:
   ```bash
   node express_server.js
   ```
3. Open your browser and navigate to `http://localhost:7424`. You should see:
   ```
   Server is running with Express!
   ```

---

## Key Differences Between the Two Approaches

| Feature                | `http` Module (Normal Approach)       | Express Framework                  |
|------------------------|---------------------------------------|------------------------------------|
| **Ease of Use**         | Low-level, more code required         | High-level, less code required    |
| **Routing**             | Manual handling of routes             | Built-in routing support          |
| **Middleware**          | Not available                        | Built-in middleware support       |
| **Flexibility**         | Full control over everything          | Abstraction for easier development|
| **Use Case**            | Simple servers or custom requirements| Complex applications              |

---

## Which Should You Use?

- Use the **`http` module** if:
  - You need full control over the server.
  - You're building a very simple server.
  - You want to avoid external dependencies.

- Use **Express** if:
  - You're building a more complex application.
  - You need routing, middleware, or other advanced features.
  - You want to write less code and follow best practices.

---

## Example: Combining Both Approaches

You can also use the `http` module with Express if needed:

```javascript
const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Combining http and Express!");
});

const server = http.createServer(app);

server.listen(7424, () => {
    console.log("Server is running on http://localhost:7424");
});
```

This approach is useful if you need to integrate Express with other `http`-based functionality.

---