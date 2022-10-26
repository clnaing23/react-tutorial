import { getDatabase, onValue, ref, update } from "firebase/database";
import { useCallback, useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPZ5evrWgXCGrbCgBvP7IsgVTPh5FZBB8",
    authDomain: "react-tutorial-cn.firebaseapp.com",
    databaseURL: "react-tutorial-cn-default-rtdb.firebaseio.com",
    projectId: "react-tutorial-cn",
    storageBucket: "react-tutorial-cn.appspot.com",
    messagingSenderId: "355863915167",
    appId: "1:355863915167:web:4fd1e1fd79c6aa302c50aa",
    measurementId: "G-ZBW5T3EV55"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};