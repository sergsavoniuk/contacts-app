import firebase from "../firebase/firebase";
import "firebase/auth";

class AuthService {
  async login({ email, password }) {
    return await firebase.auth.signInWithEmailAndPassword(email, password);
  }

  async register({ name, email, password }) {
    const newUser = await firebase.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  async logout() {
    await firebase.auth.signOut();
  }
}

const authService = new AuthService();
export default authService;
