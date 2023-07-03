import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showLargeDrawer}>
          Chart
        </Button>
      </Space>
      <Drawer
        title={`${size} Market Chart`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <h1>CHART HERE</h1>
      </Drawer>
    </>
  );
};

export default App;