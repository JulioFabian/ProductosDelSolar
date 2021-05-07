import app from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9CrCy-zQ7PIc38GjfdTlglGoxu9r-jTg",
    authDomain: "productos-del-solar.firebaseapp.com",
    projectId: "productos-del-solar",
    storageBucket: "productos-del-solar.appspot.com",
    messagingSenderId: "540615765570",
    appId: "1:540615765570:web:b926f1f71a6a0a0e7887db",
    measurementId: "G-Z499S2VCQR"
  };

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.autorization = app.auth;
        this.firebaseui = new firebaseui.auth.AuthUI(app.auth());
    }
}

export default Firebase;