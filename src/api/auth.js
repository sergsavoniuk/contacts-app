import firebase from "../firebase/firebase";
import "firebase/auth";

class AuthService {
  async login({ email, password }) {
    return await firebase.auth.signInWithEmailAndPassword(email, password);
  }

  async register({ name, email, password }) {
    await firebase.auth.createUserWithEmailAndPassword(email, password);
  }
}

const authService = new AuthService();
export default authService;
