import app from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }

  get auth() {
    return app.auth();
  }
}

const firebase = new Firebase();
export default firebase;
