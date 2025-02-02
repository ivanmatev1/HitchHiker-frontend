import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getChat, getUser } from '@/app/components/requestHandler';
import io, { Socket } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';

const SOCKET_URL = 'http://10.0.2.2:3002';

export default function Page() {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [userId, setUserId] = useState<number>(0);
    const { id, creatorName } = useLocalSearchParams();
    const navigation = useNavigation();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log(id , creatorName)
        if (typeof id === 'string') { // only run if id is a string
            navigation.setOptions({
                title: `${creatorName}'s chat`,
            });

            const fetchChat = async () => {
                try {
                    const chat = await getChat(id);

                    const transformedMessages = chat.messages.map((message: any) => ({
                        _id: message.id,
                        text: message.text,
                        createdAt: new Date(message.timestamp),
                        user: {
                            _id: message.sender.id,
                            name: `${message.sender.first_name} ${message.sender.last_name}`,
                            avatar: message.sender.photo || undefined,
                        },
                    }));

                    transformedMessages.forEach((message: any) => {
                        setMessages((prevMessages) => GiftedChat.append(prevMessages, message));
                    });
                } catch (error) {
                    console.error('Failed to fetch chats:', error);
                }

            };
            fetchChat();
        }
    }, [id, navigation]);

    useEffect(() => {
        async function initializeSocket() {
            const user = await getUser();
            setUserId(user.id);

            try {
                const token = await SecureStore.getItemAsync("JWT_TOKEN");

                const newSocket = io(SOCKET_URL, {
                    auth: {
                        token,
                    },
                });

                setSocket(newSocket);

                newSocket.on('receive_message', (data: any) => {
                    const transformedMessage = {
                        _id: data.message.id,
                        text: data.message.text,
                        createdAt: new Date(data.message.timestamp),
                        user: {
                            _id: data.message.sender.id,
                            name: `${data.message.sender.first_name} ${data.message.sender.last_name}`,
                            avatar: data.message.sender.photo || undefined,
                        },
                    };
                    setMessages((prevMessages) => GiftedChat.append(prevMessages, [transformedMessage]));
                });

                newSocket.on('error', (error) => {
                    console.error('Socket error: ', error);
                });

                return () => {
                    newSocket.disconnect();
                };

            } catch (error) {
                console.error('Failed to initialize socket:', error);
            }
        }
        initializeSocket();
    }, [])

    const onSend = useCallback((messages: IMessage[]) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const sendMessage = (message: IMessage) => {
        if (socket) {
            socket.emit('send_message', { 
                chatId: id, 
                text: message.text 
            });
        }
    };

    const handleSend = (messages: IMessage[]) => {
        messages.forEach((message) => sendMessage(message));
    };


    return (
        <GiftedChat
            messages={messages}
            onSend={(messages: IMessage[]) => handleSend(messages)}
            user={{
                _id: userId,
            }}
        />
    );
}

const styles = StyleSheet.create({
});
