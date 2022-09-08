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

import {AppContext, Splash} from './app/utils';
import {AuthNavigator, MainNavigator} from './app/navigation';
import {getListings} from './app/api/listingsApi';

const App = () => {
  const [listings, setListings] = useState(undefined);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    const response = await AsyncStorage.getItem('user');
    setUser(response != null ? JSON.parse(response) : false);
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await getListings();
      setListings(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
    if (user) {
      fetchListings();
    }
  }, [user]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppContext.Provider value={{user, setUser, listings, setListings}}>
          {loading ? <Splash /> : user ? <MainNavigator /> : <AuthNavigator />}
        </AppContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
