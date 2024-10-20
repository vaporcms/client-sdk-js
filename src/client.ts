import type {
  ArticleListOutput,
  AuthorListOutput,
  BlogOutput,
  CategoryListOutput,
  ArticleBySlugInput,
  ArticleListInput,
  LocaleOutput,
  ArticleOutput,
  ArticleMetadataListOutput,
  ArticleMetadataListInput,
} from "./types.js";
import fetch from "node-fetch";

class ApiError extends Error {
  public code: string;
  public status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export class V0Client {
  private auth: string;
  private blogId: string;
  private domain: string;
  private version: string;

  constructor(opts: { auth: string; blogId: string; domain?: string }) {
    if (!opts.auth || !opts.blogId) {
      throw new Error("Missing required options: {auth} and {blogId}");
    }

    this.auth = opts.auth;
    this.blogId = opts.blogId;
    this.version = "v0";
    this.domain = opts.domain || "https://api.vaporcms.com";
  }

  private async request(
    path: string,
    query: Record<string, any> = {}
  ): Promise<any> {
    const url = new URL(
      `${this.domain}/${this.version}/${this.blogId}/${path}`
    );

    if (!this.auth) throw new Error("Please provide the API token");

    const headers = new Headers({
      Authorization: `Bearer ${this.auth}`,
    });

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((val) =>
            url.searchParams.append(key, decodeURIComponent(val))
          );
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const errorJson: any = await response.json();
        const errorMessage = errorJson?.error?.message || "Unknown error";
        const errorCode = errorJson?.error?.code || "UNKNOWN_ERROR";
        throw new ApiError(
          `API call failed: ${errorMessage}`,
          errorCode,
          response.status
        );
      }

      const data = await response.json();
      return { ok: true, data: data };
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        (error.name === "FetchError" ||
          error.message.includes("Failed to fetch"))
      ) {
        return {
          ok: false,
          error: {
            message: `Network error: Could not connect to the server at ${url}`,
            status: 503,
          },
        };
      }

      if (error instanceof ApiError) {
        return {
          ok: false,
          error: {
            message: error.message,
            status: error.status,
          },
        };
      } else if (error instanceof Error) {
        return { ok: false, error: error.message, status: 500 };
      }

      return {
        ok: false,
        error: {
          message: `An unexpected issue occurred while trying to access ${url}.`,
          stats: 500,
        },
      };
    }
  }

  public readonly blog = {
    get: (): Promise<BlogOutput> => this.request("blog"),
  };

  public readonly locales = {
    list: (): Promise<LocaleOutput> => this.request("locales"),
  };

  public readonly authors = {
    list: (): Promise<AuthorListOutput> => this.request("authors"),
  };

  public readonly categories = {
    list: (): Promise<CategoryListOutput> => this.request("categories"),
  };

  public readonly articles = {
    get: (args: ArticleBySlugInput): Promise<ArticleOutput> =>
      this.request(`articles/${args.slug}`, args),

    list: (args: ArticleListInput): Promise<ArticleListOutput> =>
      this.request("articles", args),

    metadataList: (
      args: ArticleMetadataListInput
    ): Promise<ArticleMetadataListOutput> =>
      this.request("articles/metadata", args),
  };
}
