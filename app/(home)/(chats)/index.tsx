import ChatBox from '@/app/components/chatBox';
import { getChats } from '@/app/components/requestHandler';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

interface Chat {
    id: number;
    participants: object[];
}


export default function Chats() {
    const [chats, setChats] = useState<Chat[]>([]);


    useEffect(() => {
        async function fetchChats (){
            try {
                const chats = await getChats();
                console.log(chats);
                setChats(chats);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };
        fetchChats();
    }, []);



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={chats}
                    renderItem={({ item }) => <ChatBox image={null} creator={item.id.toString()} startDestination={"Sofia"} endDestination={"Ne sofia"} id={item.id} />}
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
