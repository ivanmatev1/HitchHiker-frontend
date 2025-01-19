import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import WhiteHitchhiker from '@/assets/images/white HitchHiker.svg';
import { findUserByEmail, postUser } from '../components/requestHandler';
import GoogleButton from '../components/googleButton';
import LoginFunction from '../components/loginFunction';

export default function LogIn() {
    // handle the switch between login and signup
    const [signup, setSignUp] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [hidePassword, setHidePassword] = useState(true);

    const router = useRouter();

    useEffect(() => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }, [signup]);

    async function normalLoginFunction() {
        if(signup) {
            try {
                const userData = {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    birthday: "2024-12-10", // temporary until I implement the second SignIn screen
                    provider: "local"
                };
                const response = await postUser(userData);
                console.log("User registered successfully:", response);
                await LoginFunction(email, password, "local");
            } catch (error: any) {
                console.error("Error registering user:", error.message);
            }
        }else{
            try {
                await findUserByEmail(email);
                await LoginFunction(email, password, "local");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/purpleBackground3.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <WhiteHitchhiker width={110} height={110} style={styles.logo} />
                <View style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                    <View style={styles.contentContainer}>
                        {/* Title */}
                        <Text style={styles.title}>{signup ? "Sign Up" : "Log In"}</Text>

                        {/* Fields only for the signup */}
                        {signup ? (
                            <View style={{ width: "100%" }}>
                                <View style={{ width: "100%", flexDirection: "row", gap: 8 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.text}>First Name</Text>
                                        <TextInput style={styles.inputField} placeholder="First Name" onChangeText={setFirstName} value={firstName} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.text}>Last Name</Text>
                                        <TextInput style={styles.inputField} placeholder="Last Name" onChangeText={setLastName} value={lastName} />
                                    </View>
                                </View>
                            </View>
                        ) : (null)
                        }
                        <View style={{ width: "100%" }}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput style={styles.inputField} placeholder="Email" onChangeText={setEmail} value={email} inputMode='email' />
                        </View>

                        <View style={{ width: "100%" }}>
                            <Text style={styles.text}>Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput style={styles.passwordInputField} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry={hidePassword} />
                                {/* Handles the switch between the icons */}
                                {hidePassword ? (
                                    <Entypo name="eye-with-line" size={20} color="black" onPress={() => setHidePassword(!hidePassword)} />
                                ) : (
                                    <Entypo name="eye" size={20} color="black" onPress={() => setHidePassword(!hidePassword)} />
                                )}
                            </View>
                        </View>

                        <BouncyCheckbox
                            size={16}
                            fillColor="#023c69"
                            unFillColor="#FFFFFF"
                            text="Remember me"
                            iconStyle={{ borderColor: "#023c69" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ textDecorationLine: "none", color: "black", fontSize: 16 }}
                            style={{ marginLeft: 8, marginBottom: 8 }}
                        />
                        <TouchableOpacity style={styles.button} onPress={normalLoginFunction}>
                            <Text style={styles.buttonText}>{signup ? "Sign Up" : "Log In"}</Text>
                        </TouchableOpacity>

                        <GoogleButton />

                        <Text style={styles.text} onPress={() => setSignUp(!signup)}>
                            {signup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
    },
    image: {
        flex: 1,
        width: "100%",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
        marginLeft: 8,
    },
    contentContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "white",
        padding: 16,
        paddingBottom: 48,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    logo: {
        margin: 16,
    },
    inputField: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        borderRadius: 16,
        borderColor: "rgb(20, 5, 18)",
    },
    passwordContainer: {
        width: "100%",
        flexDirection: "row",
        height: 50,
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 16,
        borderColor: "rgb(20, 5, 18)",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 12,
    },
    passwordInputField: {
        height: 50,
        padding: 16,
        maxWidth: "85%",
    },
    button: {
        backgroundColor: "rgb(20, 5, 18)",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        width: "100%",
        height: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
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

