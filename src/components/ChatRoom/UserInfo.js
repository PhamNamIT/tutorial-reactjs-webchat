import React, { useContext } from 'react';
import { auth } from '../../firebase/config';
import { Avatar, Button, Typography } from 'antd';
import { AuthContext } from '../../Context/AuthProvider';

const UserInfo = () => {
   const { user: {
      displayName,
      photoURL
   } } = useContext(AuthContext);

   return (
      <div className="userinfo">
         <div>
            <Avatar src={photoURL}>{photoURL ? '' : displayName.charAt(0).toUpperCase()}</Avatar>
            <Typography.Text className="username">{displayName}</Typography.Text>
         </div>
         <Button ghost onClick={() => auth.signOut()}>
            Đăng xuất
         </Button>
      </div>
   );
}

export default UserInfo;
