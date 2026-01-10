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
import './frame14634.css';

const categories = [
  { id: 1, name: "Marketing Digital", slug: "marketing-digital", icon: Megaphone, className: "frame14634-thq-component2-elm", rectClass: "frame14634-thq-rectangle7-elm1", textClass: "frame14634-thq-text-elm119" },
  { id: 2, name: "Création de Contenu", slug: "creation-contenu", icon: PenTool, className: "frame14634-thq-component3-elm", rectClass: "frame14634-thq-rectangle7-elm2", textClass: "frame14634-thq-text-elm120" },
  { id: 3, name: "Design Graphique", slug: "design-graphique", icon: Palette, className: "frame14634-thq-component4-elm", rectClass: "frame14634-thq-rectangle7-elm3", textClass: "frame14634-thq-text-elm121" },
  { id: 4, name: "Vidéo & Animation", slug: "video-animation", icon: Video, className: "frame14634-thq-component5-elm", rectClass: "frame14634-thq-rectangle7-elm4", textClass: "frame14634-thq-text-elm122" },
  { id: 5, name: "Rédaction Web", slug: "redaction-web", icon: FileText, className: "frame14634-thq-component7-elm", rectClass: "frame14634-thq-rectangle7-elm5", textClass: "frame14634-thq-text-elm123" },
  { id: 6, name: "Photographie", slug: "photographie", icon: Camera, className: "frame14634-thq-component6-elm", rectClass: "frame14634-thq-rectangle7-elm6", textClass: "frame14634-thq-text-elm124" },
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
    <div className="frame14634-thq-categorie-elm">
      <div className="frame14634-thq-categories-elm">
        <button
          className="frame14634-thq-frame43-elm"
          onClick={handleViewAll}
          style={{ cursor: 'pointer' }}
        >
          <span className="frame14634-thq-text-elm117">
            Voir toutes les catégories
          </span>
        </button>
        <span className="frame14634-thq-text-elm118">Catégories</span>
      </div>
      <div className="frame14634-thq-frame14632-elm">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className={category.className}
              onClick={() => handleCategoryClick(category.slug)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src="/rectangle7i155-qtjr-200h.png"
                alt={category.name}
                className={category.rectClass}
              />
              <Icon
                size={48}
                color="#404040"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -70%)',
                }}
              />
              <span className={category.textClass}>
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
