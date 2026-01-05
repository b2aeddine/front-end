import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    StarIcon,
    PrinterIcon,
    TrashIcon,
    MicIcon,
    PaperclipIcon,
    ImageIcon,
    SendIcon,
    MoreVerticalIcon,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { useAuth } from "../../../../lib/auth";
import {
    fetchMessages,
    sendMessage,
    markMessagesAsRead,
    subscribeToMessages,
    Message,
} from "../../../../lib/queries/messaging";
import { supabase } from "../../../../lib/supabaseClient";

interface MessageDetailContentSectionProps {
    conversationId: string;
}

export const MessageDetailContentSection = ({ conversationId }: MessageDetailContentSectionProps): JSX.Element => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [otherUser, setOtherUser] = useState<{ display_name?: string; username?: string } | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load messages and conversation info
    useEffect(() => {
        if (!conversationId || !user?.id) return;

        const loadMessages = async () => {
            setIsLoading(true);

            // Fetch messages
            const { data: messagesData } = await fetchMessages(conversationId);
            if (messagesData) {
                setMessages(messagesData);
            }

            // Mark as read
            await markMessagesAsRead(conversationId);

            // Get conversation to find other user
            const { data: conv } = await supabase
                .from('conversations')
                .select(`
                    participant1:profiles!participant1_id (display_name, username),
                    participant2:profiles!participant2_id (display_name, username),
                    participant1_id,
                    participant2_id
                `)
                .eq('id', conversationId)
                .single();

            if (conv) {
                const other = conv.participant1_id === user.id ? conv.participant2 : conv.participant1;
                setOtherUser(other as { display_name?: string; username?: string });
            }

            setIsLoading(false);
        };

        loadMessages();

        // Subscribe to new messages
        const unsubscribe = subscribeToMessages(conversationId, (newMsg) => {
            setMessages(prev => [...prev, newMsg]);
        });

        return () => {
            unsubscribe();
        };
    }, [conversationId, user?.id]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        const { data, error } = await sendMessage(conversationId, newMessage.trim());

        if (data && !error) {
            setMessages(prev => [...prev, data]);
            setNewMessage("");
        }

        setIsSending(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const displayName = otherUser?.display_name || otherUser?.username || 'Utilisateur';

    return (
        <div className="flex-1 w-full bg-[#F5F5F0] min-h-screen flex flex-col relative">
            {/* Decorative Background */}
            <img
                className="absolute top-0 left-0 w-full h-[1313.24px] object-cover -z-10 pointer-events-none"
                alt="Main bg color"
                src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
            />

            {/* Header */}
            <header className="w-full h-[70px] bg-[#f8f5f0] border-b border-[#97979766] px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/dashboard/messages')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-900 [font-family:'Nunito_Sans',Helvetica]">
                            {displayName}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[#00b69b]/20 text-[#00b69b]">
                            Friends
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                        <PrinterIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                        <StarIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                        <TrashIcon className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
                <div className="max-w-3xl mx-auto space-y-4">
                    {isLoading ? (
                        <div className="text-center text-gray-500 py-8">Chargement des messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            Aucun message. Commencez la conversation !
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isOwn = msg.sender_id === user?.id;

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                                        {/* Avatar */}
                                        {!isOwn && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                                        )}

                                        {/* Message Bubble */}
                                        <div
                                            className={`rounded-2xl px-4 py-3 ${
                                                isOwn
                                                    ? 'bg-[#fea38e] text-white rounded-br-sm'
                                                    : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                                            }`}
                                        >
                                            <p className="text-sm [font-family:'Inter',Helvetica] leading-relaxed">
                                                {msg.content}
                                            </p>
                                            <div className={`flex items-center gap-2 mt-1 ${isOwn ? 'justify-end' : ''}`}>
                                                <span className={`text-xs ${isOwn ? 'text-white/70' : 'text-gray-400'}`}>
                                                    {new Date(msg.created_at).toLocaleTimeString('fr-FR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={`w-4 h-4 p-0 ${isOwn ? 'text-white/50 hover:text-white/70' : 'text-gray-300 hover:text-gray-500'}`}
                                                >
                                                    <MoreVerticalIcon className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 bg-white px-8 py-4">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                        <MicIcon className="w-5 h-5" />
                    </Button>

                    <div className="flex-1 relative">
                        <Input
                            placeholder="Write message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="pr-20 bg-gray-50 border-none rounded-lg [font-family:'Inter',Helvetica]"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-gray-600">
                                <PaperclipIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-gray-600">
                                <ImageIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isSending}
                        className="bg-[#fea38e] hover:bg-[#fea38e]/90 text-white rounded-lg px-6"
                    >
                        Send
                        <SendIcon className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
