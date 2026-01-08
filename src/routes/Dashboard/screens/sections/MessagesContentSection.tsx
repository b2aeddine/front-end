import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    SearchIcon,
    StarIcon,
    MailIcon,
    SendIcon,
    FileIcon,
    AlertCircleIcon,
    TrashIcon,
    PlusIcon,
    CheckSquareIcon,
    InfoIcon,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { useAuth } from "../../../../lib/auth";
import { fetchConversations, getUnreadCount, Conversation } from "../../../../lib/queries/messaging";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PageHeader } from "../../../../components/ui/PageHeader";

// Labels for sidebar
const emailLabels = [
    { label: "Inbox", icon: MailIcon, count: 0, key: "inbox", active: true },
    { label: "Starred", icon: StarIcon, count: 0, key: "starred" },
    { label: "Sent", icon: SendIcon, count: 0, key: "sent" },
    { label: "Draft", icon: FileIcon, count: 0, key: "draft" },
    { label: "Spam", icon: AlertCircleIcon, count: 0, key: "spam" },
    { label: "Important", icon: AlertCircleIcon, count: 0, key: "important" },
    { label: "Bin", icon: TrashIcon, count: 0, key: "bin" },
];

const tagLabels = [
    { label: "Primary", color: "bg-[#fea38e]" },
    { label: "Social", color: "bg-[#00b69b]" },
    { label: "Work", color: "bg-[#5a8cff]" },
    { label: "Friends", color: "bg-[#ff9f43]" },
];

// Tag color mapping
const getTagStyle = (index: number): { label: string; color: string } => {
    const tags = [
        { label: "Primary", color: "bg-[#fea38e]/20 text-[#fea38e]" },
        { label: "Work", color: "bg-[#5a8cff]/20 text-[#5a8cff]" },
        { label: "Friends", color: "bg-[#00b69b]/20 text-[#00b69b]" },
        { label: "Social", color: "bg-[#ff9f43]/20 text-[#ff9f43]" },
    ];
    return tags[index % tags.length];
};

export const MessagesContentSection = (): JSX.Element => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeLabel, setActiveLabel] = useState("inbox");

    useEffect(() => {
        if (!user?.id) return;

        const loadMessages = async () => {
            setIsLoading(true);

            const { data: convData } = await fetchConversations();
            if (convData) {
                setConversations(convData);
            }

            const { count } = await getUnreadCount();
            setUnreadCount(count);

            setIsLoading(false);
        };

        loadMessages();
    }, [user?.id]);

    // Get the other participant for display
    const getOtherParticipant = (conv: Conversation) => {
        if (!user?.id) return null;
        return conv.participant1_id === user.id ? conv.participant2 : conv.participant1;
    };

    // Filter conversations by search
    const filteredConversations = conversations.filter(conv => {
        const other = getOtherParticipant(conv);
        const name = other?.display_name || other?.username || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleConversationClick = (conversationId: string) => {
        navigate(`/dashboard/messages/${conversationId}`);
    };

    // Update label counts
    const labelsWithCounts = emailLabels.map(label => ({
        ...label,
        count: label.key === 'inbox' ? unreadCount : label.count,
        active: label.key === activeLabel,
    }));

    return (
        <section className="relative flex flex-col w-full min-h-screen items-start bg-[#f8f5f0] isolate overflow-hidden">
            <DashboardHeader />

            {/* Content with decorative background */}
            <div className="flex flex-col items-start gap-2.5 relative w-full flex-1">
                <img
                    className="absolute top-0 left-0 w-full h-[1313px] object-cover md:object-none md:object-top -z-10"
                    alt="Main bg color"
                    src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
                />

                {/* PageHeader */}
                <PageHeader
                    title="Messages"
                    contextMessage="Consultez vos conversations avec vos clients et vendeurs"
                />

                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="w-full lg:w-[280px] lg:flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
                            {/* Compose Button */}
                            <Button className="w-full bg-[#fea38e] hover:bg-[#fea38e]/90 text-white rounded-lg mb-6 [font-family:'Nunito_Sans',Helvetica] font-semibold">
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Compose
                            </Button>

                            {/* My Email Section */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-3 [font-family:'Nunito_Sans',Helvetica]">My Email</h3>
                                <div className="space-y-1">
                                    {labelsWithCounts.map((item) => (
                                        <button
                                            key={item.key}
                                            onClick={() => setActiveLabel(item.key)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${item.active ? 'bg-[#fea38e]/10 text-[#fea38e]' : 'hover:bg-gray-50 text-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-4 h-4" />
                                                <span className="text-sm font-medium [font-family:'Nunito_Sans',Helvetica]">{item.label}</span>
                                            </div>
                                            {item.count > 0 && (
                                                <span className={`text-xs font-bold ${item.active ? 'text-[#fea38e]' : 'text-gray-400'}`}>
                                                    {item.count}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Labels Section */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-3 [font-family:'Nunito_Sans',Helvetica]">Label</h3>
                                <div className="space-y-2">
                                    {tagLabels.map((tag) => (
                                        <div key={tag.label} className="flex items-center gap-3 px-3 py-1">
                                            <div className={`w-3 h-3 rounded ${tag.color}`} />
                                            <span className="text-sm text-gray-600 [font-family:'Nunito_Sans',Helvetica]">{tag.label}</span>
                                        </div>
                                    ))}
                                    <button className="flex items-center gap-3 px-3 py-1 text-gray-400 hover:text-gray-600">
                                        <PlusIcon className="w-3 h-3" />
                                        <span className="text-sm [font-family:'Nunito_Sans',Helvetica]">Create New Label</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Search Bar */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="relative flex-1 max-w-md">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search mail"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-gray-50 border-none rounded-lg [font-family:'Nunito_Sans',Helvetica]"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                                        <CheckSquareIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                                        <InfoIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                                        <TrashIcon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages Table */}
                            <div className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <div className="p-8 text-center text-gray-500">Chargement...</div>
                                ) : filteredConversations.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">Aucun message</div>
                                ) : (
                                    filteredConversations.map((conv, index) => {
                                        const other = getOtherParticipant(conv);
                                        const tag = getTagStyle(index);
                                        const isUnread = index < 2; // Demo: first 2 are unread

                                        return (
                                            <div
                                                key={conv.id}
                                                onClick={() => handleConversationClick(conv.id)}
                                                className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                {/* Checkbox */}
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" onClick={(e) => e.stopPropagation()} />

                                                {/* Star */}
                                                <button onClick={(e) => { e.stopPropagation(); }} className="text-gray-300 hover:text-yellow-400">
                                                    <StarIcon className={`w-4 h-4 ${index === 3 || index === 5 ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                                </button>

                                                {/* Name */}
                                                <div className={`w-[150px] text-sm [font-family:'Nunito_Sans',Helvetica] ${isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                                                    {other?.display_name || other?.username || 'Utilisateur'}
                                                </div>

                                                {/* Tag */}
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${tag.color}`}>
                                                    {tag.label}
                                                </span>

                                                {/* Message Preview */}
                                                <div className={`flex-1 text-sm truncate [font-family:'Nunito_Sans',Helvetica] ${isUnread ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {conv.last_message?.content || 'Cliquez pour voir la conversation...'}
                                                </div>

                                                {/* Time */}
                                                <div className="text-xs text-gray-400 [font-family:'Nunito_Sans',Helvetica]">
                                                    {conv.last_message_at
                                                        ? new Date(conv.last_message_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                                                        : '--:--'
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
