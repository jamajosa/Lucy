import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Modal, TouchableOpacity , Pressable } from 'react-native';
import { getPreciseDistance } from "geolib";
import { StatusBar } from "expo-status-bar";
import {Location} from 'expo-location';

const WalkingScreen = ({ navigation }) => {

  const[modalVisible,setModalVisible] = useState(false);
  const[modalVisible2,setModalVisible2] = useState(false);
  const criticalDistance = 20;
  //positie van de gebruiker
  const [collected, setCollected] = useState(0);
  const Pulse = require("react-native-pulse").default;
  const [currentPosition, setCurrentPosition] = useState(null);
  const [backgroundsize, setSize] = useState(150);
  const [closestPosition, setClosestPosition] = useState(null);
  const [calculatedPositionArray,setCalculatedPositionArray] = useState([]);
  const [newPositionArray,setNewPositionArray] = useState();
  const[north,setNorth] = useState(null);
  const [isOrientationSet, setIsOrientationSet] = useState(false);
  const[direction,setDirection] = useState(null);
  const[varr, setVar] = useState(null);
  const [heading, setHeading] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [arrowRotation, setArrowRotation] = useState(0);
  const [bearing,setBearing] = useState(0);
  const [finishWalking, setFinishWalking] = useState(0);


  const [positionArray,setPositionArray] = useState([
  {
    longtitude: 4.294040,
    latitude: 51.493036,
    distance: null,
    angle: null,
    finished:false,
    subInformation: "Dit oude pand voorheen van de GGD is nieuw leven ingeblazen en is nu een bruisende plek met een sociaal, innovatief en maatschappelijk karakter.",
    title: "De ZuidOost",
    imageUrl:
      "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/305109117_561682589087134_9186682577357353177_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CHgNJTA0mZQAX91ykAW&_nc_ht=scontent-ams4-1.xx&oh=00_AfAPY1RGlmOAVl-ZQRpmjGAPYxspLf7QWcSS7IzNk9pSKw&oe=63A95E75",
  },
  {
    longtitude: 4.292914,
    latitude: 51.492205,
    distance: null,
    angle: null,
    finished:false,
    subInformation: "Voor de heerlijke puddingkoeken, Belgische worstenbroodjes, Bergse Bastaert en verse broden ga je naar deze ambachtelijke bakker. Of je nu jezelf wil trakteren op iets lekkers of dat wil delen met vrienden of collega’s, je wordt er blij van.",
    title: "Bakker Groffen",
    imageUrl:
      "https://www.bakkergroffen.nl/wp-content/uploads/2015/11/p-543-_DSC8538.jpg",
  },
  {
    longtitude: 4.293727,
    latitude: 51.490869,
    distance: null,
    angle: null,
    finished:false,
    subInformation: "Vraagwijzer is een plaats waar u terecht kunt met uw vragen waar u zelf niet aan uitkomt of niet weet waar u moet zijn.",
    title: "Vraagwijzer",
    imageUrl:
      "https://roos-vandewerk.nl/wp-content/uploads/VraagWijzer-Rotterdam-Logo.jpg",
  },
	{
		longtitude: 4.292846,
		latitude: 51.491871,
		distance: null,
    angle: null,
    finished:false,
		subInformation: "Bij de gemeente Bergen op Zoom kun je terecht voor oa. vergunningen, paspoorten, rijbewijzen, aangifte van trouwen, geboorte, overlijden en verhuizingen.",
		title: "Gemeentehuis",
		imageUrl:
		  "https://cuatro.sim-cdn.nl/bergenopzoom/uploads/stadskantoor6.jpg",
	  },
	  {
		longtitude: 4.292765,
		latitude: 51.494130,
		distance: null,
    angle: null,
    finished:false,
		subInformation: "Word een echte horecaspecialist bij Curio Meeussenstraat 13. Jij leert hier alles over horeca, food of hospitality. Denk aan bedienen, organiseren en koken.",
		title: "Curio",
		imageUrl:
		  "https://www.curio.nl/media/mrde5r5e/locatie-curio-meeussenstraat-13-1.jpg?anchor=center&mode=crop&width=1280&height=0&rnd=132494817208570000&quality=70",
	  },
  ]);


  useEffect(() => {
    const observerCallback = async (position, heading) => {
      //console.log(heading);
      if (position && position.coords) {
        await setCurrentPosition(position);
        await pushClosestPosition(position);     
      }
      if (heading && heading.trueHeading) {
        await setHeading(heading.trueHeading);
      }
    };
  
    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
  
      const positionSubscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 0.5,
      }, (position) => {
        observerCallback(position, null);
      });
  
      const headingSubscription = await Location.watchHeadingAsync((heading) => {
        observerCallback(null, heading);
      });
  
      return () => {
        positionSubscription && positionSubscription.remove();
        headingSubscription && headingSubscription.remove();
      };
    };
  
    startLocationUpdates();
  }, []);



