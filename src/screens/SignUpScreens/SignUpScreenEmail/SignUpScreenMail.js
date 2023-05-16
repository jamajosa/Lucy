import {useEffect, useState} from 'react'
import { StyleSheet, Text, View,Image,TextInput,Pressable,KeyboardAvoidingView,Keyboard    } from "react-native";
import dbConnect from '../../../../dbConnect';

const SignUpScreenMail = ({navigation}) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [fieldsAreOk, setFieldsAreOk] = useState(false);
    const [bearerToken, setBearer] = useState([]);
    const [i, seti] = useState(0);
    const checkFields = (text) =>{
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === true){
        setFieldsAreOk(true);
      }
      else{
          
      }
      
    }

    function dbConn() {
      const user = "user@example.com";
      const password = "password123";
      const con = dbConnect.getBearerToken(user, password);
      setBearer(con);
      seti(1);
      return con
      
    }
    
    useEffect(() => {
      console.log([bearerToken]);
    }, [bearerToken]);
  
    const handleButtonPress = () => {
      setMyVariable('New value');
    };
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () =>
          setIsKeyboardOpen(true)
        );
        Keyboard.addListener("keyboardDidHide", () =>
          setIsKeyboardOpen(false)
        );
    })

  return (
 <>
        <View style={styles.container1}>
        <Image  style={styles.headerImagestyle} source={require("../../../../assets/smallLogo.png")} />	
        </View>
        <View style={styles.container2}><Text style={styles.Texts}>
          Registratie
        </Text></View>
        <View style={styles.containerquater}><Text style={styles.Texts2}>
          Zet je wandelschoenen maar alvast klaar. Wij gaan samen veel mooie wandelingen maken.
        </Text></View>
        <View style={[styles.container4]} ></View>
        <View style={[styles.container4]} >
        <TextInput style={styles.input} placeholder="E-mailadres" keyboardType="email-address" onChangeText={text => checkFields(text)}/>
        </View>

        <KeyboardAvoidingView keyboardVerticalOffset style={[styles.container3, isKeyboardOpen == true ? {display: "none"} : null]}>
        </KeyboardAvoidingView>
        <View style={[styles.container4]} >
        <Pressable style={styles.button} onPress={() =>dbConn()} >
          <Text style={[styles.Texts3]}>Ga verder</Text>
        </Pressable>
        </View>
        <KeyboardAvoidingView keyboardVerticalOffset  style={[styles.container5, isKeyboardOpen == true ? null : null]}>
      <Text style={[styles.Texts]}>....</Text>
        </KeyboardAvoidingView> 
</>
   
  );
}

const styles = StyleSheet.create({
    button: {
        alignSelf:"flex-end",
        width:'80%',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontFamily: "stratos",
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#CEE9ED',
      },
    input: {
        width:'80%',
        borderColor: "white",
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        alignItems: 'flex-start',
        backgroundColor:"#fff"
    },
    container: {
        flex: "100%"
    },
    containerquater:{
        flex:0.10,
        width: null,
        height: null,
        flexDirection: "row",
        justifyContent: 'center', //Centered horizontally
       alignItems: 'flex-end', //Centered vertically
    },
    container1:{
        flex:0.20,
        width: null,
        height: null,
        flexDirection: "row",
        justifyContent: 'center', //Centered horizontally
       alignItems: 'flex-end', //Centered vertically
    },
    container2:{
        flex:0.20,
        width: null,
        height: null,
        flexDirection: "row",
        justifyContent: 'center', //Centered horizontally
       alignItems: 'flex-end', //Centered vertically
    },
    
    container3:{
        flex:0.25,
        width: null,
        height: null,
        flexDirection: "row",
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },
    container4:{
        flex:0.10,
        width: null,
        height: null,
        flexDirection: "row",
        justifyContent: 'center', //Centered horizontally
        alignItems: 'flex-start', //Centered vertically
    },
    container5:{
        flex:0.08,
        width: null,
        height: null,
        flexDirection: "row",
        justifyContent: 'center', //Centered horizontally
       alignItems: 'flex-end', //Centered vertically
    },
    Texts: {
        fontFamily: "stratos",
        fontStyle:'normal',
        lineHeight:45,
        alignSelf:"center",
        textAlign:"center",
        fontWeight:'900',
        fontSize:30,
        color:"#336C70",
        paddingLeft:70,
        paddingRight:70
    },
    Texts2: {
        margin: -5,
        fontFamily: "stratos",
        alignSelf:"flex-start",
        textAlign:"center",
        fontWeight:"600",
        fontSize:14,
        color:"#5AA0A7",
        paddingLeft:'21%',
        paddingRight:'21%'
    },
    Texts3: {
        fontFamily: "stratos",
        alignSelf:"center",
        textAlign:"center",
        fontWeight:"600",
        fontSize:14,
        color:"#172B2C",
    },
    headerImagestyle:{
        alignSelf:"flex-start",
        marginTop:'15%',
        resizeMode:'contain',
        paddingBottom:0,
        width: '80%',
        height: '80%'
    }
  });
export default SignUpScreenMail