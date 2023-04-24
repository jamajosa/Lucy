import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

class MagnetometerObserver {
  observers = [];
  magnetometer = null;
  startOrientation = 0; // default value set to 0
  userPosition = null;

  constructor() {
    this.magnetometer = Magnetometer;
  }

  async start() {
    try {
      await this.magnetometer.isAvailableAsync();
      this.subscription = this.magnetometer.addListener(({ x, y, z }) => {
        const orientation = this.calculateOrientation(x, y, z);
        this.notifyObservers(orientation);
      });
      await this.magnetometer.setUpdateInterval(1000); // Update every 100 milliseconds

      // Get the user's current position
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        this.userPosition = location.coords;
      }

      // Set the startOrientation to the bearing between the user's location and the geographic north
      const northLocation = await Location.getHeadingAsync();
      if (northLocation && northLocation.coords) { // check if northLocation exists and has coordinates
        const northBearing = getBearing(this.userPosition, northLocation.coords);
        this.startOrientation = northBearing;
      }

    } catch (error) {
      console.warn(error);
    }
  }

  stop() {
    this.subscription.remove();
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(orientation) {
    this.observers.forEach((observer) => {
      observer(orientation);
    });
  }

  calculateOrientation(x, y, z) {
    const radians = Math.atan2(y, x);
    let degrees = radians * (180 / Math.PI);
    if (degrees < 0) {
      degrees += 360;
    }
    const orientationRelativeToNorth = degrees - this.startOrientation;
    return {
      orientation: orientationRelativeToNorth,
      startOrientation: this.startOrientation,
    };
  }
}

function getBearing(start, end) {
  const startLat = toRadians(start.latitude);
  const startLng = toRadians(start.longitude);
  const endLat = toRadians(end.latitude);
  const endLng = toRadians(end.longitude);

  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);

  const bearing = toDegrees(Math.atan2(y, x));
  return normalizeAngle(bearing);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

export default new MagnetometerObserver();