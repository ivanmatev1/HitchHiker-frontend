import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Link, router } from 'expo-router';
import React, { } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { findUserByEmail, getUsers } from '../../components/requestHandler';
import * as SecureStore from 'expo-secure-store';

export default function Profile() {
    async function signOut() {
        try {
            await GoogleSignin.signOut();
            await SecureStore.deleteItemAsync("JWT_TOKEN");
            router.replace("/(login)");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={getUsers}>
                <Text>Get Users</Text>
            </TouchableOpacity>
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
