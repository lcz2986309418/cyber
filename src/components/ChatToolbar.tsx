import React from 'react'
import { Button, Upload, Tooltip } from 'antd'
import { 
  SettingOutlined, 
  PictureOutlined,
  OrderedListOutlined
} from '@ant-design/icons'
import ModelSelector from './ModelSelector'

interface ChatToolbarProps {
  currentModel: string
  onModelChange: (model: string) => void
  onSettingsClick: () => void
  onImageUploadClick: () => void
}

const ChatToolbar: React.FC<ChatToolbarProps> = ({
  currentModel,
  onModelChange,
  onSettingsClick,
  onImageUploadClick
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-4">
        <Tooltip title="设置">
          <Button 
            type="text" 
            icon={<SettingOutlined />} 
            onClick={onSettingsClick}
          />
        </Tooltip>
        <Tooltip title="上传图片">
          <Button 
            type="text" 
            icon={<PictureOutlined />} 
            onClick={onImageUploadClick}
          />
        </Tooltip>
        <ModelSelector value={currentModel} onChange={onModelChange} />
      </div>
      <div className="text-xs text-gray-400">
        Enter发送 / Shift+Enter换行
      </div>
    </div>
  )
}

export default ChatToolbar 