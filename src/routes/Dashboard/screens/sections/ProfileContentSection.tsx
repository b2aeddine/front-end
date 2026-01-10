import { useState } from "react";
import { useAuth } from "../../../../lib/auth";
import { DashboardHeader } from "../../components/DashboardHeader";
import {
    User,
    Briefcase,
    GraduationCap,
    Award,
    FileText,
    Mail,
    Phone,
    Globe,
    MapPin,
    Pencil,
    Trash2,
    Eye,
    Plus,
    ChevronDown,
    Share2,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

type TabType = 'information' | 'experiences' | 'education' | 'skills' | 'social' | 'attachments';

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    logo?: string;
}

interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    grade: string;
    period: string;
    description: string;
    logo?: string;
}

interface Skill {
    id: string;
    name: string;
    level: string;
}

interface Attachment {
    id: string;
    name: string;
    type: string;
    size: string;
}

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: string;
}

// Mock data
const mockExperiences: Experience[] = [
    {
        id: '1',
        title: 'Sr. Product Designer',
        company: 'ShartTrip Inc.',
        location: 'Dhaka, Bangladesh',
        period: 'January 2022 to Present',
        description: "ShareTrip is the country's first and pioneer online travel aggregator (OTA). My goal was to craft a functional and delightful experience...",
        logo: '/rectangle3890i112-yl4s-200h.png',
    },
];

const mockEducation: Education[] = [
    {
        id: '1',
        school: 'California Institute of the Arts',
        degree: 'UX Design Fundamentals',
        field: 'UX Design',
        grade: 'A+',
        period: '2020 - 2021',
        description: 'This hands-on course examines how content is organized and structured to create an experience for a user...',
        logo: '/rectangle38901381-jb6-200h.png',
    },
];

const mockSkills: Skill[] = [
    { id: '1', name: 'UI Design', level: 'Expert' },
    { id: '2', name: 'User Research', level: 'Expert' },
    { id: '3', name: 'Figma', level: 'Avancé' },
    { id: '4', name: 'Prototypage', level: 'Expert' },
];

const mockAttachments: Attachment[] = [
    { id: '1', name: 'Resume-AnamoulRouf.pdf', type: 'Resume', size: '1.21 MB' },
    { id: '2', name: 'CaseStudy-01.pdf', type: 'Portfolio', size: '1.21 MB' },
];

const mockSocialLinks: SocialLink[] = [
    { id: '1', platform: 'Instagram', url: 'https://instagram.com/', icon: 'https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-8.svg' },
    { id: '2', platform: 'YouTube', url: 'https://youtube.com/', icon: 'https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-2.svg' },
    { id: '3', platform: 'TikTok', url: 'https://tiktok.com/', icon: 'https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-3.svg' },
    { id: '4', platform: 'LinkedIn', url: 'https://linkedin.com/', icon: 'https://c.animaapp.com/mjs9uq4eaVmanC/img/mdi-linkedin.svg' },
    { id: '5', platform: 'Facebook', url: 'https://facebook.com/', icon: 'https://c.animaapp.com/mjs9uq4eaVmanC/img/ic-baseline-facebook.svg' },
];

// Section icons
const sectionIcons = {
    information: User,
    experiences: Briefcase,
    education: GraduationCap,
    skills: Award,
    social: Share2,
    attachments: FileText,
};

// Colorful section icons from public page
const colorfulIcons = {
    experiences: "https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-experience.svg",
    education: "https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-education.svg",
    skills: "https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-skills.svg",
};

const tabs = [
    { id: 'information' as TabType, label: 'Information' },
    { id: 'experiences' as TabType, label: 'Expériences' },
    { id: 'education' as TabType, label: 'Formation' },
    { id: 'skills' as TabType, label: 'Compétences' },
    { id: 'social' as TabType, label: 'Réseaux sociaux' },
    { id: 'attachments' as TabType, label: 'Documents' },
];

