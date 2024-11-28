import React, { useState } from 'react'
import { Layout, Input, Button, message } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { 
  MessageOutlined, 
  FileTextOutlined, 
  CustomerServiceOutlined,
  FilePdfOutlined,
  AppstoreOutlined,
  UserOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { useChatStore } from '@/stores/useChatStore'
import { chatService } from '@/services/chat'
import { Conversation } from '@/types'

const { Sider, Content } = Layout

// 定义侧边栏菜单项
const sideMenuItems = [
  { icon: <MessageOutlined />, label: '对话', key: 'chat' },
  { icon: <FileTextOutlined />, label: '绘画', key: 'draw' },
  { icon: <CustomerServiceOutlined />, label: '视频', key: 'video' },
  { icon: <FilePdfOutlined />, label: '音乐', key: 'music' },
  { icon: <AppstoreOutlined />, label: 'PPT', key: 'ppt' },
  { icon: <UserOutlined />, label: '应用', key: 'apps' },
]

const MainLayout = () => {
  const navigate = useNavigate()
  const { 
    conversations,
    currentConversation,
    setCurrentConversation,
    createNewChat,
    loading
  } = useChatStore()

  // 创建新对话
  const handleNewChat = async () => {
    try {
      await createNewChat()
      navigate('/chat')
    } catch (error) {
      message.error('创建对话失败')
    }
  }

  // 切换对话
  const handleSelectChat = (conversation: Conversation) => {
    setCurrentConversation(conversation)
    navigate('/chat')
  }

  return (
    <Layout className="h-screen">
      {/* 左侧功能菜单 */}
      <Sider 
        width={60} 
        className="bg-white border-r border-gray-100"
        style={{ height: '100vh' }}
      >
        <div className="flex flex-col items-center py-4">
          {sideMenuItems.map(item => (
            <div
              key={item.key}
              className="w-10 h-10 mb-2 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50 text-gray-600"
              onClick={() => navigate(`/${item.key}`)}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </Sider>

      {/* 历史对话列表 */}
      <Sider 
        width={200} 
        className="bg-white border-r border-gray-100"
        style={{ height: '100vh' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo和网站名称 */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-blue-600">
                CyberMind π
              </span>
            </div>
            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="搜索对话"
              className="rounded-lg bg-gray-50 mb-4"
            />
            <Button 
              type="primary" 
              block 
              className="flex items-center justify-center gap-2"
              icon={<PlusOutlined />}
              onClick={handleNewChat}
              loading={loading}
            >
              新对话
            </Button>
          </div>

          {/* 对话列表 */}
          <div className="flex-1 overflow-y-auto px-2 py-4">
            {conversations.map(chat => (
              <div
                key={chat.id}
                className={`flex flex-col p-3 mb-2 rounded-lg cursor-pointer transition-colors
                  ${currentConversation?.id === chat.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="text-gray-700 truncate">{chat.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(chat.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sider>

      {/* 主内容区域 */}
      <Layout>
        <Content className="bg-[#f8fafc]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout 