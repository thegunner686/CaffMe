import React, { useState, useEffect, useCallback } from 'react';
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
  updateDoc,
} from 'firebase/firestore';

export const getToday = (d) => {
  if (d === undefined) {
    d = new Date();
  }
  const today = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;
  return today;
};

export const getHour = (d) => {
  if (d === undefined) {
    d = new Date();
  }
  return d.getHours();
};

export const getMinutes = (d) => {
  if (d === undefined) {
    d = new Date();
  }
  return d.getMinutes().toString().padStart(2, '0');
};

export const useCaffeineHistory = (date) => {
  if (auth.currentUser?.uid === null) return;

  const [history, setHistory] = useState([]);

  const fetch = useCallback(async () => {
    const ref = collection(db, 'entries');
    let q = query(ref, where('user', '==', auth.currentUser.uid));
    q = query(q, where('date', '==', getToday()));
    try {
      let docs = await getDocs(q);

      let w = [];
      docs.forEach((doc) => {
        w.push(doc.data());
      });
      w.sort((a, b) => a.timestamp < b.timestamp);
      setHistory(w);
    } catch (error) {
      console.error(error);
    }
  }, [date]);

  useEffect(() => {
    fetch();
  }, []);

  return { history, refreshHistory: fetch };
};

export const addCaffeineEntry = async (entry) => {
  let hour = getHour();
  let time =
    hour < 11
      ? hour === 0
        ? `12:${getMinutes()}am`
        : `${hour}:${getMinutes()}am`
      : hour === 11
      ? `12:${getMinutes()}pm`
      : `${hour - 11}:${getMinutes()}pm`;
  const docRef = await addDoc(collection(db, 'entries'), {
    ...entry,
    date: getToday(),
    hour,
    time,
    user: auth.currentUser.uid,
    timestamp: Date.now(),
  });
  let id = docRef.id;
  await updateDoc(doc(db, 'entries', id), {
    id,
  });
};
