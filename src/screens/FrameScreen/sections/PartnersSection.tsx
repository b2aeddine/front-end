import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Megaphone,
  PenTool,
  Palette,
  Video,
  FileText,
  Camera
} from 'lucide-react';

const categories = [
  { id: 1, name: "Marketing Digital", slug: "marketing-digital", icon: Megaphone, color: "#fea38e" },
  { id: 2, name: "Création de Contenu", slug: "creation-contenu", icon: PenTool, color: "#e879f9" },
  { id: 3, name: "Design Graphique", slug: "design-graphique", icon: Palette, color: "#60a5fa" },
  { id: 4, name: "Vidéo & Animation", slug: "video-animation", icon: Video, color: "#34d399" },
  { id: 5, name: "Rédaction Web", slug: "redaction-web", icon: FileText, color: "#fbbf24" },
  { id: 6, name: "Photographie", slug: "photographie", icon: Camera, color: "#f472b6" },
];

export const PartnersSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/categories/${slug}`);
  };

  const handleViewAll = () => {
    navigate('/categories');
  };

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#f8f5f0]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#202224] [font-family:'DM_Sans',Helvetica]">
            Catégories
          </h2>
          <button
            onClick={handleViewAll}
            className="px-6 py-3 bg-[#fea38e] hover:bg-[#fe8e76] text-white rounded-full font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#fea38e]/30 [font-family:'Nunito_Sans',Helvetica]"
          >
            Voir toutes les catégories
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className="group cursor-pointer"
              >
                <div
                  className="relative rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}40 100%)`,
                  }}
                >
                  {/* Icon Container */}
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor: `${category.color}30`,
                    }}
                  >
                    <Icon
                      className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110"
                      style={{ color: category.color }}
                    />
                  </div>

                  {/* Category Name */}
                  <span className="text-center text-sm md:text-base font-semibold text-[#202224] [font-family:'Nunito_Sans',Helvetica] transition-colors duration-300 group-hover:text-[#fea38e]">
                    {category.name}
                  </span>

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}10 0%, transparent 100%)`,
                      boxShadow: `0 10px 40px ${category.color}30`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
