import { PageContainer } from '@ant-design/pro-components';
import { Card, theme } from 'antd';
import React from 'react';
import defaultSettings from '../../config/defaultSettings';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            defaultSettings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 小金智能BI
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            这是一个基于 Openai 的智能分析平台。
            您只需导入原始数据，并输入分析需求即可自动生成可视化的图表分析及其结论。
            您还可以查看分析的原始数据，当分析失败时可在我的图表手动重试。
            文件数据较大请使用批量分析以免等待时间过程影响您的体验。
            目前新注册用户可以免费调用10次（10积分，每次调用扣除1积分），当然您也可以通过签到获取更多积分。
            如需更多使用次数，请联系管理员：Forever031221
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div
              style={{
                backgroundColor: token.colorBgContainer,
                boxShadow: token.boxShadow,
                borderRadius: '8px',
                fontSize: '14px',
                color: token.colorTextSecondary,
                lineHeight: '22px',
                padding: '16px 19px',
                minWidth: '220px',
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    lineHeight: '22px',
                    backgroundSize: '100%',
                    textAlign: 'center',
                    padding: '8px 16px 16px 12px',
                    color: '#FFF',
                    fontWeight: 'bold',
                    backgroundImage:
                      "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
                  }}
                >
                  {1}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: token.colorText,
                    paddingBottom: 8,
                  }}
                >
                  {'相关技术'}
                </div>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: token.colorTextSecondary,
                  textAlign: 'justify',
                  lineHeight: '22px',
                  marginBottom: 8,
                  whiteSpace: 'normal',
                }}
              >
                <p>1、基于Spring Boot + AIGC + React的分析平台。</p>
                <p>2、基于RabbitMQ的消息队列实现Ai分析的并发执行、异步化与持久化。</p>
                <p>3、基于Guava的任务重试机制对分析过程失败的任务进行自动重试。</p>
                <p>4、利用Redis进行图表数据的分布式缓存提高图表数据的查询速度。</p>
                <p>5、基于Redission进行分布式限流预防恶意分析请求。</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
