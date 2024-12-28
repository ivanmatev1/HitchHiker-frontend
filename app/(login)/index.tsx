import React, { useState } from 'react';
import { Link } from "expo-router";
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import WhiteHitchhiker from '@/assets/images/white HitchHiker.svg';



export default function LogIn() {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    function LogInButtonFunction() {
        console.log(email, password);
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/purpleBackground1.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <WhiteHitchhiker width={110} height={110} style={styles.logo} />
                <View style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Log in</Text>

                        <View style={{ width: "100%" }}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput style={styles.inputField} placeholder="Email" onChangeText={onChangeEmail} value={email} inputMode='email' />
                        </View>

                        <View style={{ width: "100%" }}>
                            <Text style={styles.text}>Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput style={styles.passwordInputField} placeholder="Password" onChangeText={onChangePassword} value={password} secureTextEntry={hidePassword} />
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
                        <TouchableOpacity style={styles.button} onPress={LogInButtonFunction}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleButton} onPress={LogInButtonFunction}>
                            <AntDesign name="google" size={28} color="black" />
                            <Text style={styles.googleButtonText}> Sign in with Google</Text>
                        </TouchableOpacity>

                        <Link href="/(signup)" style={styles.text}>Don't have an account? Sign Up</Link>
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
