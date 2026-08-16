import { useState, useEffect } from 'react';
import { storageService } from './utils/storage';
import { filterAndSortContents, translations } from './utils/helpers';
import { ContentCard } from './components/ContentCard';
import { FilterPanel } from './components/FilterPanel';
import { ContentForm } from './components/ContentForm';
import { StatsCard } from './components/StatsCard';
import { Modal } from './components/Modal';

const FAVORITE_POSTERS = [
  '/posters/lotr.jpg',
  '/posters/httyd.jpg',
  '/posters/ratatouille.jpg',
  '/posters/ford-v-ferrari.jpg',
  '/posters/top-gun.jpg',
  '/posters/ice-age.jpg',
  '/posters/vikings.jpg',
  '/posters/dinosaur.jpg',
  '/posters/shawshank.jpg',
  '/posters/ryan.jpg',
];

function App() {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    genre: 'all',
    sortBy: 'title',
    sortOrder: 'asc',
    searchQuery: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [stats, setStats] = useState(storageService.getStats());

  useEffect(() => {
    const loadedContents = storageService.getAll();
    setContents(loadedContents);
  }, []);

  useEffect(() => {
    const filtered = filterAndSortContents(contents, filters);
    setFilteredContents(filtered);
  }, [contents, filters]);

  const handleOpenForm = (content) => {
    setEditingContent(content || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingContent(null);
  };

  const handleSave = (data) => {
    if (editingContent) {
      const updated = storageService.update(editingContent.id, data);
      if (updated) {
        setContents((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      }
    } else {
      const newContent = storageService.add(data);
      setContents((prev) => [...prev, newContent]);
    }
    setStats(storageService.getStats());
    handleCloseForm();
  };

  const handleDelete = (id) => {
    if (storageService.delete(id)) {
      setContents((prev) => prev.filter((c) => c.id !== id));
      setStats(storageService.getStats());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Posters */}
      <div className="floating-posters floating-posters-left">
        <div className="poster-strip">
          {FAVORITE_POSTERS.map((poster, index) => (
            <div key={index} className="poster-item">
              <img src={poster} alt={`Favorite ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="poster-strip poster-strip-reverse" style={{ animationDelay: '-15s' }}>
          {FAVORITE_POSTERS.map((poster, index) => (
            <div key={`reverse-${index}`} className="poster-item">
              <img src={poster} alt={`Favorite ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="floating-posters floating-posters-right">
        <div className="poster-strip poster-strip-reverse">
          {FAVORITE_POSTERS.map((poster, index) => (
            <div key={`right-${index}`} className="poster-item">
              <img src={poster} alt={`Favorite ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="poster-strip" style={{ animationDelay: '-17s' }}>
          {FAVORITE_POSTERS.map((poster, index) => (
            <div key={`right-reverse-${index}`} className="poster-item">
              <img src={poster} alt={`Favorite ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="relative overflow-hidden">
          {/* Background Posters */}
          <div className="absolute inset-0 opacity-8">
            {FAVORITE_POSTERS.map((poster, index) => (
              <div
                key={index}
                className="absolute w-28 h-36 rounded-xl overflow-hidden shadow-xl blur-[2px]"
                style={{
                  left: `${5 + index * 11}%`,
                  top: `${30 + (index % 2) * 30}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                <img src={poster} alt={`Background ${index + 1}`} className="w-full h-full object-cover opacity-30" />
              </div>
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              {/* Brand Section */}
              <div className="flex items-center gap-3">
                {/* Logo/Icon */}
                <div className="w-11 h-11 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-xl">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2z"/>
                  </svg>
                </div>

                {/* Brand Text */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Seriesly</h1>
                  <p className="text-sm text-gray-500">Film & Dizi Takip Sistemi</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleOpenForm()}
                className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni İçerik
              </button>
            </div>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <StatsCard stats={stats} />

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              contentsCount={filteredContents.length}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredContents.length === 0 ? (
              <div className="card p-16 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {contents.length === 0 ? 'Henüz içerik yok' : 'Sonuç bulunamadı'}
                </h3>
                <p className="text-gray-500 mb-6 text-sm">
                  {contents.length === 0
                    ? 'İlk filmini veya dizini eklemeye başla'
                    : 'Filtre kriterlerini değiştirmeyi dene'}
                </p>
                {contents.length === 0 && (
                  <button onClick={() => handleOpenForm()} className="btn-primary">
                    İçerik Ekle
                  </button>
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredContents.map((content) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    onEdit={handleOpenForm}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal isOpen={isFormOpen} onClose={handleCloseForm}>
        <ContentForm
          contentToEdit={editingContent}
          onSave={handleSave}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  );
}

export default App;
