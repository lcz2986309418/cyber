import React from 'react'
import { Modal, Form, Select, Switch, InputNumber, Button } from 'antd'

interface SettingsModalProps {
  visible: boolean
  onClose: () => void
  onSave: (values: SettingsValues) => void
  settings: SettingsValues
}

export interface SettingsValues {
  temperature: number
  maxTokens: number
  streamResponse: boolean
  model: string
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  onSave,
  settings
}) => {
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSave(values)
      onClose()
    })
  }

  return (
    <Modal
      title="对话设置"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          保存
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={settings}
      >
        <Form.Item
          label="模型"
          name="model"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="gpt-4o">GPT-4</Select.Option>
            <Select.Option value="gpt-3.5-turbo">GPT-3.5</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="温度"
          name="temperature"
          rules={[{ required: true }]}
          tooltip="较高的值会使输出更加随机，较低的值会使其更加集中和确定"
        >
          <InputNumber
            min={0}
            max={2}
            step={0.1}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="最大令牌数"
          name="maxTokens"
          rules={[{ required: true }]}
          tooltip="生成文本的最大长度"
        >
          <InputNumber
            min={1}
            max={4096}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="流式响应"
          name="streamResponse"
          valuePropName="checked"
          tooltip="启用打字机效果"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SettingsModal 