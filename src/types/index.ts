export interface Message {
  id?: number
  role: 'user' | 'assistant'
  content: string
  model_name?: string
  created_at?: string
}

export interface Conversation {
  id: number
  title: string
  messages: Message[]
  created_at: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
} 