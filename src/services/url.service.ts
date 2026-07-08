import axiosInstance from "@/api/axios";

import { API_ENDPOINTS } from "@/constants/api";

import {
  CreateUrlRequest,
  CreateUrlResponse,
  UrlItem
} from "@/types/url";

export const urlService = {
  create: async (
    data: CreateUrlRequest
  ): Promise<CreateUrlResponse> => {
    const response =
      await axiosInstance.post<CreateUrlResponse>(
        API_ENDPOINTS.URL.CREATE,
        data
      );

    return response.data;
  },

  getMyUrls: async (): Promise<UrlItem[]> => {
    const response =
      await axiosInstance.get<UrlItem[]>(
        API_ENDPOINTS.URL.GET_ALL
      );
  
    return response.data;
  },
  
  deleteUrl: async (
    id: string
  ): Promise<{ message: string }> => {
    const response =
      await axiosInstance.delete(
        `/url/${id}`
      );
  
    return response.data;
  },
};