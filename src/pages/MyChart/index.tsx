import { listMyChartByPageUsingPOST } from '@/services/BI/chartController';
import { useModel } from '@umijs/max';
import { Avatar, Card, message } from 'antd';
import Search from 'antd/es/input/Search';
import List from 'antd/lib/list';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 1,
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  const loadData = async () => {
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败' + e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入图表名称"
          enterButton
          onSearch={(value) => {
            //设置搜索条件
            setSearchParams({ ...initSearchParams, name: value });
          }}
        />
      </div>
      <div className="margin-16"></div>
      <List
        grid={{ gutter: 24 }}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
            setSearchParams({ ...searchParams, current: page });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      currentUser.userAvatar ??
                      'https://img1.baidu.com/it/u=3379946556,946410391&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                    }
                  />
                }
                title={item.name}
                description={item.chartType ? '图表类型' + item.chartType : undefined}
              />
              {'分析目标:' + item.goal}
              <ReactECharts option={JSON.parse(item.genChart ?? '{}')} />
            </Card>
          </List.Item>
        )}
      />
      总数:{total}
    </div>
  );
};
export default MyChartPage;
