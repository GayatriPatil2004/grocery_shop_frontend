// src/shared/scripts/seedData.js
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import categories from '../../data/categories';
import products from '../../data/products';

/**
 * Script to seed Firestore with initial data from local JS files.
 * Run this from a temporary component or use a button in the UI during development.
 */
export const seedFirestore = async () => {
  console.log("Starting Firestore Seeding...");
  
  try {
    // 1. Check if already seeded to avoid duplicates
    const testQuery = query(collection(db, 'categories'), limit(1));
    const testSnapshot = await getDocs(testQuery);
    
    if (!testSnapshot.empty) {
      console.log("Firestore already contains data. Seeding skipped to prevent duplicates.");
      return { success: true, skipped: true };
    }

    // 2. Seed Categories
    console.log("Seeding Categories...");
    for (const category of categories) {
      const { id, ...catData } = category; // Remove id to let Firestore generate one or keep it?
      // For categories, keeping IDs might be useful for linking, but Firestore usually generates its own.
      // We'll use the 'id' from categories.js as a field.
      await addDoc(collection(db, 'categories'), {
        ...catData,
        originalId: id, // Keep reference if needed
      });
    }

    // 3. Seed Products
    console.log("Seeding Products...");
    for (const product of products) {
      const { id, ...prodData } = product;
      await addDoc(collection(db, 'products'), {
        ...prodData,
        originalId: id,
      });
    }

    console.log("Firestore Seeding Completed Successfully!");
    return { success: true };
  } catch (error) {
    console.error("Firestore Seeding Failed:", error);
    return { success: false, error: error.message };
  }
};
