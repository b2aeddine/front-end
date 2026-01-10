import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

const ratingBreakdown = [
  { stars: 5, label: "5 étoiles", count: 115, percentage: 95.83 },
  { stars: 4, label: "4 étoiles", count: 5, percentage: 4.17 },
  { stars: 3, label: "3 étoiles", count: 0, percentage: 0 },
  { stars: 2, label: "2 étoiles", count: 0, percentage: 0 },
  { stars: 1, label: "1 étoile", count: 0, percentage: 0 },
];

const ratingDetails = [
  { label: "Niveau de communication avec le prestataire", rating: "5" },
  { label: "Qualité de la livraison", rating: "4,9" },
  { label: "Valeur de la livraison", rating: "4,8" },
];

const reviews = [
  {
    id: 1,
    username: "schebates",
    country: "Singapour",
    countryFlag: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/sg.png",
    avatarBg: "#ffe0d4",
    avatarText: "S",
    avatarTextColor: "#6f2000",
    avatarImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/image-docs-1.svg",
    rating: 5,
    timeAgo: "Il y a 1 semaine",
    reviewText:
      "Joscha is an incredible photographer, so professional and has great artistic direction. It was our first time doing a photoshoot in London and Joscha knew all the best shooting locations that suited our requirements. He was the best communicator of all the Fiverr photographers we shortlisted prior to booking. The photos came out amazing and we will definitely be booking him again for our next trip!",
    priceRange: "400 $US-600 $US",
    duration: "5 semaines",
    gigTitle: "Portraits de voyage et de destination",
    gigImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gig.png",
    sampleImage:
      "https://c.animaapp.com/mjsa8xj74uh4Dq/img/image-d--chantillon-de-travail.png",
    hasProviderResponse: true,
    providerAvatarBg: "#fed0d0",
    providerAvatarText: "J",
    providerAvatarTextColor: "#912626",
    providerResponse: "Merci beaucoup pour cet avis si positif ! Ce fut un réel plaisir de travailler avec vous.",
    helpfulCount: 12,
  },
  {
    id: 2,
    username: "lucy_nic",
    country: "Royaume-Uni",
    countryFlag: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gb.png",
    avatarBg: "#d4defb",
    avatarText: "L",
    avatarTextColor: "#1d3369",
    avatarImage: null,
    rating: 5,
    timeAgo: "Il y a 2 mois",
    reviewText:
      "I was a little nervous/awkward as I had never really done something like this before. Joscha was amazing. He was really patient and would work with me to make sure that we got the right shot. He was calm and approachable and showed me some of the pictures as we went which really helped. In the end, it was a great experience and I highly recommend him!",
    priceRange: "200 $US-400 $US",
    duration: "13 jours",
    gigTitle: "Portraits de voyage et de destination",
    gigImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gig-1.png",
    sampleImage:
      "https://c.animaapp.com/mjsa8xj74uh4Dq/img/image-d--chantillon-de-travail-1.png",
    hasProviderResponse: true,
    providerAvatarBg: "#fed0d0",
    providerAvatarText: "J",
    providerAvatarTextColor: "#912626",
    providerResponse: "Thank you so much! It was a pleasure working with you!",
    helpfulCount: 8,
  },
  {
    id: 3,
    username: "ryanj_cox",
    country: "Canada",
    countryFlag: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/ca.png",
    avatarBg: "#825723",
    avatarText: "R",
    avatarTextColor: "#ffecd1",
    avatarImage: null,
    rating: 5,
    timeAgo: "Il y a 2 mois",
    reviewText:
      "Joscha was my first time hiring a photographer and I had the most excellent experience. He had everything covered; locations, best days and times for said locations, through the session he coached me on how to pose for the shots... overall he made this a fun and easy experience! He has a natural eye for great shots.",
    priceRange: "200 $US-400 $US",
    duration: "3 semaines",
    gigTitle: "Portraits de voyage et de destination",
    gigImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gig-2.png",
    sampleImage:
      "https://c.animaapp.com/mjsa8xj74uh4Dq/img/image-d--chantillon-de-travail-2.png",
    hasProviderResponse: false,
    providerAvatarBg: null,
    providerAvatarText: null,
    providerAvatarTextColor: null,
    providerResponse: null,
    helpfulCount: 5,
  },
  {
    id: 4,
    username: "jessie1212",
    country: "Royaume-Uni",
    countryFlag: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gb-1.png",
    avatarBg: "#1d3369",
    avatarText: "J",
    avatarTextColor: "#d4defb",
    avatarImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/image-docs.png",
    rating: 4.7,
    timeAgo: "Il y a 3 semaines",
    reviewText:
      "The whole experience was great Joscha is such a lovely, polite and professional person :) I had a great time and love my pictures! I would definitely recommend, especially if it's your first time.",
    priceRange: "200 $US-400 $US",
    duration: "3 semaines",
    gigTitle: "Portraits de voyage et de destination",
    gigImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gig-3.png",
    sampleImage: null,
    hasProviderResponse: false,
    providerAvatarBg: null,
    providerAvatarText: null,
    providerAvatarTextColor: null,
    providerResponse: null,
    helpfulCount: 3,
  },
  {
    id: 5,
    username: "fwmathias",
    country: "Danemark",
    countryFlag: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/dk.png",
    avatarBg: "#fed0d0",
    avatarText: "F",
    avatarTextColor: "#912626",
    avatarImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/image-docs-2.svg",
    rating: 5,
    timeAgo: "Il y a 1 mois",
    reviewText:
      "Joscha was an absolute pleasure to work with during our photoshoot in London. Professional, creative, and easygoing — he perfectly captured the spirit of Roamer. The photos turned out stunning and truly reflect our brand. Highly recommended!",
    priceRange: "200 $US-400 $US",
    duration: "3 semaines",
    gigTitle: "Portraits de voyage et de destination",
    gigImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gig-4.png",
    sampleImage:
      "https://c.animaapp.com/mjsa8xj74uh4Dq/img/image-d--chantillon-de-travail-3.png",
    hasProviderResponse: false,
    providerAvatarBg: null,
    providerAvatarText: null,
    providerAvatarTextColor: null,
    providerResponse: null,
    helpfulCount: 7,
  },
];

