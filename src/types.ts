export type Blog = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Locale = {
  id: string;
  blogId: string;
  name: string;
  code: string;
  default: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Media = {
  id: string;
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
  updatedAt: string;
};

export type TableOfContents = {
  id: string;
  text: string;
  level: number;
  subHeadings: TableOfContents[];
};

export type Content = {
  title: string;
  slug: string;
  excerpt: string;
  html: string;
};

export type Seo = {
  title: string;
  description: string;
  image: Media | null;
};

export type ArticleList = Array<{
  id: string;
  status: "Draft" | "Published";
  createdAt: string;
  updatedAt: string;
  localized: Record<
    string,
    {
      id: string;
      status: "Draft" | "Published";
      publishedAt: string | null;
      cover: Media | null;
      content: Content;
      tableOfContents?: TableOfContents[];
      seo: Seo;
      authors: Array<{
        id: string;
        name: string;
        slug: string;
        profile: string | null;
        createdAt: string;
        updatedAt: string;
      }>;
      categories: Array<{
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: string;
        updatedAt: string;
      }>;
    }
  >;
}>;

export type Article = {
  id: string;
  status: "Draft" | "Published";
  publishedAt: string | null;
  content: Content;
  tableOfContents: TableOfContents[];
  cover: Media | null;
  seo: Seo;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }>;
  authors: Array<{
    id: string;
    name: string;
    slug: string;
    profile: string;
    createdAt: string;
    updatedAt: string;
  }>;
  locales: string[];
  locale: string;
  createdAt: string;
  updatedAt: string;
};

export type Author = {
  id: string;
  name: string;
  slug: string;
  description: Record<string, string>;
  media: Record<string, Media>;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  localized: Record<
    string,
    {
      name: string;
      slug: string;
      description: string;
    }
  >;
  createdAt: string;
  updatedAt: string;
};

export type ApiResult<T> =
  | { ok: true; data: T; error?: never }
  | {
      ok: false;
      data?: never;
      error: {
        message: string;
        status: number;
      };
    };

export type ArticleBySlugInput = {
  slug: string;
  localeCode?: string;
};

export type ArticleListInput = {
  page?: number;
  pageSize?: number;
  categoryIds?: string[];
  authorIds?: string[];
};

export type BlogOutput = ApiResult<Blog>;
export type LocaleOutput = ApiResult<Locale[]>;
export type AuthorListOutput = ApiResult<Author[]>;
export type CategoryListOutput = ApiResult<Category>;
export type ArticleOutput = ApiResult<Article>;
export type ArticleListOutput = ApiResult<{
  articles: ArticleList;
  totalCount: number;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}>;
