import { genChartByAiUsingPOST } from '@/services/BI/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';
/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  // 图表状态，是否有图表结果
  const [chart, setChart] = useState<API.BiResponse>();
  // 提交状态，是否有正在提交
  const [submitting, setSubmitting] = useState<boolean>(false);
  // json解析状态，是否解析成功
  const [option, setOption] = useState<any>();

  const resultPg =
    'Pg: 通过折线图的形式，展示了一周（从周一到周日）内某种统计量的变化趋势。图表布局合理，数据清晰，通过平滑的曲线展示了数据的起伏变化，特别是周末数据的高点，可能暗示了周末活动的特殊性或重要性。此外，通过提示框的设置，用户可以方便地获取到图表上任意位置的具体数据，增强了图表的实用性和用户体验。';
  const optionPg = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    //避免重复提交
    if (submitting) return;
    setSubmitting(true);
    setChart(undefined);
    setOption(undefined);
    //对接后端,上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiUsingPOST(params, {}, values.fileobj.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res?.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
    }
    setSubmitting(false);
  };
  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能分析">
            <Form
              name="addChart"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              labelAlign="right"
              onFinish={onFinish}
              initialValues={{}}
              // style={{ maxWidth: 600 }}
            >
              <Form.Item
                name="goal"
                label="分析目标"
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <TextArea placeholder="请输入你的分析诉求,比如:分析网站用户的增长情况" />
              </Form.Item>
              <Form.Item name="name" label="图表名称">
                <Input placeholder="请输入图表名称" />
              </Form.Item>

              <Form.Item name="chartType" label="图表类型">
                <Select
                  options={[
                    { value: '折线图', label: '折线图' },
                    { value: '柱形图', label: '柱形图' },
                    { value: '堆叠图', label: '堆叠图' },
                    { value: '饼图', label: '饼图' },
                    { value: '雷达图', label: '雷达图' },
                  ]}
                  placeholder="请选择图表类型"
                />
              </Form.Item>

              <Form.Item name="fileobj" label="原始数据">
                <Upload name="file">
                  <Button icon={<UploadOutlined />}>上传csv文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="分析结论">
            {chart?.genResult !== undefined ? chart?.genResult : <p>{resultPg}</p>}
            <Spin spinning={submitting}></Spin>
          </Card>
          <Divider type="vertical" />
          <Card title="可视化图表">
            {<ReactECharts option={option} /> && <ReactECharts option={optionPg} />}
            <Spin spinning={submitting}></Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
