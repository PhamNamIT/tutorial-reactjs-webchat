import React from 'react';
import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';

function formatDate(seconds) {
   let formattedDate = '';

   if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
   }

   return formattedDate;
}

const Message = ({text, displayName, createAt, photoURL}) => {
   return (
      <div className="message-box">
         <div>
            <Avatar src={photoURL} size="small">
               {photoURL ? '' : displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography.Text className="author">{displayName}</Typography.Text>
            <Typography.Text className="date">{formatDate(createAt && createAt.seconds)}</Typography.Text>
         </div>
         <div>
            <Typography.Text className="content">{text}</Typography.Text>
         </div>
      </div>
   );
}

export default Message;
