import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { serverUrl } from "../Constants/Constants";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const [signinError, setSigninError] = useState("");
    const [signupError, setSignupError] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdminUrl = `${serverUrl}/admin`;//need to add email
    const addUserInDbUrl = `${serverUrl}/user/add`;

    const addUserInDb = (user) => {
        axios.put(`${addUserInDbUrl}`, user);
    }
    const checkIfUserIsAdmin = (email) => {
        axios.get(`${checkAdminUrl}/${email}`)
            .then(response => {
                setIsAdmin(response.data);
            })
    }

    const handleFirebaseEmailSignIn = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const { displayName, email, photoURL, emailVerified } = user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified,
                    role: "USER"
                };
                setUser(loggedInUser);
                setSigninError("");
                setSignupError("");
            })
            .catch((error) => {
                setSigninError(error.code);

            }).finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignUp = (name, email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerificationLink().then((result) => {
                    const { email, photoURL, emailVerified } = user;
                    //set name from registration
                    updateProfile(auth.currentUser, {
                        displayName: name
                    }).then(() => {
                        const loggedInUser = {
                            name: name,
                            email: email,
                            photo: photoURL,
                            emailVerified: emailVerified,
                            role: "USER"
                        };
                        addUserInDb(loggedInUser);
                        setUser(loggedInUser);
                        setSignupError("");
                        setSigninError("");
                        setIsLoading(false);
                    });

                });
            })
            .catch((error) => {
                setSignupError(error.code);
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
                checkIfUserIsAdmin(loggedInUser.email);
                setUser(loggedInUser);
            } else {
                setUser({});
            }
            setIsLoading(false);
        })
    }, [auth]);

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
        handleFirebaseEmailSignIn,
        handleFirebaseEmailSignUp,
        signinError,
        signupError,
        user,
        isLoading,
        checkIfUserIsAdmin,
        isAdmin,
        logout
    }
}

export default useFirebase;