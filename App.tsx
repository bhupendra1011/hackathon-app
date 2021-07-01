import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify, { Auth, DataStore } from 'aws-amplify'
import config from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import { User } from './src/models';



Amplify.configure(config)

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // sync user from cognito to amplify DataStore
  // once user is logged in 
  React.useEffect(() => {

    const saveUserToDB = async () => {
      // get user form cognitio
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!userInfo) return;

      const userId = userInfo.attributes.sub;


      // check if it exits in DB , if not save in DB
      const user = (await DataStore.query(User)).find(user => user.sub === userId);
      if (!user) {
        //save to DB user for first time
        await DataStore.save(new User({
          sub: userId,
          name: userInfo.attributes.email,
          image: '',
          votedTech: false,
          votedCreative: false,
          votedValue: false
        }))

      } else {
        console.log("user exists in DB already")
      }

    };
    saveUserToDB();

  }, [])



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);