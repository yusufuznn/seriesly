import { translations, getPosterPlaceholder } from '../utils/helpers';

const STATUS_COLORS = {
  'plan-to-watch': 'bg-blue-500',
  'watching': 'bg-yellow-500',
  'completed': 'bg-green-500',
  'dropped': 'bg-red-500',
};

const RATING_COLORS = {
  high: 'text-green-600',
  medium: 'text-yellow-600',
  low: 'text-red-600',
};

export const ContentCard = ({ content, onEdit, onDelete }) => {
  const ratingColor = content.rating >= 7 ? RATING_COLORS.high : content.rating >= 5 ? RATING_COLORS.medium : RATING_COLORS.low;

  return (
    <div className="poster-card group shadow-sm hover:shadow-md transition-shadow">
      <img
        src={content.poster || getPosterPlaceholder(content.title, content.type)}
        alt={content.title}
        loading="lazy"
      />

      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        <div className="flex flex-col gap-1.5">
          <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[content.status]} text-white`}>
            {translations.watchStatus[content.status]}
          </span>
          <span className="px-2 py-1 rounded text-xs bg-black/70 text-white">
            {content.year}
          </span>
        </div>
        <div className={`px-2 py-1 rounded text-sm font-semibold bg-white shadow-sm ${ratingColor}`}>
          {content.rating}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2">
          <button
            onClick={() => onEdit(content)}
            className="flex-1 bg-white hover:bg-gray-100 text-gray-900 py-2 rounded text-sm font-medium transition-colors shadow"
          >
            Düzenle
          </button>
          <button
            onClick={() => {
              if (window.confirm(`${content.title} silinsin mi?`)) {
                onDelete(content.id);
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};
