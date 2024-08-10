import {genChartByAiUsingPOST, } from '@/services/xjbi/chartController';
import React, { useState} from 'react';
import {Button, Form, Input, message, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons";
import ReactECharts from 'echarts-for-react';
/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  const options = {
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
  const [chart, setChart] = useState<API.BiResponse>();
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    //对接后端,上传数据
    const params ={
      ...values,
      file:undefined
    }
    try{
      const res=await genChartByAiUsingPOST(params,{}, values.fileobj.file.originFileObj)
      if(!res?.data){
        message.error("分析失败")
      }else{
        message.success("分析成功")
      }
    }catch (e:any){
      message.error("分析失败" + e.message)
    }
  };
  return (
    <div className="add-chart">
      <Form
        name="addChart"
        onFinish={onFinish}
        initialValues={{}}
        // style={{ maxWidth: 600 }}
      >
        <Form.Item name="goal" label="分析目标" rules={[{ required: true, message: '请输入分析目标' }]}>
          <TextArea placeholder="请输入你的分析诉求,比如:分析网站用户的增长情况" />
        </Form.Item>
        <Form.Item name="name" label="图表名称">
          <Input placeholder="请输入图表名称" />
        </Form.Item>

        <Form.Item
          name="chartType"
          label="图表类型"
        >
          <Select options={[
            {value:'折线图',label:'折线图'},
            {value:'柱形图',label:'柱形图'},
            {value:'堆叠图',label:'堆叠图'},
            {value:'饼图',label:'饼图'},
            {value:'雷达图',label:'雷达图'}
          ]} placeholder="请选择图表类型"
          />
        </Form.Item>


        <Form.Item
          name="fileobj"
          label="原始数据"
        >
          <Upload name="file">
            <Button icon={<UploadOutlined />}>上传csv文件</Button>
          </Upload>
        </Form.Item>


        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>
      <div>
        分析结论:{chart?.genResult}
        生成图表:
        return <ReactECharts option={options} />;
      </div>
    </div>
  );
};
export default AddChart;
