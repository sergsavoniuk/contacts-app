import firebase from "../firebase/firebase";

class AuthService {
  async login({ email, password }) {
    return firebase.auth.signInWithEmailAndPassword(email, password);
  }

  async register({ name, email, password }) {
    const newUser = await firebase.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return newUser.user.updateProfile({
      displayName: name
    });
  }

  async authenticateThroughSocials(providerName) {
    return firebase.auth.signInWithPopup(
      providerName === "google"
        ? firebase.googleProvider
        : firebase.facebookProvider
    );
  }

  async logout() {
    await firebase.auth.signOut();
  }
}

const authService = new AuthService();
export default authService;
