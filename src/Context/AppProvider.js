import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext} from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
   const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
   const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
   const [selectedRoomId, setSelectedRoomId] = useState('');
   const { user: { uid } } = useContext(AuthContext);

   // Document room
   // {
   //    name: 'room name',
   //    description: 'mo ta',
   //    members: [uid1, uid2, ...]
   // }
   const roomsCondittion = useMemo(() => {
      return {
         fieldName: 'member',
         operator: 'array-contains',
         compareValue: uid
      };
   }, [uid]);

   const rooms = useFirestore('rooms', roomsCondittion);

   console.log({ rooms });

   const selectedRoom = useMemo(() => 
      rooms.find((room) => room.id === selectedRoomId) || {},
      [rooms, selectedRoomId]
   );

   const usersCondittion = useMemo(() => {
      return {
         fieldName: 'uid',
         operator: 'in',
         compareValue: selectedRoom.member
      };
   }, [selectedRoom.member]);

   const members = useFirestore('users', usersCondittion);

   return ( 
      <AppContext.Provider 
         value={{ 
            rooms,
            members,
            selectedRoom,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            isInviteMemberVisible,
            setIsInviteMemberVisible
         }}
      >
         {children}
      </AppContext.Provider>
    );
}

export default AppProvider;