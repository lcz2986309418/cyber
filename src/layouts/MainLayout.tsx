import React from 'react';
import { Layout, Input, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import { 
  MessageOutlined, 
  FileTextOutlined, 
  CustomerServiceOutlined,
  FilePdfOutlined,
  AppstoreOutlined,
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const menuItems = [
    { icon: <MessageOutlined />, label: '对话', key: 'chat' },
    { icon: <FileTextOutlined />, label: '视频', key: 'video' },
    { icon: <CustomerServiceOutlined />, label: '音乐', key: 'music' },
    { icon: <FilePdfOutlined />, label: 'PDF', key: 'pdf' },
    { icon: <AppstoreOutlined />, label: '应用', key: 'apps' },
    { icon: <UserOutlined />, label: '我的', key: 'profile' },
  ];

  return (
    <Layout className="h-screen bg-[#f5f6f8]">
      <Sider 
        width={260} 
        className="bg-white border-r border-gray-100 shadow-sm overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="p-4">
          <div className="flex items-center mb-6">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              CyberMind π
            </span>
          </div>
          <div className="mb-4">
            <Input.Search
              placeholder="搜索对话"
              className="bg-white rounded-lg"
            />
          </div>
          <Button 
            type="primary" 
            block 
            className="mb-4 flex items-center justify-center gap-2 h-10 hover:scale-105 transition-transform"
            icon={<PlusOutlined />}
          >
            新对话
          </Button>
        </div>
        <div className="px-2 overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
          {menuItems.map(item => (
            <div
              key={item.key}
              className="flex items-center p-3 mb-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <span className="mr-3 text-lg text-gray-500">{item.icon}</span>
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </Sider>
      <Layout>
        <Content className="bg-[#f5f6f8]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 