async function pushDistance(userPosition) {
  for (let i = 0; i < positionArray.length; i++) {
    setFinishWalking(positionArray.length);
    const d = getPreciseDistance(
      { latitude: positionArray[i].latitude, longitude: positionArray[i].longtitude },
      { latitude: userPosition.coords.latitude, longitude: userPosition.coords.longitude }
    );
    let bearing = calculateBearing({ latitude: userPosition.coords.latitude, longitude: userPosition.coords.longitude },
      { latitude: positionArray[i].latitude, longitude: positionArray[i].longtitude });
    calculatedPositionArray[i] = {...calculatedPositionArray[i], distance: d,bearing:bearing,position: positionArray[i] };
    setCalculatedPositionArray(calculatedPositionArray);
  }
  return calculatedPositionArray;
}

async function pushClosestPosition(userPosition) {
  //console.log(smallestDistance);
  let nearestObject = null;
  let smallestDistance = Infinity;
  await pushDistance(userPosition).then((calculatedPositionArray) => {
    for (let i = 0; i < calculatedPositionArray.length; i++) {
      const distance = calculatedPositionArray[i].distance;
      if (distance < smallestDistance) {
        nearestObject = calculatedPositionArray[i];
        smallestDistance = distance;
        
      }
    }  
    setClosestPosition(nearestObject);
    //console.log(closestPosition);
  });
};

