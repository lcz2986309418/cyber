import React from 'react'
import { Input, Button } from 'antd'
import { SendOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons'

const Chat = () => {
  const [message, setMessage] = React.useState('')

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-100 p-4 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0">
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-800">新对话</span>
          <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">gpt-4o</span>
        </div>
        <div className="flex gap-2">
          <Button type="text" icon={<SettingOutlined />} />
          <Button type="text" icon={<DeleteOutlined />} />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-[#f5f6f8]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
            <div className="flex items-start">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">您好，我是CyberMind π，欢迎您来咨询任何问题！</p>
                <span className="text-xs text-gray-400 mt-1 block">2024-11-28 13:43:41</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-2">
            <Input.TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入消息..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="rounded-lg shadow-sm"
            />
            <Button 
              type="primary"
              icon={<SendOutlined />}
              className="shadow-sm hover:scale-105 transition-transform"
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
    </div>
  )
}

export default Chat 