import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { Linechart } from "./Linechart";
import { DownOutlined, LineChartOutlined } from "@ant-design/icons";

interface BtnProps {
  symbol: string;
  expiryDate: string;
  optionType: string;
  strikePrice: number;
}

const Btn = ({ symbol, expiryDate, optionType, strikePrice }: BtnProps) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>();

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button
          onClick={showLargeDrawer}
          style={{
            outline: "none",
            border: "none",
          }}
        >
          <LineChartOutlined />
        </Button>
      </Space>
      <Drawer
        closeIcon={false}
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
        <Linechart
          symbol={symbol}
          expiryDate={expiryDate}
          optionType={optionType}
          strikePrice={strikePrice}
        />
      </Drawer>
    </>
  );
};

export default Btn;
