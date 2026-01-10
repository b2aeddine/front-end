import React from 'react';
import { useNavigate } from 'react-router-dom';
import './frame14634.css';

const categories = [
  { id: 1, name: "Marketing Digital", slug: "marketing-digital", className: "frame14634-thq-component2-elm", rectClass: "frame14634-thq-rectangle7-elm1", imgClass: "frame14634-thq-image25-elm1", textClass: "frame14634-thq-text-elm119", rectSrc: "/rectangle7i155-qtjr-200h.png", imgSrc: "/image25i155-tlu9-200h.png" },
  { id: 2, name: "Création de Contenu", slug: "creation-contenu", className: "frame14634-thq-component3-elm", rectClass: "frame14634-thq-rectangle7-elm2", imgClass: "frame14634-thq-image25-elm2", textClass: "frame14634-thq-text-elm120", rectSrc: "/rectangle7i155-ftrb-200h.png", imgSrc: "/image25i155-vd5p-200h.png" },
  { id: 3, name: "Design Graphique", slug: "design-graphique", className: "frame14634-thq-component4-elm", rectClass: "frame14634-thq-rectangle7-elm3", imgClass: "frame14634-thq-image25-elm3", textClass: "frame14634-thq-text-elm121", rectSrc: "/rectangle7i155-4r6h-200h.png", imgSrc: "/image25i155-5bz-200h.png" },
  { id: 4, name: "Vidéo & Animation", slug: "video-animation", className: "frame14634-thq-component5-elm", rectClass: "frame14634-thq-rectangle7-elm4", imgClass: "frame14634-thq-image25-elm4", textClass: "frame14634-thq-text-elm122", rectSrc: "/rectangle7i155-f61j-200h.png", imgSrc: "/image25i155-u7b-200h.png" },
  { id: 5, name: "Rédaction Web", slug: "redaction-web", className: "frame14634-thq-component7-elm", rectClass: "frame14634-thq-rectangle7-elm5", imgClass: "frame14634-thq-image25-elm5", textClass: "frame14634-thq-text-elm123", rectSrc: "/rectangle7i155-97xm-200h.png", imgSrc: "/image25i155-utv-200h.png" },
  { id: 6, name: "Photographie", slug: "photographie", className: "frame14634-thq-component6-elm", rectClass: "frame14634-thq-rectangle7-elm6", imgClass: "frame14634-thq-image25-elm6", textClass: "frame14634-thq-text-elm124", rectSrc: "/rectangle7i155-uexi-200h.png", imgSrc: "/image25i155-ugy-200h.png" },
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
        {categories.map((category) => (
          <div
            key={category.id}
            className={category.className}
            onClick={() => handleCategoryClick(category.slug)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={category.rectSrc}
              alt={category.name}
              className={category.rectClass}
            />
            <img
              src={category.imgSrc}
              alt={category.name}
              className={category.imgClass}
            />
            <span className={category.textClass}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
