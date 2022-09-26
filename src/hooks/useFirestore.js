import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collection, condittion) => {
   const [documents, setDocuments] = useState([]);

   useEffect(() => {
      let collectionRef = db.collection(collection).orderBy('createAt');
      
      // condittion
      // {
      //    fieldName: 'abc',
      //    operator: '==',
      //    compareValue: 'abc'
      // }
      if (condittion) {
         if (!condittion.compareValue || !condittion.compareValue.length) {
            return;
         }

         collectionRef = collectionRef.where(
            condittion.fieldName,
            condittion.operator,
            condittion.compareValue
         );
      }

      const unsubscribe = collectionRef.onSnapshot((snapshot) => {
         const documents = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
         }));

         setDocuments(documents);
      });
      
      return unsubscribe;
   }, [collection, condittion]);

   return documents;
}

export default useFirestore;