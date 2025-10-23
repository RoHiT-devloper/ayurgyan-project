import { api } from './api';
import { Herb, SearchFilters, ApiResponse } from '../types/herb';

export const herbService = {
  async getAllHerbs(): Promise<Herb[]> {
    const response = await api.get<ApiResponse<Herb[]>>('/herbs');
    return response.data.data;
  },

  async getHerbById(id: number): Promise<Herb> {
    const response = await api.get<ApiResponse<Herb>>(`/herbs/${id}`);
    return response.data.data;
  },

  async searchHerbs(filters: SearchFilters): Promise<Herb[]> {
    const params = new URLSearchParams();
    if (filters.query) params.append('query', filters.query);
    if (filters.safetyLevel) params.append('safetyLevel', filters.safetyLevel);
    
    const response = await api.get<ApiResponse<Herb[]>>(`/herbs/search?${params}`);
    return response.data.data;
  },

  async getHerbsBySafetyLevel(safetyLevel: string): Promise<Herb[]> {
    const response = await api.get<ApiResponse<Herb[]>>(`/herbs/safety/${safetyLevel}`);
    return response.data.data;
  },

  async createHerb(herb: Partial<Herb>): Promise<Herb> {
    const response = await api.post<ApiResponse<Herb>>('/herbs', herb);
    return response.data.data;
  },

  async updateHerb(id: number, herb: Partial<Herb>): Promise<Herb> {
    const response = await api.put<ApiResponse<Herb>>(`/herbs/${id}`, herb);
    return response.data.data;
  },

  async deleteHerb(id: number): Promise<void> {
    await api.delete(`/herbs/${id}`);
  }
};