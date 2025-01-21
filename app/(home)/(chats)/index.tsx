import ChatBox from '@/app/components/chatBox';
import React from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


const chatInfo = [
    {
        image: null,
        creator: "Ivan",
        startDestination: "Sofia",
        endDestination: "London",
        id: 1
    },
    {
        image: null,
        creator: "Henr",
        startDestination: "Levski",
        endDestination: "Cska",
        id: 2
    },
    {
        image: null,
        creator: "Petur",
        startDestination: "Lulin",
        endDestination: "Mladost",
        id: 3
    },
    {
        image: null,
        creator: "Mladenkata",
        startDestination: "Sofia",
        endDestination: "Samokov",
        id: 4
    },
    {
        image: null,
        creator: "Mermo",
        startDestination: "Pavlikeno",
        endDestination: "Turnovo",
        id: 5
    },
    {
        image: null,
        creator: "s1mple",
        startDestination: "Sofia",
        endDestination: "Varna",
        id: 6
    },{
        image: null,
        creator: "Ivan",
        startDestination: "Sofia",
        endDestination: "London",
        id: 7
    },
    {
        image: null,
        creator: "Henr",
        startDestination: "Levski",
        endDestination: "Cska",
        id: 8
    },
    {
        image: null,
        creator: "Petur",
        startDestination: "Lulin",
        endDestination: "Mladost",
        id: 9
    },
    {
        image: null,
        creator: "Sofia",
        startDestination: "Sofia",
        endDestination: "Samokov",
        id: 10
    },
    {
        image: null,
        creator: "Mermo",
        startDestination: "Pavlikeno",
        endDestination: "Turnovo",
        id: 11
    },
    {
        image: null,
        creator: "s1mple",
        startDestination: "Sofia",
        endDestination: "Varna",
        id: 12
    },
];

export default function Chats() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={chatInfo}
                    renderItem={({ item }) => <ChatBox image={item.image} creator={item.creator} startDestination={item.startDestination} endDestination={item.endDestination} id={item.id} />}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
    },
});
