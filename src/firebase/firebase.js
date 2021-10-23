import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBl626ovlFJc50rksO7WFRAbfVe5G9_jbg",
    authDomain: "specialized-project.firebaseapp.com",
    databaseURL: "https://specialized-project-default-rtdb.firebaseio.com",
    projectId: "specialized-project",
    storageBucket: "specialized-project.appspot.com",
    messagingSenderId: "264472318889",
    appId: "1:264472318889:web:408f85d4289d44e5786ab8"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();

export { auth };
export default app;

