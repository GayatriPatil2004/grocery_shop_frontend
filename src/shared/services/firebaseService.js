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
import categories from '../../data/categories';
import products from '../../data/products';

/**
 * Generic service for Firestore operations with fallback to local data if needed.
 */
export const firebaseService = {
  /**
   * Fetch all documents from a collection
   */
  async getAll(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // If Firestore returns nothing and it's categories/products, fallback to local for initial load
      if (data.length === 0) {
        if (collectionName === 'categories') return categories;
        if (collectionName === 'products') return products;
      }
      
      return data;
    } catch (error) {
      console.warn(`Firestore getAll(${collectionName}) failed, using local fallback:`, error);
      if (collectionName === 'categories') return categories;
      if (collectionName === 'products') return products;
      return [];
    }
  },

  /**
   * Add a new document
   */
  async add(collectionName, data) {
    return await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp()
    });
  },

  /**
   * Update an existing document
   */
  async update(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  /**
   * Delete a document
   */
  async delete(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  },

  /**
   * Query orders from the last month
   */
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
