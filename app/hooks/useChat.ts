import { useEffect, useState } from 'react';
import { getChat } from '@/app/components/requestHandler';
import { IMessage } from 'react-native-gifted-chat';

export function useChat(chatId: string) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const chat = await getChat(chatId);
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
        setMessages(transformedMessages);
      } catch (err) {
        console.error('Failed to fetch chat:', err);
      }
    };

    fetchChat();
  }, [chatId]);

  return { messages, setMessages };
}
