import React from 'react'
import { Modal, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'

interface ImageUploaderProps {
  visible: boolean
  onClose: () => void
  onUpload: (imageUrl: string) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  visible,
  onClose,
  onUpload
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([])
  const [uploading, setUploading] = React.useState(false)

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('只能上传图片文件！')
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('图片必须小于5MB！')
    }
    return isImage && isLt5M
  }

  const handleUpload = async () => {
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append('images[]', file as RcFile)
    })

    setUploading(true)

    try {
      // 这里替换为实际的上传API
      const response = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      
      if (data.url) {
        onUpload(data.url)
        message.success('上传成功！')
        onClose()
      }
    } catch (error) {
      message.error('上传失败！')
    } finally {
      setUploading(false)
      setFileList([])
    }
  }

  const uploadProps: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      if (beforeUpload(file)) {
        setFileList([...fileList, file])
      }
      return false
    },
    fileList,
  }

  return (
    <Modal
      title="上传图片"
      open={visible}
      onCancel={onClose}
      okText="上传"
      cancelText="取消"
      onOk={handleUpload}
      okButtonProps={{ loading: uploading }}
    >
      <Upload
        listType="picture-card"
        maxCount={1}
        {...uploadProps}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传图片</div>
          </div>
        )}
      </Upload>
      <div className="text-gray-500 text-sm mt-2">
        支持jpg、png格式，大小不超过5MB
      </div>
    </Modal>
  )
}

export default ImageUploader 