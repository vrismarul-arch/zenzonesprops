import React from 'react';
import { Card, Row, Col, Avatar, Typography } from 'antd';
import * as AntIcons from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// --- Data for Facility Cards ---
const facilitiesData = [
  {
    iconType: 'HomeOutlined',
    iconColor: '#5A67D8',
    title: 'Prime Location',
    description: 'Right in the heart of Perungudi. Close to schools, IT hubs, and hospitals. Easy to live in, easy to rent out.'
  },
  {
    iconType: 'RiseOutlined',
    iconColor: '#38A169',
    title: 'Vaastu Friendly',
    description: 'East-facing home built with vaastu in mind, so you step into positivity and peace every single day.'
  },
  {
    iconType: 'UpSquareOutlined',
    iconColor: '#3182CE',
    title: 'Lift Access',
    description: 'No more climbing stairs – the building has a lift for easy movement, future-proof for your family.'
  },
  {
    iconType: 'CompassOutlined',
    iconColor: '#DD6B20',
    title: 'Easy EMI Option',
    description: 'Don’t worry about paying the full amount. We’ll help you arrange EMIs that fit your budget.'
  },
  {
    iconType: 'SolutionOutlined',
    iconColor: '#5A67D8',
    title: 'Rental Assistance',
    description: 'We’ve got your back with up to 12 months of free rental support.'
  },
  {
    iconType: 'ShopOutlined',
    iconColor: '#3182CE',
    title: 'Property Management',
    description: 'From tenant search to day-to-day upkeep, we’ll handle the property management for you.'
  },
];

// --- Component ---
const FacilitiesData = () => {
  return (
    <div className="why-choose">
      <div
        style={{
          backgroundColor: '#fff7f7b9',
          minHeight: '100vh',
          padding: '48px 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="curent-container"
      >
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 className="curent-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Why Choose This Home
          </h2>

          <Row gutter={[32, 32]}>
            {facilitiesData.map((facility, index) => (
              <Col key={index} xs={24} sm={12} lg={8}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                    <Avatar
                      size={64}
                      icon={React.createElement(AntIcons[facility.iconType], {
                        style: { fontSize: '24px', color: facility.iconColor },
                      })}
                      style={{
                        backgroundColor: '#E9EAFB',
                        marginRight: '16px',
                        flexShrink: 0,
                      }}
                    />
                    <Title level={5} style={{ margin: 0, fontWeight: '600' }}>
                      {facility.title}
                    </Title>
                  </div>

                  {/* Card Body */}
                  <div
                    style={{
                      backgroundColor: '#F7FAFC',
                      borderRadius: '12px',
                      padding: '16px',
                      flexGrow: 1,
                    }}
                  >
                    <Paragraph style={{ margin: 0, color: '#4A5568' }}>
                      {facility.description}
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesData;
