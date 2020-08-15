import { auth, firestore } from "./firebase";

export const signup = (email, password, type) => {
  return auth().createUserWithEmailAndPassword(email, password)
  .then(registeredUser => {
    firestore.collection("users")
    .doc(registeredUser.user.uid)
    .set({
      uid: registeredUser.user.uid,
      infoSetup: false,
      type,
      personal: [{}],
      rooms: [{}],
    })
  })
}

export const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
}

export const signout = () => {
  return auth().signOut();
}

export const signInWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export const signUpWithGoogle = (type) => {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider)
  .then(registeredUser => {
    firestore.collection("users")
    .doc(registeredUser.user.uid)
    .set({
      uid: registeredUser.user.uid,
      infoSetup: false,
      type,
    })
  });
}
