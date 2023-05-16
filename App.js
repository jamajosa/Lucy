import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreenMail from './src/screens/SignUpScreens/SignUpScreenEmail/SignUpScreenMail';
import SignUpScreenPass from './src/screens/SignUpScreens/SignUpScreenPass/SignUpScreenPass';
import SignUpScreenPhoto from './src/screens/SignUpScreens/SignUpScreenPhoto/SignUpScreenPhoto';
import WalkingScreen from './src/screens/WalkingScreen/WalkingScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  if (__DEV__) {
    console.log('Running in development mode');
  } else {
    console.log('Running in production mode');
  }
  
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          stratos: require('./assets/fonts/Stratos-Regular.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Walking"
        component={WalkingScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="SignUp email"
        component={SignUpScreenMail}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="SignUp password"
        component={SignUpScreenPass}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="SignUp photo"
        component={SignUpScreenPhoto}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#F1F7F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'stratos',
  },
});