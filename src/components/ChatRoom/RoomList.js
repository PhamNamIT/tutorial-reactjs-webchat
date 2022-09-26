import React, { useContext } from 'react';
import { Button, Collapse, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const RoomList = () => {
   const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

   const handleAddRoom = () => {
      setIsAddRoomVisible(true);
   };

   return (
      <Collapse ghost defaultActiveKey={['1']}>
         <Panel header="Danh sách các phòng" key="1">
            {
               rooms.map((room) => (
                  <Typography.Link 
                     className="room"
                     key={room.id}
                     onClick={() => setSelectedRoomId(room.id)}
                  >
                     {room.name}
                  </Typography.Link>
               ))
            }
            <Button 
               type="text"
               icon={<PlusSquareOutlined />}
               className="add-room"
               onClick={handleAddRoom}
            >
               Thêm phòng
            </Button>
         </Panel>
      </Collapse>
   );
}

export default RoomList;