function calculateBearing(startCoords, targetCoords) {
  if (!startCoords) {
    return 0;
  }
  let lat1 = startCoords.latitude;
  let lon1 = startCoords.longitude;
  let lat2 = targetCoords.latitude;
  let lon2 = targetCoords.longitude;
  let dLon = (lon2 - lon1) * (Math.PI / 180);
  lat1 = lat1 * (Math.PI / 180);
  lat2 = lat2 * (Math.PI / 180);
  let y = Math.sin(dLon) * Math.cos(lat2);
  let x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return bearing;
}
  function pointCollected(){
    const arrCopy = calculatedPositionArray;
    const arrCopy2 = positionArray;
    const whatObject = arrCopy.find(obj =>{
      return obj.distance == closestPosition.distance;
    })
    if(whatObject){
    console.log(whatObject);
    const indexOfObject1 = arrCopy.findIndex(obj => obj === whatObject);
    arrCopy.splice(indexOfObject1, 1);
    const indexOfObject2  = arrCopy2.findIndex(obj => obj === whatObject.position);
    arrCopy2.splice(indexOfObject2, 1);
    setPositionArray(arrCopy2);
		setCalculatedPositionArray(arrCopy);
    }
    else{
      
    }
  }

  function collectPoint() {
	  setFinishWalking(finishWalking-1);
    // const arrCopy = calculatedPositionArray;
    // const arrCopy2 = positionArray;
    // const whatObject = arrCopy.find(obj =>{
    //   return obj.distance == closestPosition.distance;
    // })
    // if(whatObject){
    // console.log(whatObject);
    // const indexOfObject1 = arrCopy.findIndex(obj => obj === whatObject);
    // arrCopy.splice(indexOfObject1, 1);
    // const indexOfObject2  = arrCopy2.findIndex(obj => obj === whatObject.position);
    // arrCopy2.splice(indexOfObject2, 1);
    // setPositionArray(arrCopy2);
		// setCalculatedPositionArray(arrCopy);
    setModalVisible(true);
    setCollected(collected+1);
  }


  return (
    <View style={styles.container}>
      <View style={styles.container4}>
        <Text style={styles.text2}>
          {collected} punten
        </Text>
      </View>
      <View style={styles.container1}>
        <Image
          source={require("../../../assets/smallLogo.png")}
          style={styles.backgroundImage2}
        />
      </View>
      <View style={styles.container2}>
        {closestPosition !== null &&  closestPosition.distance <= 15 
          ? <Pulse
              color="#008000"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null &&  closestPosition.distance > 10 && closestPosition.distance <= 30 
          ? <Pulse
              color="#9ACD32"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 20 && closestPosition.distance <= 55 
          ? <Pulse
              color="#e6e600"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 45 && closestPosition.distance <= 80 
          ? <Pulse
              color="#FFAE42"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 70 && closestPosition.distance <= 110 
          ? <Pulse
              color="#FF5349"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 100 && closestPosition.distance <= 150 
          ? <Pulse
              color="#FF0000"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null} 
        {closestPosition !== null &&  closestPosition.distance > criticalDistance
          ? <TouchableOpacity>
            {arrowRotation != null
              ?
              <Image
                source={require("../../../assets/arrow.png")}
                style={[
                  styles.backgroundImage,
                  {
                    transform: [{ rotate: `${360 - heading + closestPosition.bearing}deg` }],
                    width: backgroundsize,
                    height: backgroundsize,
                    borderRadius: backgroundsize / 2,
                    backgroundColor: "#96A35D",
                  },
                ]}
              />
              : null}
            </TouchableOpacity>
            
          : <TouchableOpacity onPress={() => collectPoint()}>
              <Image
                source={require("../../../assets/smallLogo.png")}
                style={[
                  styles.backgroundImage,
                  {
                    width: backgroundsize,
                    height: backgroundsize,
                    borderRadius: backgroundsize / 2,
                    backgroundColor: "#96A35D",
                  },
                ]}
              />
            </TouchableOpacity>}

        <StatusBar style="auto" hidden />
      </View>
      
      <View style={styles.container3} />
        <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <View style={[styles.container]}>
          <View style={styles.container1}>
            <Image style={styles.backgroundImage4} source={closestPosition !== null ? {uri:closestPosition.position.imageUrl} : null}/>	
          </View>
          <View style={styles.container4}>
            <Text style={styles.text2}>{closestPosition !== null ? closestPosition.position.title: "title"}</Text>
          </View>
          <View style={styles.container3}>
            <Text style={styles.Text}>{closestPosition !== null ? closestPosition.position.subInformation : "info"}</Text>
            </View>
          <View style={styles.container3}>
            <Pressable  style={styles.btnStyle} onPress={() => setModalVisible(false) + pointCollected()}>
              <Text style={styles.Text}>Venster sluiten</Text>
            </Pressable >
          </View>
        </View>
	  </Modal>

	  <Modal
	  animationType="slide"
	  visible={modalVisible2}
	  onRequestClose={() => setModalVisible(false)}
	  >
		<View style={[styles.container]}>
			<View style={styles.container1}>
				<Image style={styles.backgroundImage4} source={require("../../../assets/smallLogo.png")}/>	
			</View>
			<View style={styles.container4}>
				<Text style={styles.text2}>hhhh</Text>
			</View>
			<View style={styles.container3}>
				<Text style={styles.Text}>hhh</Text>
				</View>
			<View style={styles.container3}>
				<Pressable  style={styles.btnStyle} onPress={() => setModalVisible(false)}>
					<Text style={styles.Text}>Venster sluiten</Text>
				</Pressable >
			</View>
		</View>
	  </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
	btnStyle: {
		backgroundColor: '#96A35D',
		borderRadius:0.25,
		elevation: 3,
		paddingVertical: 12,
    paddingHorizontal: 32,
		borderColor:"white",
		borderWidth:2,
		color: "white"
	},
  text2: {
    color: "white",
    fontWeight: "bold",
	fontSize:20
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#96A35D",
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    flex: 0.3,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
	color: "white",
    fontWeight: "bold",
    flex: 0.4,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container3: {
    flex: 0.2,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container4: {
    flex: 0.1,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
	marginLeft:30,
	marginRight:30
  },
  
  backgroundImage: {
    backgroundColor: "#4f1329",
  },
  backgroundImage4: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#4f1329",
  },
  backgroundImage3: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    backgroundColor: "#4f1329",
  },
  backgroundImage2: {
    bottom: 0,
    resizeMode: "contain",
    height: 200,
  },
});


export default WalkingScreen;