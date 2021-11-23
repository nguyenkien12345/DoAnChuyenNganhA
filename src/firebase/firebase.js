import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBxUfS4iIHTvnG9SQS5uEABxjOP4B08bII",
    authDomain: "esp8266project-8ea11.firebaseapp.com",
    databaseURL: "https://esp8266project-8ea11-default-rtdb.firebaseio.com",
    projectId: "esp8266project-8ea11",
    storageBucket: "esp8266project-8ea11.appspot.com",
    messagingSenderId: "273016429597",
    appId: "1:273016429597:web:ac85861d4543532cad3af4",
    measurementId: "G-2D194NCH6T"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();

export { auth };
export default app;

