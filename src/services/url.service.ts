import axiosInstance from "@/api/axios";

import { API_ENDPOINTS } from "@/constants/api";
import {
  type CreateUrlFormData,
} from "@/validation/url.schema";
import {
  CreateUrlRequest,
  CreateUrlResponse,
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

  getMyUrls: async (
    page = 1,
    limit = 3,
    search = ""
  ) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.URL.GET_ALL,
      {
        params: {
          page,
          limit,
          search,
        },
      }
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


  updateUrl: async (
    id: string,
    data: CreateUrlFormData
  ) => {
    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.URL.UPDATE}/${id}`,
      data
    );
  
    return response.data;
  },
};