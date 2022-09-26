import React, { useContext, useMemo, useState } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../../Context/AppProvider';
// import { AuthContext } from '../../Context/AuthProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
   const [fetching, setFetching] = useState(false);
   const [options, setOptions] = useState([]);

   const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
         setOptions([]);
         setFetching(true);

         fetchOptions(value, props.curMembers).then((newOptions) => {
            setOptions(newOptions);
            setFetching(false);
         });
      };

      return debounce(loadOptions, debounceTimeout);
   }, [fetchOptions, debounceTimeout]);

   return (
      <Select
         labelInValue
         filterOption={false}
         onSearch={debounceFetcher}
         notFoundContent={ fetching ? <Spin size="small" /> : null}
         {...props}
      >
         {
            options.map(opt => (
               <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                  <Avatar src={opt.photoURL} size="small">
                     {opt.photoURL ? '' : opt.label.charAt(0).toUpperCase()}
                  </Avatar>
                  {`${opt.label}`}
               </Select.Option>   
            ))
         }
      </Select>
   )
}

async function fetchUserList(search, curMembers) {
   return db
      .collection('users')
      .where('keywords', 'array-contains', search)
      .orderBy('displayName')
      .limit(20)
      .get()
      .then(snapshot => {
         return snapshot.docs.map(doc => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURl
         })).filter(opt => !curMembers.includes(opt.value));
      });
}

const InviteMemberModal = () => {
   const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
   // const { user: { uid } } = useContext(AuthContext);
   const [form] = Form.useForm();
   const [value, setValue] = useState([]);

   const handleOk = () => {
      form.resetFields();

      const roomRef = db.collection('rooms').doc(selectedRoomId);
      roomRef.update({
         member: [ ...selectedRoom.member, ...value.map(val => val.value)],
      })

      setIsInviteMemberVisible(false);
   }

   const handleCancel = () => {
      form.resetFields();

      setIsInviteMemberVisible(false);
   }

   return (
      <div>
         <Modal
            title="Thêm thành viên"
            open={isInviteMemberVisible}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <Form form={form} layout="vertical">
               <DebounceSelect
                  mode="multiple"
                  title="Tên các thành viên"
                  value={value}
                  placeholder="Nhập tên thành viên"
                  fetchOptions={fetchUserList}
                  curMembers={selectedRoom.member}
                  onChange={newValue => setValue(newValue)}
                  style={{ width: '100%' }}
               />
            </Form>
         </Modal>
      </div>
   );
}

export default InviteMemberModal;
