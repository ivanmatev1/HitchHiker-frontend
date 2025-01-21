import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function Page() {
    const [messages, setMessages] = useState<IMessage[]>([])
    const { id } = useLocalSearchParams();
    const navigation = useNavigation(); 
  
    useEffect(() => {
      if (id) {
        navigation.setOptions({
          title: `Chat ${id}`,
        });
      }
    }, [id, navigation]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocL4cB_gcNgwTkPMavuzCWDjWzSzuhCYDDUHlLzP7eE0LvImIw=s96-c',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages: IMessage[]) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages: IMessage[]) => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    );
}

const styles = StyleSheet.create({
});
