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
  { stars: 5, count: 44, width: "w-[288.17px]" },
  { stars: 4, count: 4, width: "w-[26.19px]" },
  { stars: 3, count: 1, width: "w-[6.55px]" },
  { stars: 2, count: 0, width: "w-0", opacity: "opacity-70" },
  { stars: 1, count: 0, width: "w-0", opacity: "opacity-70" },
];

const ratingDetails = [
  { label: "Niveau de communication avec le prestataire", rating: "4,9" },
  { label: "Qualité de la livraison", rating: "4,8" },
  { label: "Valeur de la livraison", rating: "4,9" },
];

const reviews = [
  {
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
      "Absolutely the best AI headshots I've come across! The results look natural and professional – exactly what I needed for my LinkedIn and\nsocial media profiles. The value for money is unbeatable compared to other services I checked out. Quick turnaround, great communication,\nand top-quality images. Highly...",
    showMore: true,
    price: "Jusqu'à 50 $US",
    duration: "1 jour",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/image-d--chantillon-de-travail.png",
    isRecurring: false,
  },
  {
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
      "I liked how Karunarathne worked throughout the project, especially working on the changes and corrections to the design required by me time\nto time. He made sure a very good final delivery within the expected timeline.",
    showMore: false,
    price: "Jusqu'à 50 $US",
    duration: "4 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-1.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage: null,
    isRecurring: true,
  },
  {
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
    showMore: false,
    price: "Jusqu'à 50 $US",
    duration: "2 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-2.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/image-d--chantillon-de-travail-1.png",
    isRecurring: true,
  },
  {
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
      "I really enjoyed working with Karunarathne on this project of designing my small business digital flyer. He was very responsive and cooperative\nin making all the changes being required by me time to time, also very professional from start to finish. Further Karunarathne and I are from\nthe same home country,...",
    showMore: true,
    price: "Jusqu'à 50 $US",
    duration: "3 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-3.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage: null,
    isRecurring: true,
  },
  {
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
    showMore: false,
    price: "50 $US-100 $US",
    duration: "4 jours",
    gigImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/gig-4.png",
    gigTitle: "Portraits d'entreprises et portraits professionnels",
    sampleImage:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/image-d--chantillon-de-travail-2.png",
    isRecurring: true,
  },
];

export const ExperienceSkillsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col gap-2.5 bg-[#f8f5f0] w-full">
      <div className="flex items-center justify-between w-full h-[22px]">
        <div className="font-bold text-[#222325] text-base leading-[22px] [font-family:'Inter',Helvetica]">
          49 Avis
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
          <span className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[13.3px] leading-[21px] ml-1">
            4,9
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-[445.33px]">
        {starRatings.map((rating) => (
          <div
            key={rating.stars}
            className={`flex items-center gap-2 w-full h-8 ${rating.opacity || ""}`}
          >
            <div className="w-[78px] h-7 flex items-center rounded">
              <span
                className={`font-semibold ${rating.count === 0 ? "text-[#dadbdd]" : "text-[#222325]"} text-base leading-4 [font-family:'Inter',Helvetica] ml-1.5`}
              >
                {rating.stars} étoile{rating.stars > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex-1 h-2 bg-[#e4e5e7] rounded-[999px] overflow-hidden">
              <div
                className={`${rating.width} h-full bg-[#222325] rounded-[999px]`}
              />
            </div>

            <span
              className={`[font-family:'Inter',Helvetica] font-normal ${rating.count === 0 ? "text-[#c5c6c9]" : "text-[#222325]"} text-[14.8px] leading-6 w-[30px] text-center`}
            >
              ({rating.count})
            </span>
          </div>
        ))}
      </div>

      <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#404145] text-base leading-[22.4px] mt-2">
        Détails de la notation
      </h3>

      <div className="flex flex-col gap-8 w-full max-w-[445.33px]">
        {ratingDetails.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full h-8"
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

      <Separator className="w-full border-[#dadbdd] mt-4" />

      <div className="flex items-center justify-between w-full h-10 mt-4">
        <span className="[font-family:'Inter',Helvetica] font-normal text-[#62646a] text-base leading-6">
          1 à 5 avis sur 49
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
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-[73px] w-full mt-4">
        {reviews.map((review, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Card className="w-full rounded-2xl border-[#dadbdd]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12 border border-[#dadbdd]">
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

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
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
                            className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-sm bg-transparent border-none px-0"
                          >
                            Client récurrent
                          </Badge>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <img
                        className="w-4 h-4"
                        alt={review.country}
                        src={review.countryFlag}
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs leading-[18px]">
                        {review.country}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="mb-4" />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
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

                  <p className="[font-family:'Inter',Helvetica] font-normal text-[#404145] text-base leading-6 whitespace-pre-line">
                    {review.reviewText}
                  </p>

                  {review.showMore && (
                    <Button
                      variant="link"
                      className="h-auto p-0 [font-family:'Inter',Helvetica] font-normal text-[#404145] text-base underline w-fit"
                    >
                      Tout afficher
                    </Button>
                  )}

                  <div className="flex items-start gap-4 mt-2">
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

                    <div className="flex items-center gap-3 border border-[#efeff0] rounded p-2 flex-1 max-w-[365px]">
                      <img
                        className="w-[49.5px] h-[33px] object-cover"
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

                {review.sampleImage && (
                  <div className="absolute top-[98px] right-6 w-[144px] h-[86px] rounded overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Sample work"
                      src={review.sampleImage}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex items-center gap-4 ml-3">
              <span className="[font-family:'Inter',Helvetica] font-semibold text-[#404145] text-[13.6px] leading-[25px]">
                Utile?
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 gap-1 hover:bg-transparent"
              >
                <img
                  className="w-[14px] h-[14px]"
                  alt="Thumbs up"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-2.svg"
                />
                <span className="[font-family:'Inter',Helvetica] font-semibold text-[#404145] text-sm leading-[21px]">
                  Oui
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 gap-1 hover:bg-transparent"
              >
                <img
                  className="w-[14px] h-[14px]"
                  alt="Thumbs down"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-5.svg"
                />
                <span className="[font-family:'Inter',Helvetica] font-semibold text-[#404145] text-sm leading-[21px]">
                  Non
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-fit h-[42px] rounded-lg border-[#222325] mt-4 px-6"
      >
        <span className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-base text-center leading-6">
          Afficher plus d'avis
        </span>
      </Button>
    </section>
  );
};