export const ProfileContentSection = (): JSX.Element => {
    const { user, profile, roles } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('information');
    const [showAllExperiences, setShowAllExperiences] = useState(false);

    const p = profile as any;
    const displayName = p?.display_name || p?.username || user?.email?.split('@')[0] || 'Utilisateur';
    const primaryRole = roles?.find(r => r.status === 'active')?.role;
    const roleLabel = primaryRole === 'freelance' ? 'Freelance' : primaryRole === 'influencer' ? 'Influencer' : 'Membre';
    const email = user?.email || "email@example.com";
    const avatarUrl = p?.avatar_url || "/image11381-lkfl-400h.png";

    return (
        <section className="relative flex flex-col w-full min-h-screen items-start bg-[#f8f5f0] isolate overflow-hidden">
            <DashboardHeader />

            <div className="flex flex-col items-start gap-2.5 relative w-full flex-1">
                <img
                    className="absolute top-0 left-0 w-full h-[1313px] object-cover md:object-none md:object-top -z-10"
                    alt="Main bg color"
                    src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
                />

                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
                    {/* Page Title */}
                    <h1 className="dashboard-title">Mon Profil</h1>

                    {/* Main Content Grid */}
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Sidebar with Profile Photo + Navigation */}
                        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">

                            {/* Profile Photo Card - Like Public Page */}
                            <Card className="bg-white rounded-xl border-0 shadow-sm overflow-hidden">
                                <CardContent className="p-6 flex flex-col items-center gap-4">
                                    {/* Avatar with gradient ring */}
                                    <div className="relative w-32 h-32">
                                        <div className="absolute -top-2 -left-2 w-36 h-36 rounded-full bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />
                                        <div className="absolute w-full h-full top-0 left-0 rounded-full border-4 border-white overflow-hidden bg-white">
                                            <img
                                                src={avatarUrl}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Name and Role */}
                                    <div className="text-center">
                                        <h2 className="font-bold text-lg text-[#222325] [font-family:'Nunito_Sans',Helvetica]">
                                            {displayName}
                                        </h2>
                                        <p className="text-sm text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                                            {roleLabel}
                                        </p>
                                    </div>

                                    {/* Edit Photo Button */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-[#fea38e] text-[#fea38e] hover:bg-[#fea38e]/10 rounded-full"
                                    >
                                        <Pencil className="w-3 h-3 mr-1" />
                                        Modifier la photo
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Navigation Tabs */}
                            <Card className="bg-white rounded-xl border-0 shadow-sm overflow-hidden">
                                <CardContent className="p-2">
                                    <nav className="flex flex-col gap-1">
                                        {tabs.map((tab) => {
                                            const Icon = sectionIcons[tab.id];
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full ${
                                                        isActive
                                                            ? 'bg-[#fea38e] text-white shadow-md'
                                                            : 'text-[#606060] hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#9ca3af]'}`} />
                                                    <span className="font-semibold text-sm [font-family:'Nunito_Sans',Helvetica]">
                                                        {tab.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col gap-6">

                            {/* Basic Information */}
                            {activeTab === 'information' && (
                                <Card className="bg-white rounded-xl border-0 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                                        Informations de base
                                                    </h2>
                                                    <p className="text-sm text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                        Mettez à jour vos informations de profil
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="border-[#fea38e] text-[#fea38e] hover:bg-[#fea38e]/10 rounded-xl"
                                            >
                                                <Pencil className="w-4 h-4 mr-2" />
                                                Modifier
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[#fea38e]/10 flex items-center justify-center flex-shrink-0">
                                                    <Mail className="w-5 h-5 text-[#fea38e]" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">Email</p>
                                                    <p className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">{email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                    <User className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">Nom d'affichage</p>
                                                    <p className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">{displayName}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                                                    <Phone className="w-5 h-5 text-green-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">Téléphone</p>
                                                    <p className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">+33 6 12 34 56 78</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="w-5 h-5 text-purple-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">Localisation</p>
                                                    <p className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">Paris, France</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                                    <Globe className="w-5 h-5 text-orange-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">Site web</p>
                                                    <p className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">www.collabmarket.com</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                                                    <Briefcase className="w-5 h-5 text-pink-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">Rôle</p>
                                                    <p className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">{roleLabel}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Experiences */}
                            {activeTab === 'experiences' && (
                                <Card className="bg-white rounded-xl border-0 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={colorfulIcons.experiences}
                                                    alt="Experiences"
                                                    className="w-12 h-12"
                                                />
                                                <div>
                                                    <h2 className="text-lg font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                                        Expériences professionnelles
                                                    </h2>
                                                    <p className="text-sm text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                        Ajoutez vos expériences pour augmenter vos chances
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="border-[#fea38e] text-[#fea38e] hover:bg-[#fea38e]/10 rounded-xl"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {mockExperiences.map((exp) => (
                                                <div key={exp.id} className="p-4 bg-gray-50 rounded-xl">
                                                    <div className="flex items-start gap-4">
                                                        <img
                                                            src={exp.logo}
                                                            alt={exp.company}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <h3 className="font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">{exp.title}</h3>
                                                                    <p className="text-sm text-[#606060] [font-family:'Nunito_Sans',Helvetica]">{exp.company}</p>
                                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                                        {exp.location} · {exp.period}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <button className="text-[#9ca3af] hover:text-red-500 transition-colors">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                    <button className="text-[#fea38e] hover:text-[#fe8e76] transition-colors">
                                                                        <Pencil className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p className="mt-2 text-sm text-[#606060] [font-family:'Nunito_Sans',Helvetica]">
                                                                {exp.description}
                                                                <button className="text-[#fea38e] ml-1 hover:underline">voir plus</button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {mockExperiences.length > 1 && (
                                            <button
                                                onClick={() => setShowAllExperiences(!showAllExperiences)}
                                                className="mt-4 text-[#fea38e] font-semibold text-sm flex items-center gap-1 hover:underline [font-family:'Nunito_Sans',Helvetica]"
                                            >
                                                <ChevronDown className={`w-4 h-4 transition-transform ${showAllExperiences ? 'rotate-180' : ''}`} />
                                                Voir plus d'expériences
                                            </button>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Education */}
                            {activeTab === 'education' && (
                                <Card className="bg-white rounded-xl border-0 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={colorfulIcons.education}
                                                    alt="Education"
                                                    className="w-12 h-12"
                                                />
                                                <div>
                                                    <h2 className="text-lg font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                                        Formation & Certifications
                                                    </h2>
                                                    <p className="text-sm text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                        Ajoutez vos formations pour augmenter vos chances
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="border-[#fea38e] text-[#fea38e] hover:bg-[#fea38e]/10 rounded-xl"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {mockEducation.map((edu) => (
                                                <div key={edu.id} className="p-4 bg-gray-50 rounded-xl">
                                                    <div className="flex items-start gap-4">
                                                        <img
                                                            src={edu.logo}
                                                            alt={edu.school}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <h3 className="font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">{edu.school}</h3>
                                                                    <p className="text-sm text-[#606060] [font-family:'Nunito_Sans',Helvetica]">
                                                                        {edu.degree} · {edu.field}
                                                                    </p>
                                                                    <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                                        Note: {edu.grade} · {edu.period}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <button className="text-[#9ca3af] hover:text-red-500 transition-colors">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                    <button className="text-[#fea38e] hover:text-[#fe8e76] transition-colors">
                                                                        <Pencil className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p className="mt-2 text-sm text-[#606060] [font-family:'Nunito_Sans',Helvetica]">
                                                                {edu.description}
                                                                <button className="text-[#fea38e] ml-1 hover:underline">voir plus</button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Skills */}
                            {activeTab === 'skills' && (
                                <Card className="bg-white rounded-xl border-0 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={colorfulIcons.skills}
                                                    alt="Skills"
                                                    className="w-12 h-12"
                                                />
                                                <div>
                                                    <h2 className="text-lg font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                                        Compétences
                                                    </h2>
                                                    <p className="text-sm text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                        Ajoutez vos compétences pour augmenter vos chances
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="border-[#fea38e] text-[#fea38e] hover:bg-[#fea38e]/10 rounded-xl"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {mockSkills.map((skill) => (
                                                <div
                                                    key={skill.id}
                                                    className="px-4 py-2 bg-[#fea38e]/10 rounded-full flex items-center gap-2 group"
                                                >
                                                    <span className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">{skill.name}</span>
                                                    <span className="text-xs text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">{skill.level}</span>
                                                    <button className="text-[#9ca3af] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Social Networks */}
                            {activeTab === 'social' && (
                                <Card className="bg-white rounded-xl border-0 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center">
                                                    <Share2 className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                                        Réseaux sociaux
                                                    </h2>
                                                    <p className="text-sm text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                        Connectez vos réseaux sociaux pour plus de visibilité
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="border-[#fea38e] text-[#fea38e] hover:bg-[#fea38e]/10 rounded-xl"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {mockSocialLinks.map((social) => (
                                                <div
                                                    key={social.id}
                                                    className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 group hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                                                        <img
                                                            src={social.icon}
                                                            alt={social.platform}
                                                            className="w-6 h-6"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-[#202224] text-sm [font-family:'Nunito_Sans',Helvetica]">
                                                            {social.platform}
                                                        </p>
                                                        <p className="text-xs text-[#74767e] truncate [font-family:'Nunito_Sans',Helvetica]">
                                                            Connecté
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-[#9ca3af] hover:text-red-500 transition-colors p-1">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-[#fea38e] hover:text-[#fe8e76] transition-colors p-1">
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Add more platforms suggestion */}
                                        <div className="mt-6 p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
                                            <p className="text-sm text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                                                Ajoutez plus de réseaux sociaux pour augmenter votre visibilité
                                            </p>
                                            <div className="flex justify-center gap-3 mt-3">
                                                <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                                    <img
                                                        src="https://c.animaapp.com/mjs9uq4eaVmanC/img/ri-snapchat-fill.svg"
                                                        alt="Snapchat"
                                                        className="w-5 h-5 opacity-50"
                                                    />
                                                </button>
                                                <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                                    <img
                                                        src="https://c.animaapp.com/mjs9uq4eaVmanC/img/mdi-pinterest.svg"
                                                        alt="Pinterest"
                                                        className="w-5 h-5 opacity-50"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Attachments */}
                            {activeTab === 'attachments' && (
                                <Card className="bg-white rounded-xl border-0 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                                                    <FileText className="w-6 h-6 text-green-500" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                                        Documents
                                                    </h2>
                                                    <p className="text-sm text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                        Ajoutez vos documents (CV, portfolio, etc.)
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="border-[#fea38e] text-[#fea38e] hover:bg-[#fea38e]/10 rounded-xl"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            {mockAttachments.map((attachment) => (
                                                <div key={attachment.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                                            <FileText className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-[#202224] [font-family:'Nunito_Sans',Helvetica]">{attachment.name}</h3>
                                                            <p className="text-xs text-[#9ca3af] [font-family:'Nunito_Sans',Helvetica]">
                                                                {attachment.type} · {attachment.size}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button className="text-[#9ca3af] hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-[#fea38e] hover:text-[#fe8e76] transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-[#fea38e] hover:text-[#fe8e76] transition-colors">
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
