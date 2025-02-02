import ChatBox from '@/app/components/chatBox';
import { getChats } from '@/app/components/requestHandler';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

interface Chat {
    id: number;
    participants: object[];
    route: any;
}


export default function Chats() {
    const [chats, setChats] = useState<Chat[]>([]);


    const fetchChats = async () => {
        try {
            const chats = await getChats();
            setChats(chats);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchChats();
        }, [])
    );



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={chats}
                    renderItem={({ item }) => <ChatBox image={item.route.creator.photo} creator={item.route.creator} startDestination={item.route.start_location.main_text} endDestination={item.route.end_location.main_text} stops={item.route.stops} id={item.id} />}
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
