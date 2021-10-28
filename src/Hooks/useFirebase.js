import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const axios = require('axios');

    //As i am using firebase for authentication 
    //User signin/signup data is saved in firebase,
    //so, after firebase signin/signup, google,github signin, 
    //user data is being sent to database(mongodb)
    //before sending, I am checking if user exists in database
    //if user exists i dont need to add him
    //else i am adding user
    const checkIfUserExistsInDatabase = ({ email, name, photo }) => {
        axios.post('http://localhost:5000/checkusers', { email })
            .then(function (response) {
                // if response is false, it means user with this email does not exists
                //then add the user in database
                if (!response.data) {
                    postDataInDatabase({ email, name, photo });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const postDataInDatabase = ({ email, name, photo }) => {
        axios.post('http://localhost:5000/users', {
            name, email, photo
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setError("");
                setUser(loggedInUser);
                //just sending name,email,photo
                checkIfUserExistsInDatabase(loggedInUser);
            })
            .catch(error => {
                setError(error.code);
            })
            .finally(() => setIsLoading(false));
    }
    const handleGithubSignIn = () => {
        return signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setError("");
                setUser(loggedInUser);
                //just sending name,email,photo
                checkIfUserExistsInDatabase(loggedInUser);
            })
            .catch(error => {
                setError(error.code);
            })
            .finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                setError("");
                //just sending name,email,photo
                checkIfUserExistsInDatabase({ "email": user.email, "name": "", "photo": "" });
            })
            .catch((error) => {
                setError(error.code);

            }).finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerificationLink().then((result) => {
                    setUser(user);
                    //just sending name,email,photo
                    checkIfUserExistsInDatabase({ "email": user.email, "name": "", "photo": "" });
                    setError("");
                });
            })
            .catch((error) => {
                setError(error.code);
            }).finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const { displayName, email, photoURL, emailVerified } = user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setUser(loggedInUser);
            } else {
                setUser({});
            }
            setIsLoading(false);
        })
    }, []);

    const sendEmailVerificationLink = () => {
        return sendEmailVerification(auth.currentUser);
    }
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setIsLoading(false));
    }

    return {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        handleFirebaseEmailSignUp,
        error,
        user,
        isLoading,
        logout
    }
}

export default useFirebase;