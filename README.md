# @vaporcms/client-sdk-js

A JavaScript/TypeScript SDK to interact with the VaporCMS API. This SDK provides a convenient way to access and manage blog data, articles, categories, authors, and locales through the VaporCMS API.

## Table of Contents

- [@vaporcms/client-sdk-js](#vaporcmsclient-sdk-js)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Articles](#articles)
  - [Blog](#blog)
  - [Locales](#locales)
  - [Authors](#authors)
  - [Categories](#categories)
  - [Error Handling](#error-handling)
  - [License](#license)

## Installation

Install the SDK using npm or pnpm:

```bash
# Using npm
npm install @vaporcms/client-sdk-js

# Using pnpm
pnpm add @vaporcms/client-sdk-js

```

## Usage

**Authentication**
To use this SDK, you need to provide your API token (auth) and blogId when initializing the client. Here's how to get started:

```typescript
import { V0Client } from "@vaporcms/client-sdk-js";

const client = new V0Client({
  auth: "your-api-token",
  blogId: "your-blog-id",
});
```

## Articles

**Get article by slug.**
You can retrieve a localized article by its `slug`. Optionally, you can also provide a `localeCode` to fetch the content in a specific locale. If no `localeCode` is provided, the default locale will be used.

```typescript
const articleResponse = await client.articles.get({
  slug: "example-article",
  localeCode: "en", //Optional
});
if (articleResponse.ok) {
  console.log("Localized Article:", articleResponse.data);
} else {
  console.error("Error fetching article:", articleResponse.error);
}
```

**List articles**
To retrieve a list of articles, you can pass optional pagination options (page and pageSize) along with filtering options like categoryIds and authorIds.

```typescript
const articlesResponse = await client.articles.list({ page: 1, pageSize: 10 });
if (articlesResponse.ok) {
  console.log("Articles:", articlesResponse.data);
} else {
  console.error("Error fetching articles:", articlesResponse.error);
}
```

You can also filter the list by categories or authors:

```typescript
const articlesResponse = await client.articles.list({
  page: 1,
  pageSize: 10,
  categoryIds: ["category-1-id"],
  authorIds: ["author-1-id"],
});
if (articlesResponse.ok) {
  console.log("Filtered Articles:", articlesResponse.data);
} else {
  console.error("Error fetching filtered articles:", articlesResponse.error);
}
```

## Blog

Retrieve details about your blog using the blog.get() method:

```typescript
const blogResponse = await client.blog.get();
if (blogResponse.ok) {
  console.log("Blog Data:", blogResponse.data);
} else {
  console.error("Error fetching blog:", blogResponse.error);
}
```

## Locales

List all available locales for the blog using the locales.list() method:

```typescript
const localesResponse = await client.locales.list();
if (localesResponse.ok) {
  console.log("Locales:", localesResponse.data);
} else {
  console.error("Error fetching locales:", localesResponse.error);
}
```

## Authors

Retrieve a list of authors for your blog:

```typescript
const authorsResponse = await client.authors.list();
if (authorsResponse.ok) {
  console.log("Authors:", authorsResponse.data);
} else {
  console.error("Error fetching authors:", authorsResponse.error);
}
```

## Categories

Retrieve a list of categories for your blog:

```typescript
const categoriesResponse = await client.categories.list();
if (categoriesResponse.ok) {
  console.log("Categories:", categoriesResponse.data);
} else {
  console.error("Error fetching categories:", categoriesResponse.error);
}
```

## Error Handling

Each API call returns an object with the following structure:

- ok: true if the request was successful, false otherwise.
- data: Contains the response data when the request is successful.
- error: A string message describing the error if the request failed.

## License

This SDK is licensed under the MIT License. See the LICENSE file for more information.
