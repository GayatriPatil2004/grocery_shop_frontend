// src/shared/services/firebaseService.js
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export const firebaseService = {
  async getAll(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Firestore getAll(${collectionName}) failed:`, error);
      return [];
    }
  },

  async add(collectionName, data) {
    return await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp()
    });
  },

  async update(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  },

  async getRecentOrders() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const ordersQuery = query(
      collection(db, "orders"),
      where("createdAt", ">=", oneMonthAgo),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(ordersQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};
