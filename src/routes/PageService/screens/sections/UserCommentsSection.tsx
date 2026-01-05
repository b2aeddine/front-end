import { ChevronDownIcon } from "lucide-react";
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
  { stars: "5 étoiles", count: 115, percentage: 95.83 },
  { stars: "4 étoiles", count: 5, percentage: 4.17 },
  { stars: "3 étoiles", count: 0, percentage: 0 },
  { stars: "2 étoiles", count: 0, percentage: 0 },
  { stars: "1 étoile", count: 0, percentage: 0 },
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
      "Joscha is an incredible photographer, so professional and has great artistic direction. It was our first time doing a photoshoot in London and\nJoscha knew all the best shooting locations that suited our requirements. He was the best communicator of all the Fiverr photographers we\nshortlisted prior to...",
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
      "I was a little nervous/awkward as I had never really done something like this before. Joscha was amazing. He was really patient and would work\nwith me to make sure that we got the right shot. He was calm and approachable and showed me some of the pictures as we went which really\nhelped. In the end, it...",
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
      "Joscha was my first time hiring a photographer and I had the most excellent experience. He had everything covered; locations, best days and\ntimes for said locations, through the session he coached me on how to pose for the shots... overall he made this a fun and easy experience!\nHe has a natural eye...",
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
      "The whole experience was great Joscha is such a lovely, polite and professional person :) I had a great time and love my pictures! I would\ndefinitely recommend, especially if it's your first time.",
    priceRange: "200 $US-400 $US",
    duration: "3 semaines",
    gigTitle: "Portraits de voyage et de destination",
    gigImage: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/gig-3.png",
    sampleImage: null,
    hasProviderResponse: false,
    providerAvatarBg: null,
    providerAvatarText: null,
    providerAvatarTextColor: null,
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
      "Joscha was an absolute pleasure to work with during our photoshoot in London. Professional, creative, and easygoing — he perfectly captured\nthe spirit of Roamer. The photos turned out stunning and truly reflect our brand. Highly recommended!",
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
  },
];

export const UserCommentsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#f8f5f0] py-8 px-6">
      <div className="max-w-[1337px] mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-[#222325] text-[15.6px] leading-[22px] [font-family:'Inter',Helvetica]">
              120 Avis
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                className="w-[15px] h-[15px]"
                alt="Star"
                src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg.svg"
              />
            ))}
            <span className="font-bold text-[#222325] text-[13.3px] [font-family:'Inter',Helvetica] ml-1">
              4,9
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            {ratingBreakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`min-w-[78px] h-7 flex items-center rounded ${
                    item.count === 0 ? "opacity-70" : ""
                  }`}
                >
                  <span
                    className={`ml-1.5 font-semibold text-base leading-4 [font-family:'Inter',Helvetica] ${
                      item.count === 0 ? "text-[#dadbdd]" : "text-[#222325]"
                    }`}
                  >
                    {item.stars}
                  </span>
                </div>
                <div className="flex-1 h-2 bg-[#e4e5e7] rounded-[999px] overflow-hidden">
                  {item.count > 0 && (
                    <div
                      className="h-full bg-[#222325] rounded-[999px]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  )}
                </div>
                <span
                  className={`min-w-[34px] text-center font-normal text-[14.8px] leading-6 [font-family:'Inter',Helvetica] ${
                    item.count === 0 ? "text-[#c5c6c9]" : "text-[#222325]"
                  }`}
                >
                  ({item.count})
                </span>
              </div>
            ))}
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
            1 à 5 avis sur 120
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

        <div className="space-y-6">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="rounded-2xl border-[#dadbdd] overflow-hidden"
            >
              <CardContent className="p-6">
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
                        className="w-4 h-4 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${review.countryFlag})`,
                        }}
                      />
                      <span className="font-normal text-[#74767e] text-xs [font-family:'Inter',Helvetica]">
                        {review.country}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="mb-4" />

                <div className="space-y-4">
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

                  <div className="flex gap-6">
                    <div className="flex-1">
                      <p className="font-normal text-[#404145] text-base leading-6 [font-family:'Inter',Helvetica] whitespace-pre-line mb-2">
                        {review.reviewText}
                      </p>
                      <Button
                        variant="link"
                        className="h-auto p-0 font-normal text-[#404145] text-base underline [font-family:'Inter',Helvetica]"
                      >
                        Tout afficher
                      </Button>

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
                        <div className="flex items-center gap-3 border border-[#efeff0] rounded px-3 py-2">
                          <div
                            className="w-[49.5px] h-[33px] bg-cover bg-center"
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

                    {review.sampleImage && (
                      <div
                        className="w-[86px] h-[86px] rounded bg-cover bg-center flex-shrink-0"
                        style={{
                          backgroundImage: `url(${review.sampleImage})`,
                        }}
                      />
                    )}
                  </div>
                </div>

                {review.hasProviderResponse && (
                  <>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
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
                      <img
                        className="w-5 h-5"
                        alt="Expand"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-29.svg"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <div
              key={`helpful-${review.id}`}
              className="flex items-center gap-4"
            >
              <span className="font-semibold text-[#404145] text-[13.6px] [font-family:'Inter',Helvetica]">
                Utile?
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto gap-2 p-0 hover:bg-transparent"
              >
                <img
                  className="w-[14px] h-[14px]"
                  alt="Thumbs up"
                  src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-5.svg"
                />
                <span className="font-semibold text-[#404145] text-sm [font-family:'Inter',Helvetica]">
                  Oui
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto gap-2 p-0 hover:bg-transparent"
              >
                <img
                  className="w-[14px] h-[14px]"
                  alt="Thumbs down"
                  src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-19.svg"
                />
                <span className="font-semibold text-[#404145] text-sm [font-family:'Inter',Helvetica]">
                  Non
                </span>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-start">
          <Button
            variant="outline"
            className="h-[42px] px-6 rounded-lg border-[#222325] font-semibold text-[#222325] text-base [font-family:'Inter',Helvetica]"
          >
            Afficher plus d&#39;avis
          </Button>
        </div>
      </div>
    </section>
  );
};
