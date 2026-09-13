// import {MMKV} from 'react-native-mmkv';

// const storage = new MMKV();

// const reduxStorage = {
//     setItem : (key , value) => {
//         storage.set(key , value);
//         return Promise.resolve(true);
//     },
//     getItem : key => {
//         const value = storage.getString(key);
//         return Promise.resolve(value)
//     },
//     removeItem : key => {
//         storage.delete(key)
//         return Promise.resolve();
//     }
// };

// export default reduxStorage; If we want the ultra-fast performance of MMKV, we can use react-native-mmkv with Expo by running a local development build

import AsyncStorage from '@react-native-async-storage/async-storage';

const reduxStorage = {
  setItem: (key, value) => {
    return AsyncStorage.setItem(key, value);
  },
  getItem: (key) => {
    return AsyncStorage.getItem(key);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
};

export default reduxStorage;