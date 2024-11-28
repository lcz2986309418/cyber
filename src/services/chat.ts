import api from './api'
import { Message, Conversation, ApiResponse } from '@/types'

export const chatService = {
  // 创建新对话
  createConversation: async (): Promise<ApiResponse<Conversation>> => {
    const response = await api.post<ApiResponse<Conversation>>('/api/v1/chat/conversations')
    return response.data
  },

  // 发送消息
  sendMessage: async (
    conversationId: number, 
    content: string, 
    model: string = 'gpt-4o'
  ): Promise<ApiResponse<Message>> => {
    const response = await api.post<ApiResponse<Message>>(
      `/api/v1/chat/conversations/${conversationId}/messages`,
      { content, model }
    )
    return response.data
  },

  // 获取对话历史
  getMessages: async (conversationId: number): Promise<ApiResponse<Message[]>> => {
    const response = await api.get<ApiResponse<Message[]>>(
      `/api/v1/chat/conversations/${conversationId}/messages`
    )
    return response.data
  }
}

export type { Message, Conversation } 