// Fonction pour définir le label de statut basé sur la note
const getRatingLabel = (rating: number): { label: string; color: string } => {
  if (rating >= 4.8) return { label: "Excellent", color: "#22c55e" };
  if (rating >= 4.5) return { label: "Très bien", color: "#84cc16" };
  if (rating >= 4.0) return { label: "Bien", color: "#eab308" };
  if (rating >= 3.5) return { label: "Correct", color: "#f97316" };
  return { label: "À améliorer", color: "#ef4444" };
};

export const UserCommentsSection = (): JSX.Element => {
  const totalReviews = 120;
  const averageRating = 4.9;
  const { label: ratingLabel, color: ratingColor } = getRatingLabel(averageRating);

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const [expandedResponses, setExpandedResponses] = useState<Set<number>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, 'yes' | 'no' | null>>({});

  const toggleExpanded = (reviewId: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const toggleResponse = (reviewId: number) => {
    setExpandedResponses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const handleHelpfulVote = (reviewId: number, vote: 'yes' | 'no') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: prev[reviewId] === vote ? null : vote
    }));
  };

  const handleFilterClick = (stars: number) => {
    setActiveFilter(prev => prev === stars ? null : stars);
  };

  const filteredReviews = activeFilter
    ? reviews.filter(r => Math.floor(r.rating) === activeFilter)
    : reviews;

  // Calcul pour le cercle de progression
  const circumference = 2 * Math.PI * 45;
  const progressOffset = circumference - (averageRating / 5) * circumference;

  return (
    <section className="w-full bg-[#f8f5f0] py-8 px-6">
      <div className="max-w-[1337px] mx-auto">
        {/* Header amélioré avec score circulaire */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-6">
            {/* Score circulaire animé */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                {/* Cercle de fond */}
                <circle
                  cx="48"
                  cy="48"
                  r="45"
                  stroke="#e4e5e7"
                  strokeWidth="6"
                  fill="none"
                />
                {/* Cercle de progression */}
                <circle
                  cx="48"
                  cy="48"
                  r="45"
                  stroke={ratingColor}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-[#222325] text-2xl [font-family:'Inter',Helvetica]">
                  {averageRating}
                </span>
                <span className="text-[#74767e] text-xs">/5</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-[#222325] text-xl leading-[22px] [font-family:'Inter',Helvetica]">
                {totalReviews} Avis
              </h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    className="w-[15px] h-[15px]"
                    alt="Star"
                    src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg.svg"
                  />
                ))}
              </div>
              <span
                className="font-semibold text-sm [font-family:'Inter',Helvetica]"
                style={{ color: ratingColor }}
              >
                {ratingLabel}
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Barres de progression cliquables */}
          <div className="space-y-3">
            {ratingBreakdown.map((item) => (
              <div
                key={item.stars}
                className={`flex items-center gap-3 cursor-pointer group transition-all duration-200 rounded-lg p-2 -mx-2 ${activeFilter === item.stars
                    ? 'bg-[#fea38e]/10'
                    : 'hover:bg-[#f0ede8]'
                  }`}
                onClick={() => handleFilterClick(item.stars)}
              >
                <div
                  className={`min-w-[78px] h-7 flex items-center rounded ${item.count === 0 ? "opacity-70" : ""
                    }`}
                >
                  <span
                    className={`ml-1.5 font-semibold text-base leading-4 [font-family:'Inter',Helvetica] transition-colors ${activeFilter === item.stars
                        ? "text-[#fea38e]"
                        : item.count === 0
                          ? "text-[#dadbdd]"
                          : "text-[#222325] group-hover:text-[#fea38e]"
                      }`}
                  >
                    {item.label}
                  </span>
                </div>
                <div className="flex-1 h-2 bg-[#e4e5e7] rounded-[999px] overflow-hidden">
                  {item.count > 0 && (
                    <div
                      className={`h-full rounded-[999px] transition-all duration-300 ${activeFilter === item.stars
                          ? 'bg-[#fea38e]'
                          : 'bg-[#222325] group-hover:bg-[#fea38e]'
                        }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  )}
                </div>
                <span
                  className={`min-w-[34px] text-center font-normal text-[14.8px] leading-6 [font-family:'Inter',Helvetica] ${item.count === 0 ? "text-[#c5c6c9]" : "text-[#222325]"
                    }`}
                >
                  ({item.count})
                </span>
              </div>
            ))}

            {/* Info filtre actif */}
            {activeFilter && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#e4e5e7]">
                <span className="text-sm text-[#74767e]">
                  Filtrage par {activeFilter} étoile{activeFilter > 1 ? 's' : ''}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilter(null)}
                  className="h-7 px-2 text-[#fea38e] hover:text-[#e8927d] hover:bg-[#fea38e]/10"
                >
                  Effacer
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#404145] text-base [font-family:'Inter',Helvetica] mb-4">
              Détails de la notation
            </h3>
            {ratingDetails.map((detail, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-normal text-[#95979d] text-base [font-family:'Inter',Helvetica]">
                  {detail.label}
                </span>
                <div className="flex items-center gap-2">
                  <img
                    className="w-[15px] h-[15px]"
                    alt="Star"
                    src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg.svg"
                  />
                  <span className="font-bold text-[#222325] text-sm [font-family:'Inter',Helvetica]">
                    {detail.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              placeholder="Recherche d'avis"
              className="h-[42px] pr-14 bg-white border-[#c5c6c9] [font-family:'Inter',Helvetica]"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-[42px] w-12"
            >
              <img
                className="w-full h-full"
                alt="Search"
                src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/button.svg"
              />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Checkbox id="files-only" />
          <label
            htmlFor="files-only"
            className="font-normal text-[#62646a] text-base [font-family:'Inter',Helvetica] cursor-pointer"
          >
            Afficher uniquement les avis avec fichiers (55)
          </label>
        </div>

        <Separator className="mb-6" />

        <div className="flex items-center justify-between mb-8">
          <span className="font-normal text-[#62646a] text-base [font-family:'Inter',Helvetica]">
            {activeFilter
              ? `${filteredReviews.length} avis avec ${activeFilter} étoile${activeFilter > 1 ? 's' : ''}`
              : `1 à ${Math.min(5, totalReviews)} avis sur ${totalReviews}`
            }
          </span>
          <div className="flex items-center gap-2">
            <span className="font-normal text-[#404145] text-base [font-family:'Inter',Helvetica]">
              Trier par
            </span>
            <Button
              variant="outline"
              className="h-10 gap-2 bg-white [font-family:'Inter',Helvetica]"
            >
              <span className="font-semibold text-[#404145] text-base">
                Les plus pertinents
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Liste des avis */}
        <div className="space-y-6">
          {filteredReviews.map((review) => {
            const isExpanded = expandedReviews.has(review.id);
            const isResponseExpanded = expandedResponses.has(review.id);
            const needsTruncation = review.reviewText.length > 200;
            const displayText = isExpanded || !needsTruncation
              ? review.reviewText
              : review.reviewText.slice(0, 200) + "...";
            const currentVote = helpfulVotes[review.id];

            return (
              <Card
                key={review.id}
                className="rounded-2xl border-[#dadbdd] overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  {/* Header de l'avis */}
                  <div className="flex gap-4 mb-6">
                    <Avatar className="w-12 h-12 border border-[#dadbdd]">
                      {review.avatarImage && (
                        <AvatarImage src={review.avatarImage} />
                      )}
                      <AvatarFallback
                        style={{
                          backgroundColor: review.avatarBg,
                          color: review.avatarTextColor,
                        }}
                        className="text-xl font-semibold [font-family:'Inter',Helvetica]"
                      >
                        {review.avatarText}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#222325] text-[15.6px] [font-family:'Inter',Helvetica]">
                          {review.username}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 bg-cover bg-center rounded-sm"
                          style={{
                            backgroundImage: `url(${review.countryFlag})`,
                          }}
                        />
                        <span className="font-normal text-[#74767e] text-xs [font-family:'Inter',Helvetica]">
                          {review.country}
                        </span>
                      </div>
                    </div>

                    {/* Image échantillon repositionnée */}
                    {review.sampleImage && (
                      <div
                        className="w-[100px] h-[75px] rounded-lg bg-cover bg-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                        style={{
                          backgroundImage: `url(${review.sampleImage})`,
                        }}
                        title="Cliquer pour agrandir"
                      />
                    )}
                  </div>

                  <Separator className="mb-4" />

                  <div className="space-y-4">
                    {/* Note et temps */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <img
                            key={star}
                            className="w-[15px] h-[15px]"
                            alt="Star"
                            src={
                              star <= Math.floor(review.rating)
                                ? "https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-3.svg"
                                : "https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-41.svg"
                            }
                          />
                        ))}
                      </div>
                      <span className="font-bold text-[#222325] text-base [font-family:'Inter',Helvetica]">
                        {review.rating}
                      </span>
                      <div className="w-1 h-1 bg-[#dadbdd] rounded-full" />
                      <span className="font-normal text-[#74767e] text-xs [font-family:'Inter',Helvetica]">
                        {review.timeAgo}
                      </span>
                    </div>

                    {/* Texte de l'avis avec voir plus/moins */}
                    <div>
                      <p className="font-normal text-[#404145] text-base leading-6 [font-family:'Inter',Helvetica] whitespace-pre-line">
                        {displayText}
                      </p>
                      {needsTruncation && (
                        <Button
                          variant="link"
                          onClick={() => toggleExpanded(review.id)}
                          className="h-auto p-0 mt-1 font-semibold text-[#fea38e] text-sm hover:text-[#e8927d] [font-family:'Inter',Helvetica]"
                        >
                          {isExpanded ? (
                            <>Voir moins <ChevronUpIcon className="w-4 h-4 ml-1" /></>
                          ) : (
                            <>Voir plus <ChevronDownIcon className="w-4 h-4 ml-1" /></>
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Infos prix et durée */}
                    <div className="flex gap-6 mt-4">
                      <div>
                        <div className="font-semibold text-[#222325] text-[13.3px] leading-[22px] [font-family:'Inter',Helvetica] mb-1">
                          {review.priceRange}
                        </div>
                        <div className="font-normal text-[#74767e] text-xs [font-family:'Inter',Helvetica]">
                          Prix
                        </div>
                      </div>
                      <Separator orientation="vertical" className="h-auto" />
                      <div>
                        <div className="font-semibold text-[#222325] text-[13.8px] leading-[22px] [font-family:'Inter',Helvetica] mb-1">
                          {review.duration}
                        </div>
                        <div className="font-normal text-[#74767e] text-xs [font-family:'Inter',Helvetica]">
                          Durée
                        </div>
                      </div>
                      <Separator orientation="vertical" className="h-auto" />
                      <div className="flex items-center gap-3 border border-[#efeff0] rounded px-3 py-2 hover:border-[#dadbdd] transition-colors cursor-pointer">
                        <div
                          className="w-[49.5px] h-[33px] bg-cover bg-center rounded"
                          style={{
                            backgroundImage: `url(${review.gigImage})`,
                          }}
                        />
                        <span className="font-normal text-[#74767e] text-xs [font-family:'Inter',Helvetica]">
                          {review.gigTitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <img
                        className="w-3.5 h-3.5"
                        alt="Translate"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/image.svg"
                      />
                      <Button
                        variant="link"
                        className="h-auto p-0 font-normal text-[#222325] text-sm underline [font-family:'Inter',Helvetica]"
                      >
                        Traduire
                      </Button>
                    </div>
                  </div>

                  {/* Réponse du prestataire */}
                  {review.hasProviderResponse && (
                    <>
                      <Separator className="my-4" />
                      <div
                        className="flex items-center justify-between cursor-pointer hover:bg-[#f0ede8] -mx-2 px-2 py-2 rounded-lg transition-colors"
                        onClick={() => toggleResponse(review.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 border border-[#dadbdd]">
                            <AvatarFallback
                              style={{
                                backgroundColor: review.providerAvatarBg || "",
                                color: review.providerAvatarTextColor || "",
                              }}
                              className="text-base font-semibold [font-family:'Inter',Helvetica]"
                            >
                              {review.providerAvatarText}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-[#222325] text-sm [font-family:'Inter',Helvetica]">
                            Réponse du prestataire
                          </span>
                        </div>
                        {isResponseExpanded ? (
                          <ChevronUpIcon className="w-5 h-5 text-[#74767e]" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-[#74767e]" />
                        )}
                      </div>
                      {isResponseExpanded && review.providerResponse && (
                        <div className="mt-3 pl-11 text-[#404145] text-sm leading-6 [font-family:'Inter',Helvetica]">
                          {review.providerResponse}
                        </div>
                      )}
                    </>
                  )}

                  {/* Section "Utile?" intégrée */}
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-[#404145] text-[13.6px] [font-family:'Inter',Helvetica]">
                        Cet avis vous a été utile ?
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpfulVote(review.id, 'yes')}
                          className={`h-8 gap-1.5 px-3 rounded-full transition-colors ${currentVote === 'yes'
                              ? 'bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20'
                              : 'hover:bg-[#f0ede8]'
                            }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${currentVote === 'yes' ? 'fill-current' : ''}`} />
                          <span className="font-semibold text-sm">Oui</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpfulVote(review.id, 'no')}
                          className={`h-8 gap-1.5 px-3 rounded-full transition-colors ${currentVote === 'no'
                              ? 'bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20'
                              : 'hover:bg-[#f0ede8]'
                            }`}
                        >
                          <ThumbsDown className={`w-4 h-4 ${currentVote === 'no' ? 'fill-current' : ''}`} />
                          <span className="font-semibold text-sm">Non</span>
                        </Button>
                      </div>
                    </div>
                    {review.helpfulCount > 0 && (
                      <span className="text-[#74767e] text-xs [font-family:'Inter',Helvetica]">
                        {review.helpfulCount} personne{review.helpfulCount > 1 ? 's' : ''} {review.helpfulCount > 1 ? 'ont' : 'a'} trouvé cet avis utile
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-start">
          <Button
            variant="outline"
            className="h-[42px] px-6 rounded-lg border-[#222325] font-semibold text-[#222325] text-base [font-family:'Inter',Helvetica] hover:bg-[#222325] hover:text-white transition-colors"
          >
            Afficher plus d'avis
          </Button>
        </div>
      </div>
    </section>
  );
};
