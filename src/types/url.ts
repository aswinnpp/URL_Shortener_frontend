export interface CreateUrlRequest {
    name: string;
    originalUrl: string;
  }
  
  export interface CreateUrlResponse {
    id: string;
    name: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    shortUrl: string;
  }

  export interface UrlItem {
    id: string;
    name: string;
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
  }

  export interface Url {
    id: string;
    name: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
  }