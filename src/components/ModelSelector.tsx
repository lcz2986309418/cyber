import React from 'react'
import { Select } from 'antd'

const { Option } = Select

interface ModelOption {
  value: string
  label: string
  description: string
}

const models: ModelOption[] = [
  { value: 'gpt-4o', label: 'GPT-4o', description: '最新的GPT-4模型' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5', description: '快速且经济的选择' },
  { value: 'claude-3', label: 'Claude 3', description: '强大的分析和创作能力' },
]

interface ModelSelectorProps {
  value?: string
  onChange?: (value: string) => void
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ width: 120 }}
      className="rounded-lg"
    >
      {models.map(model => (
        <Option key={model.value} value={model.value}>
          {model.label}
        </Option>
      ))}
    </Select>
  )
}

export default ModelSelector 