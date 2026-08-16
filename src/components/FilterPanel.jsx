import { translations, genreOptions, statusOptions } from '../utils/helpers';

export const FilterPanel = ({ filters, onFiltersChange, contentsCount }) => {
  return (
    <div className="card p-5 space-y-5 sticky top-4 shadow-sm">
      <div>
        <input
          type="text"
          placeholder="Ara..."
          value={filters.searchQuery || ''}
          onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
          className="input-field"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2.5">Tür</h3>
        <div className="flex gap-2">
          {(['all', 'movie', 'series']).map((type) => (
            <button
              key={type}
              onClick={() => onFiltersChange({ ...filters, type })}
              className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                filters.type === type
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {translations.contentType[type]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2.5">Durum</h3>
        <div className="grid grid-cols-2 gap-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => onFiltersChange({ ...filters, status: status.value })}
              className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                filters.status === status.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2.5">Kategori</h3>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          <button
            onClick={() => onFiltersChange({ ...filters, genre: 'all' })}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              filters.genre === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tümü
          </button>
          {genreOptions.map((genre) => (
            <button
              key={genre.value}
              onClick={() => onFiltersChange({ ...filters, genre: genre.value })}
              className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                filters.genre === genre.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2.5">Sıralama</h3>
        <div className="flex gap-2">
          <select
            value={filters.sortBy || 'title'}
            onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
            className="input-field text-sm flex-1"
          >
            <option value="title">İsim</option>
            <option value="year">Yıl</option>
            <option value="rating">Puan</option>
            <option value="addedDate">Eklenme</option>
          </select>
          <button
            onClick={() => onFiltersChange({ ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded transition-colors"
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
        {contentsCount} içerik
      </div>
    </div>
  );
};
