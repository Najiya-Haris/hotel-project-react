import React from 'react';
import { Avatar, Card } from 'antd';
import { useSelector } from "react-redux";

const { Meta } = Card;

const CommonProfileCard = () => {
  const userDetails = useSelector((state) => state.user.loginUserDetails);

  return (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title={userDetails.name} 
        description={userDetails.email} 
      />
    </Card>
  );
};

export default CommonProfileCard;
