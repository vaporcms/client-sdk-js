import { test } from "node:test";
import assert from "node:assert";
import { V0Client } from "./client.js";

const config = {
  auth: process.env.AUTH,
  blogId: process.env.BLOG_ID,
};

const client = new V0Client({
  auth: config.auth!,
  blogId: config.blogId!,
  domain: "http://localhost:8080",
});

test("Should retrieve real blog data from VaporCMS API", async () => {
  const result = await client.blog.get();
  assert.equal(result.ok, true);
  assert.equal(result.data?.id, config.blogId);
});

test("Should retrieve an article by slug from VaporCMS API", async () => {
  const result = await client.articles.get({ slug: "first-article" });

  assert.equal(result.ok, true);
  assert.equal(result.data?.content.slug, "first-article");
});

test("Should retrieve a list of articles from VaporCMS API", async () => {
  const result = await client.articles.list({ page: 1, pageSize: 10 });
  assert.strictEqual(result.ok, true);
  assert.ok(Array.isArray(result.data.articles));
});
