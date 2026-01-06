import React from 'react'
import { Helmet } from "react-helmet";
import { useAuth } from "../../../../lib/auth";
import './ProfileContentSection.css'

export const ProfileContentSection = (): JSX.Element => {
    const { user, profile, roles } = useAuth();

    // Dynamic data
    const p = profile as any;
    const displayName = p?.display_name || p?.username || user?.email?.split('@')[0] || 'Anamoul Rouf';

    // Role logic
    const primaryRole = roles?.find(r => r.status === 'active')?.role;
    const roleLabel = primaryRole === 'freelance' ? 'Freelance' : primaryRole === 'influencer' ? 'Influencer' : 'Product Designer';
    const avatarUrl = p?.avatar_url || "/image11381-lkfl-400h.png";
    const email = user?.email || "anamoulrouf.bd@gmail.com";

    // Replicate Revenue Page Header Layout EXACTLY
    return (
        <section className="flex flex-col w-full items-start border border-solid border-[#9797974c]">
            {/* Header - EXACT COPY from RevenueContentSection */}
            <header className="relative w-full h-[70px] bg-[#f8f5f0] border-b border-[#97979766] px-8 flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src={avatarUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>

            {/* Content with decorative background - EXACT COPY from RevenueContentSection */}
            <div className="flex flex-col items-start gap-2.5 relative w-full min-h-screen">
                <img
                    className="absolute top-0 left-0 w-full h-[1313.24px] object-cover -z-10"
                    alt="Main bg color"
                    src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
                />

                {/* Main Content Area */}
                {/* Replaced Revenue Widgets with Profile Content */}
                <div className="w-full max-w-7xl mx-auto px-8 py-8 flex flex-col gap-8">

                    {/* ORIGINAL PROFILE CONTENT INJECTED HERE */}
                    <div className="frame14706-thq-frame14706-elm w-full">
                        <span className="frame14706-thq-text-elm10">Mon Profil</span>
                        <div className="frame14706-thq-body-elm">
                            <div className="frame14706-thq-profilebanner-elm">
                                <div
                                    className="frame14706-thq-image1-elm bg-cover bg-center"
                                    style={{ backgroundImage: `url('/image11381-lkfl-400h.png')` }}
                                />
                                <div className="frame14706-thq-profile-elm1">
                                    <div className="frame14706-thq-background-elm1">
                                        <div className="frame14706-thq-label-elm1">
                                            <img
                                                src="/gradienti138-v7ks-200h.png"
                                                alt="GradientI138"
                                                className="frame14706-thq-gradient-elm1"
                                            />
                                            <img
                                                src="/gradienti138-t6v-200h.png"
                                                alt="GradientI138"
                                                className="frame14706-thq-gradient-elm2"
                                            />
                                            <div className="frame14706-thq-joschamayer-elm1">
                                                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                            <div className="frame14706-thq-container-elm1"></div>
                                        </div>
                                    </div>
                                    <div className="frame14706-thq-info-elm">
                                        <span className="frame14706-thq-text-elm11">{displayName}</span>
                                        <span className="frame14706-thq-text-elm12">
                                            {roleLabel}
                                        </span>
                                    </div>
                                    <div className="frame14706-thq-right-elm1">
                                        <div className="frame14706-thq-icon-elm10">
                                            <div className="frame14706-thq-share2-elm">
                                                <div className="frame14706-thq-share-elm">
                                                    <img
                                                        src="/vectori138-7dli.svg"
                                                        alt="VectorI138"
                                                        className="frame14706-thq-vector-elm10"
                                                    />
                                                    <img
                                                        src="/vectori138-ljb.svg"
                                                        alt="VectorI138"
                                                        className="frame14706-thq-vector-elm11"
                                                    />
                                                    <img
                                                        src="/vectori138-tfc.svg"
                                                        alt="VectorI138"
                                                        className="frame14706-thq-vector-elm12"
                                                    />
                                                    <img
                                                        src="/vectori138-aly.svg"
                                                        alt="vectorI138"
                                                        className="frame14706-thq-vector-elm13"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="frame14706-thq-icon-elm11">
                                            <div className="frame14706-thq-iconmorecircle2-elm">
                                                <div className="frame14706-thq-vuesaxboldmorecircle-elm">
                                                    <div className="frame14706-thq-morecircle-elm">
                                                        <img
                                                            src="/vectori138-nlpi.svg"
                                                            alt="VectorI138"
                                                            className="frame14706-thq-vector-elm14"
                                                        />
                                                        <img
                                                            src="/vectori138-zreb.svg"
                                                            alt="VectorI138"
                                                            className="frame14706-thq-vector-elm15"
                                                        />
                                                        <img
                                                            src="/vectori138-tc3m.svg"
                                                            alt="VectorI138"
                                                            className="frame14706-thq-vector-elm16"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame14706-thq-content-elm10">
                                <div className="frame14706-thq-left-elm">
                                    <div className="frame14706-thq-pagesubmenu-profile-elm">
                                        <div className="frame14706-thq-menuitem-elm1">
                                            <button className="frame14706-thq-button-elm10">
                                                <button className="frame14706-thq-base-button-elm10">
                                                    <div className="frame14706-thq-content-elm11">
                                                        <div className="frame14706-thq-profile-elm2">
                                                            <div className="frame14706-thq-vuesaxboldframe-elm">
                                                                <div className="frame14706-thq-frame-elm">
                                                                    <img
                                                                        src="/vectori138-7eb4.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm17"
                                                                    />
                                                                    <img
                                                                        src="/vectori138-nvst.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm18"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="frame14706-thq-text-elm13 BTNLSemi-Bold">
                                                            Information
                                                        </span>
                                                    </div>
                                                </button>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-menuitem-elm2">
                                            <button className="frame14706-thq-button-elm11">
                                                <button className="frame14706-thq-base-button-elm11">
                                                    <div className="frame14706-thq-content-elm12">
                                                        <div className="frame14706-thq-briefcase-elm">
                                                            <div className="frame14706-thq-vuesaxboldbriefcase-elm">
                                                                <img
                                                                    src="/vectori138-tqs9.svg"
                                                                    alt="VectorI138"
                                                                    className="frame14706-thq-vector-elm19"
                                                                />
                                                                <img
                                                                    src="/vectori138-eaps.svg"
                                                                    alt="VectorI138"
                                                                    className="frame14706-thq-vector-elm20"
                                                                />
                                                            </div>
                                                        </div>
                                                        <span className="frame14706-thq-text-elm14 BTNLSemi-Bold">
                                                            Experiences
                                                        </span>
                                                    </div>
                                                </button>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-menuitem-elm3">
                                            <button className="frame14706-thq-button-elm12">
                                                <button className="frame14706-thq-base-button-elm12">
                                                    <div className="frame14706-thq-content-elm13">
                                                        <div className="frame14706-thq-cup-elm1">
                                                            <div className="frame14706-thq-vuesaxboldcup-elm">
                                                                <div className="frame14706-thq-cup-elm2">
                                                                    <img
                                                                        src="/vectori138-op7o.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm21"
                                                                    />
                                                                    <img
                                                                        src="/vectori138-1zjg.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm22"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="frame14706-thq-text-elm15 BTNLSemi-Bold">
                                                            Eduction
                                                        </span>
                                                    </div>
                                                </button>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-menuitem-elm4">
                                            <button className="frame14706-thq-button-elm13">
                                                <button className="frame14706-thq-base-button-elm13">
                                                    <div className="frame14706-thq-content-elm14">
                                                        <div className="frame14706-thq-crown2-elm">
                                                            <div className="frame14706-thq-vuesaxboldcrown-elm">
                                                                <div className="frame14706-thq-crown-elm">
                                                                    <img
                                                                        src="/vectori138-if4.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm23"
                                                                    />
                                                                    <img
                                                                        src="/vectori138-ge9d.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm24"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="frame14706-thq-text-elm16 BTNLSemi-Bold">
                                                            Skills
                                                        </span>
                                                    </div>
                                                </button>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-menuitem-elm5">
                                            <button className="frame14706-thq-button-elm14">
                                                <button className="frame14706-thq-base-button-elm14">
                                                    <div className="frame14706-thq-content-elm15">
                                                        <div className="frame14706-thq-icondocumenttext-elm1">
                                                            <div className="frame14706-thq-vuesaxbolddocumenttext-elm1">
                                                                <div className="frame14706-thq-documenttext-elm1">
                                                                    <img
                                                                        src="/vectori138-u73a.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm25"
                                                                    />
                                                                    <img
                                                                        src="/vectori138-vpgh.svg"
                                                                        alt="VectorI138"
                                                                        className="frame14706-thq-vector-elm26"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="frame14706-thq-text-elm17 BTNLSemi-Bold">
                                                            Attachments
                                                        </span>
                                                    </div>
                                                </button>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN CONTENT */}
                                <div className="frame14706-thq-right-elm2">

                                    {/* BASIC INFO */}
                                    <div className="frame14706-thq-basicinfo-elm">
                                        <div className="frame14706-thq-title2-elm1">
                                            <div className="frame14706-thq-background-elm2">
                                                <div className="frame14706-thq-label-elm2">
                                                    <img
                                                        src="/gradienti138-uhlvj-200h.png"
                                                        alt="GradientI138"
                                                        className="frame14706-thq-gradient-elm3"
                                                    />
                                                    <img
                                                        src="/gradienti138-12kt-200h.png"
                                                        alt="GradientI138"
                                                        className="frame14706-thq-gradient-elm4"
                                                    />
                                                    <div className="frame14706-thq-joschamayer-elm2"></div>
                                                    <div className="frame14706-thq-container-elm2"></div>
                                                </div>
                                            </div>
                                            <div className="frame14706-thq-content-elm16">
                                                <span className="frame14706-thq-text-elm18 H4medium">
                                                    Basic Information
                                                </span>
                                                <span className="frame14706-thq-text-elm19 PBodySregular">
                                                    Update profile information
                                                </span>
                                            </div>
                                            <div className="frame14706-thq-content-elm17">
                                                <span className="frame14706-thq-text-elm20 BTNLSemi-Bold">
                                                    Editer
                                                </span>
                                            </div>
                                        </div>
                                        <div className="frame14706-thq-content-elm18">
                                            <div className="frame14706-thq-col2-elm1">
                                                <div className="frame14706-thq-content-elm19">
                                                    <span className="frame14706-thq-text-elm21 PBodySregular">
                                                        Email Address
                                                    </span>
                                                    <span className="frame14706-thq-text-elm22 PBodyMmedium">
                                                        {email}
                                                    </span>
                                                </div>
                                                <div className="frame14706-thq-content-elm20">
                                                    <span className="frame14706-thq-text-elm23 PBodySregular">
                                                        Phone Number
                                                    </span>
                                                    <span className="frame14706-thq-text-elm24 PBodyMmedium">
                                                        +33 6 12 34 56 78
                                                    </span>
                                                </div>
                                                <div className="frame14706-thq-content-elm21">
                                                    <span className="frame14706-thq-text-elm25 PBodySregular">
                                                        Website
                                                    </span>
                                                    <span className="frame14706-thq-text-elm26 PBodyMmedium">
                                                        www.collabmarket.com
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="frame14706-thq-col1-elm1">
                                                <div className="frame14706-thq-content-elm22">
                                                    <span className="frame14706-thq-text-elm27 PBodySregular">
                                                        Gender
                                                    </span>
                                                    <span className="frame14706-thq-text-elm28 PBodyMmedium">
                                                        Male
                                                    </span>
                                                </div>
                                                <div className="frame14706-thq-content-elm23">
                                                    <span className="frame14706-thq-text-elm29 PBodySregular">
                                                        Location
                                                    </span>
                                                    <span className="frame14706-thq-text-elm30 PBodyMmedium">
                                                        Paris, France
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* EXPERIENCES */}
                                    <div className="frame14706-thq-experience-elm1">
                                        <div className="frame14706-thq-title2-elm2">
                                            <div className="frame14706-thq-coloriconexperience-elm">
                                                <div className="frame14706-thq-experience-elm2">
                                                    <div className="frame14706-thq-group12918-elm">
                                                        <img src="/path40241381-9z3ki.svg" alt="Path40241381" className="frame14706-thq-path4024-elm" />
                                                        <img src="/path40251381-j05h.svg" alt="Path40251381" className="frame14706-thq-path4025-elm" />
                                                        <img src="/path40261381-tj5.svg" alt="Path40261381" className="frame14706-thq-path4026-elm" />
                                                        <img src="/path40271381-27a.svg" alt="Path40271381" className="frame14706-thq-path4027-elm" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="frame14706-thq-content-elm24">
                                                <span className="frame14706-thq-text-elm31 H4medium">Experiences</span>
                                                <span className="frame14706-thq-text-elm32 PBodySregular">Add experience to increase the chance of hiring</span>
                                            </div>
                                            <button className="frame14706-thq-base-button-elm15">
                                                <div className="frame14706-thq-content-elm25">
                                                    <span className="frame14706-thq-text-elm33 BTNLSemi-Bold">Add Experience</span>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-joblist-elm">
                                            <div className="frame14706-thq-jobinfocard2-elm">
                                                <div className="frame14706-thq-content-elm26">
                                                    <img src="/rectangle3890i112-yl4s-200h.png" alt="Rectangle3890I112" className="frame14706-thq-rectangle3890-elm1" />
                                                    <div className="frame14706-thq-jobinfo-elm1">
                                                        <span className="frame14706-thq-text-elm34 H5medium">Sr. Product Designer</span>
                                                        <div className="frame14706-thq-company-elm1">
                                                            <span className="frame14706-thq-text-elm35 PBodySregular">ShartTrip Inc.</span>
                                                            <div className="frame14706-thq-company-elm2">
                                                                <span className="frame14706-thq-text-elm36 PBodySregular">Dhaka, Bangladesh</span>
                                                                <span className="frame14706-thq-text-elm37 PBodySregular">January 2022 to Present</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="frame14706-thq-action-elm1">
                                                        <button className="frame14706-thq-button-elm15">
                                                            <button className="frame14706-thq-base-button-elm16">
                                                                <div className="frame14706-thq-content-elm27">
                                                                    <span className="frame14706-thq-text-elm38 BTNMSemi-Bold">Delete</span>
                                                                </div>
                                                            </button>
                                                        </button>
                                                        <button className="frame14706-thq-button-elm16">
                                                            <button className="frame14706-thq-base-button-elm17">
                                                                <div className="frame14706-thq-content-elm28">
                                                                    <span className="frame14706-thq-text-elm39 BTNMSemi-Bold">edit</span>
                                                                </div>
                                                            </button>
                                                        </button>
                                                    </div>
                                                </div>
                                                <span className="frame14706-thq-text-elm40">
                                                    <span className="frame14706-thq-text-elm41">ShareTrip is the country’s first and pioneer online travel aggregator (OTA). My goal was to craft a functional and delightful experience...</span>
                                                    <span>see more</span>
                                                </span>
                                            </div>
                                            <img src="/vector11121-5jyi.svg" alt="Vector11121" className="frame14706-thq-vector1-elm1" />
                                        </div>
                                        <button className="frame14706-thq-button-elm17">
                                            <button className="frame14706-thq-base-button-elm18">
                                                <div className="frame14706-thq-content-elm29">
                                                    <span className="frame14706-thq-text-elm44 BTNMSemi-Bold">show 2 more experiences</span>
                                                </div>
                                            </button>
                                        </button>
                                    </div>

                                    {/* EDUCATION */}
                                    <div className="frame14706-thq-education-elm1">
                                        <div className="frame14706-thq-title2-elm3">
                                            <div className="frame14706-thq-coloriconeducation-elm">
                                                {/* SVG cluster for Education Icon */}
                                                <div className="frame14706-thq-education-elm2">
                                                    <img src="/path40281381-1acg.svg" className="frame14706-thq-path4028-elm" />
                                                    <img src="/path40301381-vd6.svg" className="frame14706-thq-path4030-elm" />
                                                    <img src="/path40311381-9rd9.svg" className="frame14706-thq-path4031-elm" />
                                                </div>
                                                <div className="frame14706-thq-group12923-elm">
                                                    <img
                                                        src="/path40331381-4eu.svg"
                                                        alt="Path40331381"
                                                        className="frame14706-thq-path4033-elm"
                                                    />
                                                    <img
                                                        src="/path40341381-9zk.svg"
                                                        alt="Path40341381"
                                                        className="frame14706-thq-path4034-elm"
                                                    />
                                                    <img
                                                        src="/path40351381-wteb.svg"
                                                        alt="Path40351381"
                                                        className="frame14706-thq-path4035-elm"
                                                    />
                                                </div>
                                                <img
                                                    src="/path40321381-ecen.svg"
                                                    className="frame14706-thq-path4032-elm"
                                                />
                                                <img
                                                    src="/path40361381-jy.svg"
                                                    className="frame14706-thq-path4036-elm"
                                                />
                                                <img
                                                    src="/path40411381-poub.svg"
                                                    className="frame14706-thq-path4041-elm"
                                                />
                                                <img
                                                    src="/path40371381-uemwm.svg"
                                                    className="frame14706-thq-path4037-elm"
                                                />
                                                <img
                                                    src="/path40381381-psxn.svg"
                                                    className="frame14706-thq-path4038-elm"
                                                />
                                                <img
                                                    src="/path40391381-bnn.svg"
                                                    className="frame14706-thq-path4039-elm"
                                                />
                                                <img
                                                    src="/path40401381-wal5.svg"
                                                    className="frame14706-thq-path4040-elm"
                                                />
                                            </div>
                                            <div className="frame14706-thq-content-elm30">
                                                <span className="frame14706-thq-text-elm45 H4medium">Education &amp; Certifications</span>
                                                <span className="frame14706-thq-text-elm46 PBodySregular">Add education to increase the chance of hiring</span>
                                            </div>
                                            <button className="frame14706-thq-base-button-elm19">
                                                <div className="frame14706-thq-content-elm31">
                                                    <span className="frame14706-thq-text-elm47 BTNLSemi-Bold">
                                                        Add Education
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-edulist-elm1">
                                            <div className="frame14706-thq-eduinfocard2-elm">
                                                <div className="frame14706-thq-content-elm32">
                                                    <img
                                                        src="/rectangle38901381-jb6-200h.png"
                                                        alt="Rectangle38901381"
                                                        className="frame14706-thq-rectangle3890-elm2"
                                                    />
                                                    <div className="frame14706-thq-jobinfo-elm2">
                                                        <span className="frame14706-thq-text-elm48 H5medium">
                                                            California Institute of the Arts
                                                        </span>
                                                        <div className="frame14706-thq-company-elm3">
                                                            <div className="frame14706-thq-company-elm4">
                                                                <span className="frame14706-thq-text-elm49 PBodySregular">
                                                                    UX Design Fundamentals
                                                                </span>
                                                                <span className="frame14706-thq-text-elm50 PBodySregular">
                                                                    UX Design
                                                                </span>
                                                            </div>
                                                            <div className="frame14706-thq-company-elm5">
                                                                <span className="frame14706-thq-text-elm51 PBodySregular">
                                                                    Grade: A+
                                                                </span>
                                                                <span className="frame14706-thq-text-elm52 PBodySregular">
                                                                    2020 - 2021
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="frame14706-thq-action-elm2">
                                                        <button className="frame14706-thq-button-elm18">
                                                            <button className="frame14706-thq-base-button-elm20">
                                                                <div className="frame14706-thq-content-elm33">
                                                                    <span className="frame14706-thq-text-elm53 BTNMSemi-Bold">
                                                                        Delete
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </button>
                                                        <button className="frame14706-thq-button-elm19">
                                                            <button className="frame14706-thq-base-button-elm21">
                                                                <div className="frame14706-thq-content-elm34">
                                                                    <span className="frame14706-thq-text-elm54 BTNMSemi-Bold">
                                                                        edit
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </button>
                                                    </div>
                                                </div>
                                                <span className="frame14706-thq-text-elm55">
                                                    <span className="frame14706-thq-text-elm56">
                                                        This hands-on course examines how content is organized
                                                        and structured to create an experience for a user, and
                                                        what role the designer plays in creating and shaping
                                                        user experience. You will be led through a condensed…
                                                    </span>
                                                    <span className="frame14706-thq-text-elm57">
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: ' ',
                                                            }}
                                                        />
                                                    </span>
                                                    <span>see more</span>
                                                </span>
                                            </div>
                                            <img
                                                src="/vector11121-p49h.svg"
                                                alt="Vector11121"
                                                className="frame14706-thq-vector1-elm2"
                                            />
                                        </div>
                                        <button className="frame14706-thq-button-elm20">
                                            <button className="frame14706-thq-base-button-elm22">
                                                <div className="frame14706-thq-content-elm35">
                                                    <div className="frame14706-thq-iconarrowleft-elm">
                                                        <div className="frame14706-thq-vuesaxlineararrowleft-elm">
                                                            <div className="frame14706-thq-arrowleft-elm">
                                                                <img
                                                                    src="/vectori138-x7g.svg"
                                                                    alt="VectorI138"
                                                                    className="frame14706-thq-vector-elm27"
                                                                />
                                                                <img
                                                                    src="/vectori138-ab4.svg"
                                                                    alt="VectorI138"
                                                                    className="frame14706-thq-vector-elm28"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="frame14706-thq-text-elm59 BTNMSemi-Bold">
                                                        Button
                                                    </span>
                                                    <div className="frame14706-thq-iconarrowright-elm">
                                                        <div className="frame14706-thq-vuesaxlineararrowright-elm">
                                                            <div className="frame14706-thq-arrowright-elm">
                                                                <img
                                                                    src="/vectori138-fhvp.svg"
                                                                    alt="VectorI138"
                                                                    className="frame14706-thq-vector-elm29"
                                                                />
                                                                <img
                                                                    src="/vectori138-vgmu.svg"
                                                                    alt="VectorI138"
                                                                    className="frame14706-thq-vector-elm30"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </button>
                                    </div>

                                    {/* SKILLS */}
                                    <div className="frame14706-thq-skills-elm1">
                                        <div className="frame14706-thq-title2-elm4">
                                            <div className="frame14706-thq-coloriconskills-elm">
                                                <div className="frame14706-thq-skills-elm2">
                                                    <div className="frame14706-thq-group12901-elm">
                                                        <div className="frame14706-thq-group12899-elm">
                                                            <img src="/path40101381-f4ty.svg" className="frame14706-thq-path4010-elm1" />
                                                            <img src="/path40111381-ty9.svg" className="frame14706-thq-path4011-elm1" />
                                                            <img src="/path40121381-g21.svg" className="frame14706-thq-path4012-elm1" />
                                                            <img src="/path40131381-hf7s.svg" className="frame14706-thq-path4013-elm1" />
                                                        </div>
                                                        <div className="frame14706-thq-group12900-elm">
                                                            <img src="/path40101381-o70j.svg" className="frame14706-thq-path4010-elm2" />
                                                            <img src="/path40111381-385l.svg" className="frame14706-thq-path4011-elm2" />
                                                            <img src="/path40121381-k2tk.svg" className="frame14706-thq-path4012-elm2" />
                                                            <img src="/path40131381-ikb.svg" className="frame14706-thq-path4013-elm2" />
                                                        </div>
                                                        <div className="frame14706-thq-group12898-elm">
                                                            <img src="/path40101381-gba9.svg" className="frame14706-thq-path4010-elm3" />
                                                            <img src="/path40111381-4km7.svg" className="frame14706-thq-path4011-elm3" />
                                                            <img src="/path40121381-4rhr.svg" className="frame14706-thq-path4012-elm3" />
                                                            <img src="/path40131381-3mw7.svg" className="frame14706-thq-path4013-elm3" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="frame14706-thq-content-elm36">
                                                <span className="frame14706-thq-text-elm60 H4medium">Skills</span>
                                                <span className="frame14706-thq-text-elm61 PBodySregular">Add skills to increase the chance of hiring</span>
                                            </div>
                                            <button className="frame14706-thq-base-button-elm23">
                                                <div className="frame14706-thq-content-elm37">
                                                    <span className="frame14706-thq-text-elm62 BTNLSemi-Bold">
                                                        Add Skills
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-content-elm38">
                                            <div className="frame14706-thq-col1-elm2">
                                                <div className="frame14706-thq-skillinfocard1-elm1">
                                                    <div className="frame14706-thq-skillinfo-elm1">
                                                        <span className="frame14706-thq-text-elm63 H5medium">UI Design</span>
                                                        <span className="frame14706-thq-text-elm64 PBodySregular">Expert</span>
                                                    </div>
                                                    <div className="frame14706-thq-action-elm3">
                                                        <div className="frame14706-thq-icon-elm12">
                                                            <img src="/vectori112-ezx9.svg" className="frame14706-thq-vector-elm31" />
                                                        </div>
                                                        <div className="frame14706-thq-icon-elm13">
                                                            <img src="/vectori112-sq7.svg" className="frame14706-thq-vector-elm32" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="frame14706-thq-skillinfocard1-elm2">
                                                    <div className="frame14706-thq-skillinfo-elm2">
                                                        <span className="frame14706-thq-text-elm65 H5medium">User Research</span>
                                                        <span className="frame14706-thq-text-elm66 PBodySregular">Expert</span>
                                                    </div>
                                                    <div className="frame14706-thq-action-elm4">
                                                        <div className="frame14706-thq-icon-elm14">
                                                            <img src="/vectori112-f8m4.svg" className="frame14706-thq-vector-elm33" />
                                                        </div>
                                                        <div className="frame14706-thq-icon-elm15">
                                                            <img src="/vectori112-hpxo.svg" className="frame14706-thq-vector-elm34" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ATTACHMENTS */}
                                    <div className="frame14706-thq-attachments-elm">
                                        <div className="frame14706-thq-title2-elm5">
                                            <div className="frame14706-thq-content-elm40">
                                                <span className="frame14706-thq-text-elm72 H4medium">
                                                    Attachments
                                                </span>
                                            </div>
                                            <button className="frame14706-thq-base-button-elm25">
                                                <div className="frame14706-thq-content-elm41">
                                                    <span className="frame14706-thq-text-elm73 BTNLSemi-Bold">
                                                        Add File
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="frame14706-thq-edulist-elm2">
                                            <div className="frame14706-thq-attachmentcard1-elm1">
                                                <div className="frame14706-thq-content-elm43">
                                                    <div className="frame14706-thq-icon-elm20">
                                                        <div className="frame14706-thq-icondocumenttext-elm2">
                                                            <div className="frame14706-thq-vuesaxbolddocumenttext-elm2">
                                                                <div className="frame14706-thq-documenttext-elm2">
                                                                    <img
                                                                        src="/vectori112-gz1.svg"
                                                                        alt="VectorI112"
                                                                        className="frame14706-thq-vector-elm39"
                                                                    />
                                                                    <img
                                                                        src="/vectori112-m7d.svg"
                                                                        alt="VectorI112"
                                                                        className="frame14706-thq-vector-elm40"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="frame14706-thq-skillinfo-elm5">
                                                        <span className="frame14706-thq-text-elm74 PBodyMmedium">
                                                            Resume-AnamoulRouf.pdf
                                                        </span>
                                                        <div className="frame14706-thq-company-elm6">
                                                            <span className="frame14706-thq-text-elm75 PBodySregular">
                                                                Resume
                                                            </span>
                                                            <span className="frame14706-thq-text-elm76 PBodySregular">
                                                                1.21 MB
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="frame14706-thq-action-elm7">
                                                        <div className="frame14706-thq-icon-elm21">
                                                            <div className="frame14706-thq-icontrushsquare-elm5">
                                                                <div className="frame14706-thq-vuesaxboldtrushsquare-elm5">
                                                                    <div className="frame14706-thq-trushsquare-elm5">
                                                                        <img
                                                                            src="/vectori112-jnin.svg"
                                                                            alt="VectorI112"
                                                                            className="frame14706-thq-vector-elm41"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="frame14706-thq-icon-elm22">
                                                            <div className="frame14706-thq-eye-elm1">
                                                                <div className="frame14706-thq-vuesaxboldeye-elm1">
                                                                    <img
                                                                        src="/vectori112-mva4.svg"
                                                                        alt="VectorI112"
                                                                        className="frame14706-thq-vector-elm42"
                                                                    />
                                                                    <img
                                                                        src="/vectori112-qg2.svg"
                                                                        alt="VectorI112"
                                                                        className="frame14706-thq-vector-elm43"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="frame14706-thq-icon-elm23">
                                                            <div className="frame14706-thq-iconedit-elm5">
                                                                <div className="frame14706-thq-vuesaxboldedit-elm5">
                                                                    <div className="frame14706-thq-edit-elm5">
                                                                        <img
                                                                            src="/vectori112-mt26.svg"
                                                                            alt="VectorI112"
                                                                            className="frame14706-thq-vector-elm44"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <img
                                                src="/vector11121-nymo.svg"
                                                alt="Vector11121"
                                                className="frame14706-thq-vector1-elm3"
                                            />
                                            <div className="frame14706-thq-attachmentcard1-elm2">
                                                <div className="frame14706-thq-icon-elm24">
                                                    <div className="frame14706-thq-icondocumenttext-elm3">
                                                        <div className="frame14706-thq-vuesaxbolddocumenttext-elm3">
                                                            <div className="frame14706-thq-documenttext-elm3">
                                                                <img
                                                                    src="/vectori112-drwr.svg"
                                                                    alt="VectorI112"
                                                                    className="frame14706-thq-vector-elm45"
                                                                />
                                                                <img
                                                                    src="/vectori112-q4h4.svg"
                                                                    alt="VectorI112"
                                                                    className="frame14706-thq-vector-elm46"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="frame14706-thq-skillinfo-elm6">
                                                    <span className="frame14706-thq-text-elm77 PBodyMmedium">
                                                        CaseStudy-01.pdf
                                                    </span>
                                                    <div className="frame14706-thq-company-elm7">
                                                        <span className="frame14706-thq-text-elm78 PBodySregular">
                                                            Portfolio
                                                        </span>
                                                        <span className="frame14706-thq-text-elm79 PBodySregular">
                                                            1.21 MB
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="frame14706-thq-action-elm8">
                                                    <div className="frame14706-thq-icon-elm25">
                                                        <div className="frame14706-thq-icontrushsquare-elm6">
                                                            <div className="frame14706-thq-vuesaxboldtrushsquare-elm6">
                                                                <div className="frame14706-thq-trushsquare-elm6">
                                                                    <img
                                                                        src="/vectori112-vfk.svg"
                                                                        alt="VectorI112"
                                                                        className="frame14706-thq-vector-elm47"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="frame14706-thq-icon-elm26">
                                                        <div className="frame14706-thq-eye-elm2">
                                                            <div className="frame14706-thq-vuesaxboldeye-elm2">
                                                                <img
                                                                    src="/vectori112-6h6.svg"
                                                                    alt="VectorI112"
                                                                    className="frame14706-thq-vector-elm48"
                                                                />
                                                                <img
                                                                    src="/vectori112-38cw.svg"
                                                                    alt="VectorI112"
                                                                    className="frame14706-thq-vector-elm49"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="frame14706-thq-icon-elm27">
                                                        <div className="frame14706-thq-iconedit-elm6">
                                                            <div className="frame14706-thq-vuesaxboldedit-elm6">
                                                                <div className="frame14706-thq-edit-elm6">
                                                                    <img
                                                                        src="/vectori112-937c.svg"
                                                                        alt="VectorI112"
                                                                        className="frame14706-thq-vector-elm50"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src="/vector21121-yzo9.svg"
                                                alt="Vector21121"
                                                className="frame14706-thq-vector2-elm"
                                            />
                                        </div>
                                        <button className="frame14706-thq-button-elm22">
                                            <button className="frame14706-thq-base-button-elm26">
                                                <div className="frame14706-thq-content-elm42">
                                                    <span className="frame14706-thq-text-elm80 BTNMSemi-Bold">
                                                        show 2 more attchments
                                                    </span>
                                                </div>
                                            </button>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    )
}
