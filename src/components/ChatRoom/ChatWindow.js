import React, { useContext, useMemo, useState } from 'react';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons/lib/icons';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
import Message from './Message';
import useFirestore from '../../hooks/useFirestore';

const ChatWindow = () => {
   const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
   const { user: { uid, photoURL, displayName } } = useContext(AuthContext)
   const [inputValue, setInputValue] = useState('');
   const [form] = Form.useForm();

   const handleInputChange = (e) => {
      setInputValue(e.target.value);
   };

   const handleOnSubmit = () => {
      addDocument('messages', {
         text: inputValue,
         uid,
         photoURL,
         roomId: selectedRoom.id,
         displayName
      });

      form.resetFields(['message']);
   };

   const condition = useMemo(() => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id
   }), [selectedRoom.id]);

   const messages = useFirestore('messages', condition);

   return (
      <div className="chatwindow">
         {
            selectedRoom.id ? (
               <>
                  <div className="chatwindow-header">
                     <div className="room_info">
                        <p className="room_name">{selectedRoom.name}</p>
                        <span className="room_description">{selectedRoom.description}</span>
                     </div>
                     <div className="users_info">
                        <Button 
                           icon={<UserAddOutlined />}
                           type="text"
                           onClick={() => setIsInviteMemberVisible(true)}
                        >
                           Mời
                        </Button>
                        <Avatar.Group size="small" maxCount={2}>
                           {
                              members.map(member => 
                                 <Tooltip title={member.displayName} key={member.id}>
                                    <Avatar src={member.photoURL}>
                                       {member.photoURL ? '' : member.displayName.charAt(0).toUpperCase()}
                                    </Avatar>
                                 </Tooltip>   
                              )
                           }
                        </Avatar.Group>
                     </div>
                  </div>
                  <div className="chatwindow-content">
                     <div className="message">
                        {
                           messages.map(mes => (
                              <Message
                                 key={mes.id}
                                 text={mes.text}
                                 displayName={mes.displayName}
                                 createAt={mes.createAt}
                                 photoURL={mes.photoURL ? '' : mes.displayName.charAt(0).toUpperCase()}
                              />
                           ))
                        }
                     </div>
                     <Form className="form_message" form={form}>
                        <Form.Item name="message">
                           <Input 
                              bordered={false}
                              autoComplete="off"
                              placeholder="Nhập tin nhắn..."
                              onChange={handleInputChange}
                              onPressEnter={handleOnSubmit}
                           />
                        </Form.Item>
                        <Button type="primary" onClick={handleOnSubmit}>Gửi</Button>
                     </Form>
                  </div>
               </>
            ) : <Alert 
                  message='Hãy chọn phòng'
                  type='info'
                  showIcon
                  style={{ margin: 5 }}
                  closable
               />
         }
         
      </div>
   );
}

export default ChatWindow;
