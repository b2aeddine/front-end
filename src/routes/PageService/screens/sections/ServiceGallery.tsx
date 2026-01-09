import { useState } from "react";
import { PlayCircleIcon, ImageIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

interface MediaItem {
    id: number;
    type: "image" | "video";
    url: string;
    thumbnail?: string;
}

// Demo media items - in production, these would come from the service data
const defaultMediaItems: MediaItem[] = [
    {
        id: 1,
        type: "image",
        url: "https://c.animaapp.com/mjs9uq4eaVmanC/img/lr-05270-jpg.png",
    },
    {
        id: 2,
        type: "image",
        url: "https://c.animaapp.com/mjs9uq4eaVmanC/img/derrick-hillman-for-hawes---curtis.png",
    },
    {
        id: 3,
        type: "image",
        url: "https://c.animaapp.com/mjs9uq4eaVmanC/img/travel-photoshoot-around-tower-bridge.png",
    },
    {
        id: 4,
        type: "image",
        url: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
    },
    {
        id: 5,
        type: "video",
        url: "https://example.com/video.mp4",
        thumbnail: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
    },
];

interface ServiceGalleryProps {
    mediaItems?: MediaItem[];
}

export const ServiceGallery = ({ mediaItems = defaultMediaItems }: ServiceGalleryProps): JSX.Element => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedItem = mediaItems[selectedIndex];

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-[764px]">
            {/* Main Image/Video Display */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#e5e7eb] border border-[#dadbdd]">
                {selectedItem?.type === "video" ? (
                    <div
                        className="w-full h-full bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${selectedItem.thumbnail || selectedItem.url})` }}
                    >
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                                <PlayCircleIcon className="w-12 h-12 text-[#fea38e]" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedItem?.url})` }}
                    />
                )}

                {/* Navigation Arrows */}
                <Button
                    onClick={handlePrevious}
                    variant="ghost"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md p-0"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-[#222325]" />
                </Button>
                <Button
                    onClick={handleNext}
                    variant="ghost"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md p-0"
                >
                    <ChevronRightIcon className="w-6 h-6 text-[#222325]" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>{selectedIndex + 1} / {mediaItems.length}</span>
                </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="flex items-center gap-3 w-full overflow-x-auto pb-2">
                {mediaItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setSelectedIndex(index)}
                        className={`relative flex-shrink-0 w-[120px] h-[80px] rounded-lg overflow-hidden transition-all ${selectedIndex === index
                                ? "ring-2 ring-[#fea38e] ring-offset-2"
                                : "opacity-70 hover:opacity-100"
                            }`}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.type === "video" ? item.thumbnail : item.url})` }}
                        />
                        {item.type === "video" && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <PlayCircleIcon className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </button>
                ))}

                {/* Empty placeholder slots */}
                {mediaItems.length < 5 && Array.from({ length: 5 - mediaItems.length }).map((_, index) => (
                    <div
                        key={`empty-${index}`}
                        className="flex-shrink-0 w-[120px] h-[80px] rounded-lg border-2 border-dashed border-[#dadbdd] bg-[#f8f5f0] flex items-center justify-center"
                    >
                        <ImageIcon className="w-8 h-8 text-[#dadbdd]" />
                    </div>
                ))}
            </div>
        </div>
    );
};
