const firebaseConfig = {
  apiKey: "AIzaSyCYiSAF6Z4m0AHL7ZXi_loWk0qTJAw1pfI",
  authDomain: "hackteamfinder.firebaseapp.com",
  databaseURL: "https://hackteamfinder-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "hackteamfinder"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
