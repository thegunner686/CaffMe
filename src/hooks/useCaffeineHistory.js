import React, { useState, useEffect } from 'react';
import { db, auth } from '../utils/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  setDoc,
  doc,
  addDoc,
} from 'firebase/firestore';

const getToday = () => {
  const d = new Date();
  const today = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;
  return today;
};

const getHour = () => {
  const d = new Date();
  return d.getHours();
};

export const useCaffeineHistory = () => {
  if (auth.currentUser?.uid === null) return;

  const [history, setHistory] = useState([]);

  const fetch = async () => {
    const ref = collection(db, 'entries');
    let q = query(ref, where('user', '==', auth.currentUser.uid));
    q = query(q, where('date', '==', getToday()));
    try {
      let docs = await getDocs(q);

      let w = [];
      docs.forEach((doc) => {
        w.push(doc.data());
      });
      setHistory(w);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { history, refreshHistory: fetch };
};

export const addCaffeineEntry = async (entry) => {
  const docRef = await addDoc(collection(db, 'entries'), {
    ...entry,
    date: getToday(),
    hour: getHour(),
    user: auth.currentUser.uid,
  });
  return docRef.id;
};
