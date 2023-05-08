import {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image,Pressable,KeyboardAvoidingView,Keyboard,TouchableOpacity   } from "react-native";
import {ImagePicker} from 'expo-image-picker';

const SignUpScreenPhoto = ({navigation}) => {
  const [image, setImage] = useState(null);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const addImage = async () => {
      let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });

      if (!_image.canceled) {
        setImage(_image.assets[0].uri);
      }
    }

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
          We zien graag je mooiste foto hier.
        </Text></View>
        <View style={[styles.container6]} >
        <View style={styles.containerCircle}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={[styles.uploadBtnContainer,{backgroundColor:"#CEE9ED"}]} >
                        <TouchableOpacity onPress={addImage} style={[styles.uploadBtn,]} >
                            <AntDesign name="camera" size={20} style={{marginTop:"5%"}} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
        <KeyboardAvoidingView keyboardVerticalOffset style={[styles.container3, isKeyboardOpen == true ? {display: "none"} : null]}>
        </KeyboardAvoidingView>
        <View style={[styles.container4]} >
        <Pressable style={styles.button} >
      <Text style={[styles.Texts3]}>Ga verder</Text>
    </Pressable> 
    </View>
        <KeyboardAvoidingView keyboardVerticalOffset  style={[styles.container5, isKeyboardOpen == true ? null : null]}>
      <Text style={[styles.Texts]}>....</Text>
        </KeyboardAvoidingView> 
    </>
  )
}

const styles = StyleSheet.create({
  containerCircle:{
    elevation:2,
    height:200,
    width:200,
    backgroundColor:'#efefef',
    position:'relative',
    borderRadius:999,
    overflow:'hidden',
},
uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'lightgrey',
    width:'100%',
    height:'25%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
},


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
      marginBottom:5,
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
        flex:0.15,
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
    container6:{
      flex:0.30,
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
        width: '50%',
        height: '50%'
    }
  });
export default SignUpScreenPhoto