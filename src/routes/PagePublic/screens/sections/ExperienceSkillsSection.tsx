import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";

const starRatings = [
  { stars: 5, label: "5 étoiles", count: 44, percentage: 89.8 },
  { stars: 4, label: "4 étoiles", count: 4, percentage: 8.2 },
  { stars: 3, label: "3 étoiles", count: 1, percentage: 2 },
  { stars: 2, label: "2 étoiles", count: 0, percentage: 0 },
  { stars: 1, label: "1 étoile", count: 0, percentage: 0 },
];

const ratingDetails = [
  { label: "Niveau de communication avec le prestataire", rating: "4,9" },
  { label: "Qualité de la livraison", rating: "4,8" },
  { label: "Valeur de la livraison", rating: "4,9" },
];

const reviews = [
  {
    id: 1,
    username: "ogchristiangray",
    country: "Royaume-Uni",
    countryFlag: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gb.png",
    avatar: "https://c.animaapp.com/mjs9uq4eaVmanC/img/image-docs.png",
    avatarBg: "bg-[#d0f7e6]",
    avatarText: "O",
    avatarTextColor: "text-[#005c25]",
    rating: 5,
    timeAgo: "Il y a 2 mois",
    reviewText:
      "Absolutely the best AI headshots I've come across! The results look natural and professional – exactly what I needed for my LinkedIn and social media profiles. The value for money is unbeatable compared to other services I checked out. Quick turnaround, great communication, and top-quality images. Highly recommend for anyone looking to upgrade their professional image!",
    price: "Jusqu'à 50 $US",
    duration: "1 jour",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/image-d--chantillon-de-travail.png",
    isRecurring: false,
    helpfulCount: 15,
  },
  {
    id: 2,
    username: "tharindu_fernan",
    country: "États-Unis",
    countryFlag: "https://c.animaapp.com/mjs9uq4eaVmanC/img/us.png",
    avatar: null,
    avatarBg: "bg-[#f1f4cb]",
    avatarText: "T",
    avatarTextColor: "text-[#465a00]",
    rating: 4,
    timeAgo: "Il y a 3 semaines",
    reviewText:
      "I liked how Karunarathne worked throughout the project, especially working on the changes and corrections to the design required by me time to time. He made sure a very good final delivery within the expected timeline.",
    price: "Jusqu'à 50 $US",
    duration: "4 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-1.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage: null,
    isRecurring: true,
    helpfulCount: 8,
  },
  {
    id: 3,
    username: "danielbayen105",
    country: "États-Unis",
    countryFlag: "https://c.animaapp.com/mjs9uq4eaVmanC/img/us-1.png",
    avatar: null,
    avatarBg: "bg-[#f1f4cb]",
    avatarText: "D",
    avatarTextColor: "text-[#465a00]",
    rating: 5,
    timeAgo: "Il y a 3 semaines",
    reviewText:
      "Thanks. Going to work with him again soon. He works fast and not too expensive. The pictures look 90% real",
    price: "Jusqu'à 50 $US",
    duration: "2 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-2.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/image-d--chantillon-de-travail-1.png",
    isRecurring: true,
    helpfulCount: 4,
  },
  {
    id: 4,
    username: "tharindu_fernan",
    country: "États-Unis",
    countryFlag: "https://c.animaapp.com/mjs9uq4eaVmanC/img/us-2.png",
    avatar: null,
    avatarBg: "bg-[#f1f4cb]",
    avatarText: "T",
    avatarTextColor: "text-[#465a00]",
    rating: 5,
    timeAgo: "Il y a 1 mois",
    reviewText:
      "I really enjoyed working with Karunarathne on this project of designing my small business digital flyer. He was very responsive and cooperative in making all the changes being required by me time to time, also very professional from start to finish. Further Karunarathne and I are from the same home country, so communication was easy and he understood my requirements perfectly.",
    price: "Jusqu'à 50 $US",
    duration: "3 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-3.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage: null,
    isRecurring: true,
    helpfulCount: 6,
  },
  {
    id: 5,
    username: "mdeschapelles",
    country: "États-Unis",
    countryFlag: "https://c.animaapp.com/mjs9uq4eaVmanC/img/us-3.png",
    avatar: null,
    avatarBg: "bg-[#fed0d0]",
    avatarText: "M",
    avatarTextColor: "text-[#912626]",
    rating: 5,
    timeAgo: "Il y a 1 mois",
    reviewText:
      "Exceptional work with a difficult project. Excellent partner and willing to go extra mile to get it done. A pleasure to work with.",
    price: "50 $US-100 $US",
    duration: "4 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-4.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/image-d--chantillon-de-travail-2.png",
    isRecurring: true,
    helpfulCount: 10,
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

export const ExperienceSkillsSection = (): JSX.Element => {
  const totalReviews = 49;
  const averageRating = 4.9;
  const { label: ratingLabel, color: ratingColor } = getRatingLabel(averageRating);

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
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
    <section className="flex flex-col gap-6 bg-[#f8f5f0] w-full">
      {/* Header avec score circulaire */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {/* Score circulaire animé */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#e4e5e7"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke={ratingColor}
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 36}
                strokeDashoffset={(2 * Math.PI * 36) - (averageRating / 5) * (2 * Math.PI * 36)}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bold text-[#222325] text-xl [font-family:'Inter',Helvetica]">
                {averageRating}
              </span>
              <span className="text-[#74767e] text-[10px]">/5</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-bold text-[#222325] text-lg leading-[22px] [font-family:'Inter',Helvetica]">
              {totalReviews} Avis
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  className="w-[15px] h-[15px]"
                  alt="Star"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-3.svg"
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
      </div>

      {/* Barres de progression cliquables */}
      <div className="flex flex-col gap-2 w-full max-w-[500px]">
        {starRatings.map((rating) => (
          <div
            key={rating.stars}
            className={`flex items-center gap-2 w-full h-9 cursor-pointer group transition-all duration-200 rounded-lg px-2 -mx-2 ${activeFilter === rating.stars
                ? 'bg-[#fea38e]/10'
                : 'hover:bg-[#f0ede8]'
              }`}
            onClick={() => handleFilterClick(rating.stars)}
          >
            <div className="w-[78px] h-7 flex items-center rounded">
              <span
                className={`font-semibold text-base leading-4 [font-family:'Inter',Helvetica] ml-1.5 transition-colors ${activeFilter === rating.stars
                    ? "text-[#fea38e]"
                    : rating.count === 0
                      ? "text-[#dadbdd]"
                      : "text-[#222325] group-hover:text-[#fea38e]"
                  }`}
              >
                {rating.label}
              </span>
            </div>

            <div className="flex-1 h-2 bg-[#e4e5e7] rounded-[999px] overflow-hidden">
              {rating.count > 0 && (
                <div
                  className={`h-full rounded-[999px] transition-all duration-300 ${activeFilter === rating.stars
                      ? 'bg-[#fea38e]'
                      : 'bg-[#222325] group-hover:bg-[#fea38e]'
                    }`}
                  style={{ width: `${rating.percentage}%` }}
                />
              )}
            </div>

            <span
              className={`[font-family:'Inter',Helvetica] font-normal text-[14.8px] leading-6 w-[30px] text-center ${rating.count === 0 ? "text-[#c5c6c9]" : "text-[#222325]"
                }`}
            >
              ({rating.count})
            </span>
          </div>
        ))}

        {/* Info filtre actif */}
        {activeFilter && (
          <div className="flex items-center gap-2 mt-1 pt-2 border-t border-[#e4e5e7]">
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

      <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#404145] text-base leading-[22.4px] mt-2">
        Détails de la notation
      </h3>

      <div className="flex flex-col gap-3 w-full max-w-[500px]">
        {ratingDetails.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full"
          >
            <span className="[font-family:'Inter',Helvetica] font-normal text-[#95979d] text-base leading-6">
              {detail.label}
            </span>

            <div className="flex items-center gap-1">
              <img
                className="w-[15px] h-[15px]"
                alt="Star"
                src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-3.svg"
              />
              <span className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[13.3px] leading-[21px]">
                {detail.rating}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-[356px] h-[42px] mt-2">
        <Input
          placeholder="Recherche d'avis"
          className="w-full h-full bg-white border-[#c5c6c9] rounded [font-family:'Inter',Helvetica] text-[#757575] text-base pr-14"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-[42px] w-12 hover:bg-transparent"
        >
          <img
            className="w-full h-full"
            alt="Search"
            src="https://c.animaapp.com/mjs9uq4eaVmanC/img/button.svg"
          />
        </Button>
      </div>

      <Separator className="w-full border-[#dadbdd] mt-2" />

      <div className="flex items-center justify-between w-full">
        <span className="[font-family:'Inter',Helvetica] font-normal text-[#62646a] text-base leading-6">
          {activeFilter
            ? `${filteredReviews.length} avis avec ${activeFilter} étoile${activeFilter > 1 ? 's' : ''}`
            : `1 à ${Math.min(5, totalReviews)} avis sur ${totalReviews}`
          }
        </span>

        <div className="flex items-center gap-2">
          <span className="[font-family:'Inter',Helvetica] font-normal text-[#404145] text-base leading-6">
            Trier par
          </span>
          <Select defaultValue="relevant">
            <SelectTrigger className="w-[189px] h-10 bg-white border-none [font-family:'Inter',Helvetica] font-semibold text-[#404145] text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevant">Les plus pertinents</SelectItem>
              <SelectItem value="recent">Les plus récents</SelectItem>
              <SelectItem value="highest">Meilleures notes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Liste des avis - Gap réduit de 73px à 24px */}
      <div className="flex flex-col gap-6 w-full mt-2">
        {filteredReviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const needsTruncation = review.reviewText.length > 180;
          const displayText = isExpanded || !needsTruncation
            ? review.reviewText
            : review.reviewText.slice(0, 180) + "...";
          const currentVote = helpfulVotes[review.id];

          return (
            <Card
              key={review.id}
              className="w-full rounded-2xl border-[#dadbdd] hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-6">
                {/* Header avec avatar et infos - Image échantillon à droite */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12 border border-[#dadbdd] flex-shrink-0">
                    {review.avatar ? (
                      <AvatarImage src={review.avatar} alt={review.username} />
                    ) : (
                      <AvatarFallback
                        className={`${review.avatarBg} ${review.avatarTextColor} [font-family:'Inter',Helvetica] font-semibold text-xl`}
                      >
                        {review.avatarText}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[15.4px] leading-6">
                        {review.username}
                      </h4>
                      {review.isRecurring && (
                        <>
                          <div className="w-1 h-1 bg-[#dadbdd] rounded-full" />
                          <img
                            className="w-4 h-4"
                            alt="Recurring"
                            src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-15.svg"
                          />
                          <Badge
                            variant="secondary"
                            className="[font-family:'Inter',Helvetica] font-semibold text-[#fea38e] text-xs bg-[#fea38e]/10 border-none px-2 py-0.5"
                          >
                            Client récurrent
                          </Badge>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <img
                        className="w-4 h-4 rounded-sm"
                        alt={review.country}
                        src={review.countryFlag}
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs leading-[18px]">
                        {review.country}
                      </span>
                    </div>
                  </div>

                  {/* Image échantillon repositionnée (relative au lieu d'absolute) */}
                  {review.sampleImage && (
                    <div
                      className="w-[100px] h-[75px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img
                        className="w-full h-full object-cover"
                        alt="Échantillon de travail"
                        src={review.sampleImage}
                      />
                    </div>
                  )}
                </div>

                <Separator className="mb-4" />

                <div className="flex flex-col gap-4">
                  {/* Note et date */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {[...Array(5)].map((_, starIndex) => (
                      <img
                        key={starIndex}
                        className="w-[15px] h-[15px]"
                        alt="Star"
                        src={
                          starIndex < review.rating
                            ? "https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-3.svg"
                            : "https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-1.svg"
                        }
                      />
                    ))}
                    <span className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-base leading-[21px]">
                      {review.rating}
                    </span>
                    <div className="w-1 h-1 bg-[#dadbdd] rounded-full" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs leading-[18px]">
                      {review.timeAgo}
                    </span>
                  </div>

                  {/* Texte de l'avis avec voir plus/moins */}
                  <div>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-[#404145] text-base leading-6 whitespace-pre-line">
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
                  <div className="flex items-start gap-4 mt-2 flex-wrap">
                    <div className="flex flex-col gap-1">
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-[13.6px] leading-[22px]">
                        {review.price}
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs leading-[18px]">
                        Prix
                      </span>
                    </div>

                    <Separator orientation="vertical" className="h-[35px]" />

                    <div className="flex flex-col gap-1">
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-sm leading-[22px]">
                        {review.duration}
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs leading-[18px]">
                        Durée
                      </span>
                    </div>

                    <Separator orientation="vertical" className="h-[35px]" />

                    <div className="flex items-center gap-3 border border-[#efeff0] rounded p-2 flex-1 max-w-[365px] hover:border-[#dadbdd] transition-colors cursor-pointer">
                      <img
                        className="w-[49.5px] h-[33px] object-cover rounded"
                        alt="Gig"
                        src={review.gigImage}
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs leading-[18px] flex-1">
                        {review.gigTitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className="w-3.5 h-3.5"
                      alt="Translate"
                      src="https://c.animaapp.com/mjs9uq4eaVmanC/img/image.svg"
                    />
                    <Button
                      variant="link"
                      className="h-auto p-0 [font-family:'Inter',Helvetica] font-normal text-[#222325] text-sm underline"
                    >
                      Traduire
                    </Button>
                  </div>
                </div>

                {/* Section "Utile?" intégrée dans la carte */}
                <Separator className="my-4" />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <span className="[font-family:'Inter',Helvetica] font-semibold text-[#404145] text-[13.6px] leading-[25px]">
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
                        <span className="[font-family:'Inter',Helvetica] font-semibold text-sm leading-[21px]">
                          Oui
                        </span>
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
                        <span className="[font-family:'Inter',Helvetica] font-semibold text-sm leading-[21px]">
                          Non
                        </span>
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

      <Button
        variant="outline"
        className="w-fit h-[42px] rounded-lg border-[#222325] mt-4 px-6 hover:bg-[#222325] hover:text-white transition-colors"
      >
        <span className="[font-family:'Inter',Helvetica] font-semibold text-base text-center leading-6">
          Afficher plus d'avis
        </span>
      </Button>
    </section>
  );
};
