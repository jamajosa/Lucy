import * as Location from 'expo-location';

class LocationObserver {
  observers = [];
  positionWatchId = null;
  headingWatchId = null;

  async start() {
    try {
      await Location.requestForegroundPermissionsAsync();
      this.positionWatchId = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 0.5,
        },
        (position) => {
          this.notifyObservers(position, null);
        }
      );

      this.headingWatchId = Location.watchHeadingAsync((heading) => {
        this.notifyObservers(null, heading);
      });
      
    } catch (err) {
      console.warn(err);
    }
  }

  stop() {
    if (this.positionWatchId) {
      Location.clearWatch(this.positionWatchId);
      this.positionWatchId = null;
    }
    if (this.headingWatchId) {
      Location.clearWatch(this.headingWatchId);
      this.headingWatchId = null;
    }
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(position, heading) {
    this.observers.forEach((observer) => {
      observer(position, heading);
    });
  }
}

export default new LocationObserver();