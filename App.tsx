/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import {AppContext, Splash} from './app/utils';
import {AuthNavigator, MainNavigator} from './app/navigation';
import {getCategories} from './app/api/categoriesApi';
import {setCategories} from './app/utils/pickerCategories';
import {userInterface} from './app/utils/AppContext';
import logger from './app/utils/logger';
// import OfflineStatus from './app/components/OfflineStatus';

const App = () => {
  const [user, setUser] = useState<userInterface | null>(null);
  const [newListing, setNewListing] = useState(false);
  const [loading, setLoading] = useState(false);

  //Changing the value newListing
  const toggleNewListing = () => {
    if (newListing) {
      setNewListing(false);
    } else {
      setNewListing(true);
    }
  };

  //Getting the current status of the user
  const getUser = async () => {
    try {
      const response = await AsyncStorage.getItem('user');
      setUser(response);
    } catch (err) {
      console.log(err);
    }
  };

  //Loading the categories for the picker
  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    loadCategories();
    getUser();
  }, [user]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppContext.Provider
          value={{user, setUser, newListing, toggleNewListing}}>
          {loading ? <Splash /> : user ? <MainNavigator /> : <AuthNavigator />}
        </AppContext.Provider>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};
export default App;
