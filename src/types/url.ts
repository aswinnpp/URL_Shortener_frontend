export interface CreateUrlRequest {
    originalUrl: string;
  }
  
  export interface CreateUrlResponse {
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    shortUrl: string;
  }
  export interface UrlItem {
    id: string;
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
  }