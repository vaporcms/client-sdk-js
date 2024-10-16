export type Media = {
  id: string;
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
  updatedAt: string;
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
      cover: Media;
      tableOfContents?: any[];
      content: {
        title: string;
        slug: string;
        excerpt: string;
        html: string;
      };
      seo: {
        title: string;
        description: string;
        image: Media | null;
      };
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

export type ApiResult<T> =
  | { ok: true; data: T; error?: never }
  | { ok: false; data?: never; error: string };

// INPUTS
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

// OUTPUTS
export type BlogOutput = ApiResult<{
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}>;

export type LocaleOutput = ApiResult<
  Array<{
    id: string;
    blogId: string;
    name: string;
    code: string;
    default: boolean;
    createdAt: string;
    updatedAt: string;
  }>
>;

export type ArticleListOutput = ApiResult<{
  articles: ArticleList;
  totalCount: number;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}>;

export type LocalizedArticleOutput = ApiResult<{
  id: string;
  status: "Draft" | "Published";
  publishedAt: string | null;
  content: {
    title: string;
    slug: string;
    excerpt: string;
    html: string;
  };
  tableOfContents: any[];
  seo: {
    title: string;
    description: string;
    image: {
      id: string;
      url: string;
      alt: string | null;
      width: number | null;
      height: number | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  };
  cover: {
    id: string;
    url: string;
    alt: string | null;
    width: number | null;
    height: number | null;
    createdAt: string;
    updatedAt: string;
  };
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
}>;

export type AuthorListOutput = ApiResult<
  Array<{
    id: string;
    name: string;
    slug: string;
    description: Record<string, string>;
    media: Record<string, Media>;
    createdAt: string;
    updatedAt: string;
  }>
>;

export type CategoryListOutput = ApiResult<
  Array<{
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
  }>
>;
