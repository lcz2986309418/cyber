import { create } from 'zustand'
import { Message, Conversation } from '@/types'
import { chatService } from '@/services/chat'

interface ChatState {
  conversations: Conversation[]
  currentConversation: Conversation | null
  currentModel: string
  loading: boolean
  setCurrentModel: (model: string) => void
  setCurrentConversation: (conversation: Conversation) => void
  addConversation: (conversation: Conversation) => void
  addMessage: (message: Message) => void
  deleteConversation: (id: number) => void
  createNewChat: () => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  currentModel: 'gpt-4o',
  loading: false,
  
  setCurrentModel: (model) => set({ currentModel: model }),
  
  setCurrentConversation: (conversation) => 
    set({ currentConversation: conversation }),
  
  addConversation: (conversation) => 
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      currentConversation: conversation
    })),
  
  addMessage: (message) =>
    set((state) => {
      if (!state.currentConversation) return state
      
      const updatedConversation = {
        ...state.currentConversation,
        messages: [...state.currentConversation.messages, message]
      }
      
      const updatedConversations = state.conversations.map(conv =>
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
      
      return {
        conversations: updatedConversations,
        currentConversation: updatedConversation
      }
    }),
  
  deleteConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter(conv => conv.id !== id),
      currentConversation: state.currentConversation?.id === id ? null : state.currentConversation
    })),

  // 创建新对话的方法
  createNewChat: async () => {
    try {
      set({ loading: true })
      const response = await chatService.createConversation()
      const newConversation = {
        ...response.data,
        messages: []
      }
      set((state) => ({
        conversations: [newConversation, ...state.conversations],
        currentConversation: newConversation,
        loading: false
      }))
      return newConversation
    } catch (error) {
      console.error('Failed to create new chat:', error)
      set({ loading: false })
      throw error
    }
  }
})) 