import { useState, useEffect } from 'react';
import { translations, genreOptions } from '../utils/helpers';

export const ContentForm = ({ contentToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'movie',
    title: '',
    originalTitle: '',
    year: new Date().getFullYear(),
    genre: [],
    rating: 5,
    status: 'plan-to-watch',
    description: '',
    director: '',
    seasons: 0,
    episodes: 0,
    duration: 0,
    poster: '',
  });

  useEffect(() => {
    if (contentToEdit) {
      setFormData({
        type: contentToEdit.type,
        title: contentToEdit.title,
        originalTitle: contentToEdit.originalTitle || '',
        year: contentToEdit.year,
        genre: contentToEdit.genre,
        rating: contentToEdit.rating,
        status: contentToEdit.status,
        description: contentToEdit.description,
        director: contentToEdit.director || '',
        seasons: contentToEdit.seasons || 0,
        episodes: contentToEdit.episodes || 0,
        duration: contentToEdit.duration || 0,
        poster: contentToEdit.poster || '',
      });
    }
  }, [contentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      type: formData.type,
      title: formData.title.trim(),
      originalTitle: formData.originalTitle.trim(),
      year: formData.year,
      genre: formData.genre,
      rating: formData.rating,
      status: formData.status,
      description: formData.description.trim(),
      director: formData.director.trim(),
      seasons: formData.type === 'series' ? formData.seasons : undefined,
      episodes: formData.type === 'series' ? formData.episodes : undefined,
      duration: formData.type === 'movie' ? formData.duration : undefined,
      poster: formData.poster.trim(),
    });
  };

  const toggleGenre = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  };

  return (
    <div className="card p-6 max-w-2xl mx-auto shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {contentToEdit ? 'Düzenle' : 'Yeni İçerik'}
        </h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl">
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3 p-1 bg-gray-100 rounded-lg">
          {(['movie', 'series']).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type }))}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                formData.type === type
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {type === 'movie' ? 'Film' : 'Dizi'}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Başlık *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="input-field"
            placeholder="Film veya dizi adı"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Orijinal Başlık</label>
            <input
              type="text"
              value={formData.originalTitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, originalTitle: e.target.value }))}
              className="input-field"
              placeholder="Orijinal başlık"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Yıl *</label>
            <input
              type="number"
              required
              min="1900"
              max="2100"
              value={formData.year}
              onChange={(e) => setFormData((prev) => ({ ...prev, year: parseInt(e.target.value) }))}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Yönetmen</label>
          <input
            type="text"
            value={formData.director}
            onChange={(e) => setFormData((prev) => ({ ...prev, director: e.target.value }))}
            className="input-field"
            placeholder="Yönetmen adı"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Kategoriler</label>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
            {formData.genre.length === 0 ? (
              <span className="text-sm text-gray-400">Kategori seçin</span>
            ) : (
              formData.genre.map((g) => (
                <span
                  key={g}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium"
                >
                  {translations.genres[g]}
                  <button
                    type="button"
                    onClick={() => toggleGenre(g)}
                    className="hover:text-gray-300 transition-colors"
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
            {genreOptions.map((genre) => (
              <button
                key={genre.value}
                type="button"
                onClick={() => toggleGenre(genre.value)}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  formData.genre.includes(genre.value)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Puan (1-10) *</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: parseInt(e.target.value) }))}
                className="flex-1 accent-gray-900"
              />
              <span className="text-lg font-bold text-gray-900 w-8 text-center">{formData.rating}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Durum</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="input-field"
            >
              {(['plan-to-watch', 'watching', 'completed', 'dropped']).map((status) => (
                <option key={status} value={status}>
                  {translations.watchStatus[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formData.type === 'movie' && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Süre (dakika)</label>
            <input
              type="number"
              min="1"
              value={formData.duration || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
              className="input-field"
              placeholder="120"
            />
          </div>
        )}

        {formData.type === 'series' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Sezon</label>
              <input
                type="number"
                min="1"
                value={formData.seasons || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, seasons: parseInt(e.target.value) || 0 }))}
                className="input-field"
                placeholder="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Bölüm</label>
              <input
                type="number"
                min="1"
                value={formData.episodes || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, episodes: parseInt(e.target.value) || 0 }))}
                className="input-field"
                placeholder="24"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Poster URL</label>
          <input
            type="url"
            value={formData.poster}
            onChange={(e) => setFormData((prev) => ({ ...prev, poster: e.target.value }))}
            className="input-field"
            placeholder="https://example.com/poster.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Açıklama</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={2}
            className="input-field resize-none"
            placeholder="Kısa özet veya notlar..."
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary flex-1">
            {contentToEdit ? 'Kaydet' : 'Ekle'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            İptal
          </button>
        </div>
      </form>
    </div>
  );
};
