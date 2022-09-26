import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

const AddRoomModal = () => {
   const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
   const { user: { uid } } = useContext(AuthContext);
   const [form] = Form.useForm();

   const handleOk = () => {
      console.log({ formData: form.getFieldValue() });
      addDocument('rooms', { ...form.getFieldValue(), member: [uid] });

      form.resetFields();

      setIsAddRoomVisible(false);
   }

   const handleCancel = () => {
      form.resetFields();

      setIsAddRoomVisible(false);
   }

   return (
      <div>
         <Modal
            title="Tạo phòng"
            open={isAddRoomVisible}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <Form form={form} layout="vertical">
               <Form.Item label="Tên phòng" name="name">
                  <Input placeholder="Nhập tên phòng"></Input>
               </Form.Item>
               <Form.Item label="Mô tả" name="description">
                  <Input.TextArea placeholder="Nhập mô tả"></Input.TextArea>
               </Form.Item>
            </Form>
         </Modal>
      </div>
   );
}

export default AddRoomModal;
