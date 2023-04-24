import * as Font from "expo-font";
    
export default useFonts = async () => {
  console.log("stratos should be ready to use");
    await Font.loadAsync({
        stratos: require("../../assets/fonts/Stratos-Regular.ttf")
    });
    return true;
}