import React, { useEffect, useState } from 'react'
import './App.css'
// import { Dropdown, MenuProps, Space, Table, Tag } from 'antd'
// import { ColumnsType } from 'antd/es/table'
import { ConfigProvider, theme } from 'antd'
// import Btn from './components/Btn'
// import { DownOutlined, LineChartOutlined } from '@ant-design/icons'
// import { Line } from 'react-chartjs-2'
// import { implied_volatility } from './utils/test'
// import getDayDifference from './utils/ttm'
import Datatable from './components/Datatable'

function App() {
  return (
    <>
      <ConfigProvider
        theme={
          {
            algorithm: theme.darkAlgorithm,
          }
        }
      >
        {/* <Btn /> */}
        <div className="data-table">
        <Datatable />
        </div>
      </ConfigProvider>
    </>
  )
}

export default App
