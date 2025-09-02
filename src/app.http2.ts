import http2 from "http2";
import fs from "fs";
const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);
    //   res.writeHead(200, {
    //     "Content-Type": "text/html",
    //   });
    //   res.write(`<h1>URL ${req.url}</h1>`);
    //   res.end();
    //   const data = {
    //     name: "Breiner",
    //     age: 25,
    //     url: req.url,
    //   };
    //   res.writeHead(200, {
    //     "Content-Type": "application/json",
    //   });
    //   res.end(JSON.stringify(data));

    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(htmlFile);
      return;
    }
    if (req.url?.endsWith(".js")) {
      res.writeHead(200, {
        "Content-Type": "text/javascript",
      });
    } else if (req.url?.endsWith(".css")) {
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
    }
    try {
      const cssFile = fs.readFileSync(`./public${req.url}`, "utf-8");
      res.end(cssFile);
    } catch (error) {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end(`<h1>404 Not Found</h1>`);
    }
  }
);

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
