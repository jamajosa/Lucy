import { useCallback, useEffect, useState } from 'react';
import { StyleSheet} from "react-native";
import {useFonts, Font} from "expo-font";
//import AppLoading from "expo-app-loading";
//import SignUpScreenMail from './src/screens/SignUpScreens/SignUpEmail';
import SignUpScreenPass from './src/screens/SignUpScreens/SignUpScreenPass/SignUpScreenPass';
import SignUpScreenMail from './src/screens/SignUpScreens/SignUpScreenEmail/SignUpScreenMail';
import SignUpScreenPhoto from './src/screens/SignUpScreens/SignUpScreenPhoto/SignUpScreenPhoto';
import WalkingScreen from './src/screens/WalkingScreen/WalkingScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {SplashScreen} from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

const getFonts = () =>
Font.loadAsync({
  stratos: require("./assets/fonts/Stratos-Regular.ttf"),
});


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsloaded] = useFonts({
    'stratos': require("./assets/fonts/Stratos-Regular.ttf"),
  })
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'stratos': require("./assets/fonts/Stratos-Regular.ttf"),
        })
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  return (
  //you can return any component of your choice here     
    <NavigationContainer onReady={onLayoutRootView}>
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
    backgroundColor: "#F1F7F8",
    alignItems: "center",
    justifyContent: "center",
    
  },
  Texts: {
    fontFamily: "stratos",
  },
});