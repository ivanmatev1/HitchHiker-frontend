import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Link, router } from 'expo-router';
import React, { } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";



export default function Home() {
    async function signOut (){
        try {
            await GoogleSignin.signOut();
            router.replace("/(login)");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity onPress={signOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
    }
});
