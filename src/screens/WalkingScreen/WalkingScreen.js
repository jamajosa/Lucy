import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Modal, TouchableOpacity , Pressable } from 'react-native';
import { getPreciseDistance } from "geolib";
import { StatusBar } from "expo-status-bar";
import * as Location from 'expo-location'; // Modified import statement

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
    longtitude: 4.28476,
    latitude: 51.495677,
    distance: null,
    angle: null,
    finished:false,
    subInformation: "Het Markiezenhof is een laatgotisch stadspaleis in de stad Bergen op Zoom, in de Nederlandse provincie Noord-Brabant. Het was de residentie van de heren en later de markiezen van Bergen op Zoom. In het pand vinden tentoonstellingen en evenementen plaats. Het is een rijksmonument en behoort tot de 'Top 100 van de Rijksdienst voor de Monumentenzorg' uit 1990.",
    title: "Het Markiezenhof",
    imageUrl:
      "https://media.indebuurt.nl/bergenopzoom/2020/03/04115302/120099-1-scaled.jpg",
  },
  {
    longtitude: 4.286523179756908,
    latitude: 51.49458617537634,
    distance: null,
    angle: null,
    finished:false,
    subInformation: "Hotel de Draak (vroeger De Draeck) is een hotel gelegen aan de Grote Markt in Bergen op Zoom. Het is het oudste hotel van Nederland.Het huidige Hotel de Draak, aan de Grote Markt 38, is gevestigd in een pand uit 1397 dat het resultaat is van een ingrijpende verbouwing. De met tongewelven overdekte kelders stammen nog uit het 14e-eeuwse pand.",
    title: "Hotel de Draak",
    imageUrl:
      "https://i.pinimg.com/736x/7a/60/cb/7a60cb463e52b7173817f4373b099aab--bergen-zoom.jpg",
  },
  {
    longtitude: 4.287478449275487,
    latitude: 51.49446649011488,
    distance: null,
    angle: null,
    finished:false,
    subInformation: "Deze klokkentoren moet rond 1370 gebouwd zijn. In 1442 wordt de Sint-Gertrudiskerk verheven tot kapittelkerk. De kerk is daarom in opdracht van Jan II van Glymes uitgebreid. De opdracht hiervoor werd in 1443 aan de uit Antwerpen afkomstige Everaert Spoorwater gegeven. Nog voor dat hij zijn ontwerp kan verwezenlijken breekt er een grote stadsbrand uit.",
    title: "De Peperbus",
    imageUrl:
      "https://media.indebuurt.nl/bergenopzoom/2020/02/04121204/peperbus-groot.jpg",
  },
	{
		longtitude: 4.290067708371838,
		latitude: 51.49417735026132,
		distance: null,
    angle: null,
    finished:false,
		subInformation: "Aan het eind van de 18e eeuw ontstond in Bergen op Zoom een kleine gemeenschap van Asjkenazische Joden. Zij gebruikten de zolder van de Boterwaag als synagoge. Toen ze daar niet meer terechtkonden, schonk Koning Willem I hun 1000 gulden om een synagoge te bouwen. Deze werd gebouwd aan de Parade, een gedeelte dat nu de Koevoetstraat is.",
		title: "De Synagoge",
		imageUrl:
		  "https://media.indebuurt.nl/bergenopzoom/2019/09/04132024/img_9517.jpg",
	  },
	  {
		longtitude: 4.282114589998839,
		latitude: 51.49518015858844,
		distance: null,
    angle: null,
    finished:false,
		subInformation: "De Gevangenenpoort in Bergen op Zoom is het oudste monument van de stad. De poort dateert uit de 14e eeuw en is een van de overgebleven voorbeelden van stadspoorten zoals die in de middeleeuwen in Nederlandse steden te vinden waren. Het is de enige stadspoort overgebleven in Bergen op Zoom, en een rijksmonument.",
		title: "De Gevangenenpoort",
		imageUrl:
		  "https://www.brabantserfgoed.nl/image/2017/10/12/stadspoort.png%28%29%2817AB51612BE7DFA34F1D6FD8F09395BD%29.jpg",
	  },
    {
      longtitude: 4.286493401058739,
      latitude: 51.49448719349763,
      distance: null,
      angle: null,
      finished:false,
      subInformation: "De Kerk van de Heilige Maagd Maria-Tenhemelopneming is een gebouw dat van 1829 tot 1987 dienstgedaan heeft als de parochiekerk van Bergen op Zoom. De kerk bevindt zich aan de Grote Markt 32. Eind 18e eeuw bleef de historische Sint-Gertrudiskerk in handen van de protestanten. Tegenwoordig is het gebouw een theater.",
      title: "De Maagd",
      imageUrl:
        "https://media.indebuurt.nl/bergenopzoom/2018/06/04165332/maagd-1.jpg",
      },
    {
      longtitude: 4.2872167334543,
      latitude: 51.49394020192132,
      distance: null,
      angle: null,
      finished:false,
      subInformation: "Den Enghel, een markant gebouw op de Grote Markt van de historische stad Bergen op Zoom. Een huis met een lange geschiedenis, want Den Enghel is al aardig op leeftijd en was in de 14 e eeuw al een behoorlijk groot huis. In 1397 kocht ene Jan van Cleve een erf op de Grote Markt nabij het Vleeshuis.",
      title: "Den Enghel",
      imageUrl:
        "https://theaterdenenghel.nl/____impro/1/onewebmedia/foto%20pand1.jpg?etag=%222ae978-5ef07d22%22&sourceContentType=image%2Fjpeg&quality=85",
      },
      {
        longtitude: 4.275991628889773,
        latitude: 51.49293758225225,
        distance: null,
        angle: null,
        finished:false,
        subInformation: "De Zeeland was een suikerfabriek in Bergen op Zoom die tussen 1917 en 1929 in bedrijf is geweest. De fabriek werd geëxploiteerd door de vereniging Coöperatieve Beetwortelsuikerfabriek Zeeland. Enkele overgebleven imposante fabrieksgebouwen zijn thans voorbeelden van industrieel erfgoed in de gemeente Bergen op Zoom.",
        title: "De Zeeland",
        imageUrl:
          "https://media.indebuurt.nl/bergenopzoom/2021/02/18151417/De-Zeeland-Suikerfabriek-1967.jpg",
        },

        {
          longtitude: 4.292196806549184,
          latitude: 51.4987709540389,
          distance: null,
          angle: null,
          finished:false,
          subInformation: "Het Ravelijn is het laatste restant van de imposante vestingwerken rondom de stad. De beroemde Nederlandse vestingbouwer Menno van Coehoorn ontwierp ook in Bergen op Zoom de vestingwerken. Hij creëerde in 1702 een ingenieus ontwerp. Daarom ging men ervan uit dat Bergen op Zoom nooit kon worden ingenomen. Daaraan dankte de stad zijn bijnaam “La Pucelle”, oftewel de maagd. Helaas namen de Fransen in 1747 Bergen op Zoom toch in.",
          title: "Het Ravelijn",
          imageUrl:
            "https://media.indebuurt.nl/bergenopzoom/2020/08/04105059/boz001025978.jpg",
          },
          {
            longtitude: 4.279641575607404,
            latitude: 51.496701497968594,
            distance: null,
            angle: null,
            finished:false,
            subInformation: "Gebouw-T is tegenwoordig een poppodium, maar was vroeger een onderdeel van de militaire gebouwen voor de paarden. Meerdere blokkenstallen zorgden voor onderdak van ontzettend veel paarden. De eerste blokstal werd rond 1700 gebouwd op de Nieuwe Markt",
            title: "Gebouw-T",
            imageUrl:
              "https://media.indebuurt.nl/bergenopzoom/2019/04/04142332/boz001037387.jpg",
            },
  ]);


  useEffect(() => {
    const observerCallback = async (position, heading) => {
      console.log(heading);
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
        {closestPosition !== null &&  closestPosition.distance <= 60
          ? <Pulse
              color="#008000"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null &&  closestPosition.distance > 50 && closestPosition.distance <= 150
          ? <Pulse
              color="#9ACD32"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 100 && closestPosition.distance <= 300
          ? <Pulse
              color="#e6e600"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 200 && closestPosition.distance <= 550
          ? <Pulse
              color="#FFAE42"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 450 && closestPosition.distance <= 850
          ? <Pulse
              color="#FF5349"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 750 && closestPosition.distance <= 1500
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