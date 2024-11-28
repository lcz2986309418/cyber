import React, { useState, useRef, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import { SendOutlined, SettingOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { chatService } from '@/services/chat'
import { useChatStore } from '@/stores/useChatStore'
import ChatToolbar from '@/components/ChatToolbar'
import SettingsModal, { SettingsValues } from '@/components/SettingsModal'
import ImageUploader from '@/components/ImageUploader'

const Chat = () => {
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [imageUploaderVisible, setImageUploaderVisible] = useState(false)
  const [settings, setSettings] = useState<SettingsValues>({
    temperature: 0.7,
    maxTokens: 2048,
    streamResponse: true,
    model: 'gpt-4o'
  })
  
  const {
    currentConversation,
    currentModel,
    setCurrentModel,
    addMessage,
    handleNewChat
  } = useChatStore()

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  // 发送消息
  const handleSend = async () => {
    if (!inputMessage.trim() || !currentConversation?.id || loading) return

    const userMessage = {
      role: 'user',
      content: inputMessage,
      created_at: new Date().toISOString()
    }

    try {
      setLoading(true)
      addMessage(userMessage)
      setInputMessage('')

      const response = await chatService.sendMessage(
        currentConversation.id,
        inputMessage,
        currentModel
      )
      
      addMessage(response.data)
    } catch (error) {
      message.error('发送消息失败')
    } finally {
      setLoading(false)
    }
  }

  // 处理按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 处理设置保存
  const handleSettingsSave = (values: SettingsValues) => {
    setSettings(values)
    setCurrentModel(values.model)
  }

  // 处理图片上传
  const handleImageUpload = (imageUrl: string) => {
    // 将图片URL插入到输入框
    setInputMessage(prev => prev + `\n![image](${imageUrl})\n`)
  }

  // 如果没有当前对话，显示欢迎界面
  if (!currentConversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">欢迎使用 CyberMind π</h2>
          <p className="text-gray-500">开始一段新的对话，探索无限可能</p>
        </div>
        <Button 
          type="primary" 
          size="large"
          icon={<PlusOutlined />}
          onClick={handleNewChat}
          className="px-8"
        >
          新对话
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* 顶部标题栏 */}
      <div className="border-b border-gray-100 p-4 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-800">新对话</span>
          <span className="ml-2 text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-full">gpt-4o</span>
        </div>
        <div className="flex gap-2">
          <Button type="text" icon={<SettingOutlined />} className="hover:bg-gray-50 transition-colors" />
          <Button type="text" icon={<DeleteOutlined />} className="hover:bg-gray-50 transition-colors" />
        </div>
      </div>
      
      {/* 消息区域 */}
      <div className="flex-1 overflow-auto p-4 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          {currentConversation.messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.role} fade-in`}>
              <div className="flex items-start">
                {msg.role === 'assistant' && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                )}
                <div>
                  <p className="text-gray-700">{msg.content}</p>
                  {msg.created_at && (
                    <span className="text-xs text-gray-400 mt-1 block">{msg.created_at}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 底部工具栏和输入区域 */}
      <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <ChatToolbar
          currentModel={currentModel}
          onModelChange={setCurrentModel}
          onSettingsClick={() => setSettingsVisible(true)}
          onImageUploadClick={() => setImageUploaderVisible(true)}
        />
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-2">
            <Input.TextArea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="message-input"
              disabled={loading}
            />
            <Button 
              type="primary"
              icon={<SendOutlined />}
              className="shadow-sm hover:scale-105 transition-all duration-200"
              onClick={handleSend}
              loading={loading}
            >
              发送
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span className="hover:text-gray-500 cursor-pointer transition-colors">配置</span>
              <span className="hover:text-gray-500 cursor-pointer transition-colors">列表</span>
              <span className="hover:text-gray-500 cursor-pointer transition-colors">gpt-4o</span>
              <span className="hover:text-gray-500 cursor-pointer transition-colors">图像</span>
            </div>
            <div>
              Enter发送 / Shift+Enter换行
            </div>
          </div>
        </div>
      </div>

      {/* 模态框 */}
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onSave={handleSettingsSave}
        settings={settings}
      />

      <ImageUploader
        visible={imageUploaderVisible}
        onClose={() => setImageUploaderVisible(false)}
        onUpload={handleImageUpload}
      />
    </div>
  )
}

export default Chat 