import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';


const Sidebar = () => {
   return (
      <Row className="sidebar">
         <Col span={24} className="col-userinfo">
            <UserInfo />
         </Col>
         <Col span={24} className="col-listroom">
            <RoomList />
         </Col>
      </Row>
   );
}

export default Sidebar;
