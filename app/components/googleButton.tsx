import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { findUserByEmail, postLogin, postUser } from '../components/requestHandler';
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import LoginFunction from "./loginFunction";

GoogleSignin.configure({
    webClientId: "142542102562-bsrn2s26j19t9hj8ahnriibul371tq2b.apps.googleusercontent.com",
    offlineAccess: true,
    scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
};

export default function GoogleButton() {
    async function googleLoginFunction() {
        try {
            const googleResponse = await GoogleLogin();
            if (googleResponse.data !== null) {
                try {
                    await findUserByEmail(googleResponse.data.user.email);
                    await LoginFunction(googleResponse.data.user.email, String(googleResponse.data.idToken), "google");
                } catch (error) {
                    console.log(error);
                    try {
                        const userData = {
                            first_name: googleResponse.data.user.givenName,
                            last_name: googleResponse.data.user.familyName,
                            email: googleResponse.data.user.email,
                            password: "TempararyPassword12!",  // temporary 
                            birthday: "2024-12-10", // temporary 
                            provider: "google",
                            photo: googleResponse.data.user.photo
                        };
    
                        await postUser(userData);
                        await LoginFunction(googleResponse.data.user.email, String(googleResponse.data.idToken), "google");
                    } catch (error: any) {
                        console.error("Error registering user:", error.message);
                    }
                }
            }
        } catch (apiError) {
            console.log("Google login error: ", apiError);
        }
    }

    return (
        <TouchableOpacity style={styles.googleButton} onPress={googleLoginFunction}>
            <AntDesign name="google" size={28} color="black" />
            <Text style={styles.googleButtonText}> Sign in with Google</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    googleButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgb(20, 5, 18)",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        width: "100%",
        height: 50,
        flexDirection: "row",
    },
    googleButtonText: {
        color: "rgb(20, 5, 18)",
        fontSize: 20,
        fontWeight: "bold",
    }
});
