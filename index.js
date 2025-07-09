// index.js
import express from "express";
import Parser from "rss-parser";

const app = express();
const parser = new Parser();

app.get("/rss", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "url param required" });
  const feed = await parser.parseURL(url);
  res.json(feed.items.slice(0, 20).map(({ title, link, isoDate }) => ({
    title, link, isoDate
  })));
});

app.listen(3000, () => {
  console.log("RSS API running on port 3000");
});
