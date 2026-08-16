const STORAGE_KEY = 'cine-track-contents';

// LocalStorage servisi - CRUD işlemleri
export const storageService = {
  // Tüm içeriği getir
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Veri okuma hatası:', error);
      return [];
    }
  },

  // Tek bir içerik getir
  getById: (id) => {
    try {
      const contents = storageService.getAll();
      return contents.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Veri okuma hatası:', error);
      return null;
    }
  },

  // Yeni içerik ekle
  add: (content) => {
    const contents = storageService.getAll();
    const now = new Date().toISOString();
    const newContent = {
      ...content,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    contents.push(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contents));
    return newContent;
  },

  // İçerik güncelle
  update: (id, updates) => {
    const contents = storageService.getAll();
    const index = contents.findIndex(c => c.id === id);

    if (index === -1) return null;

    const updatedContent = {
      ...contents[index],
      ...updates,
      id, // ID değiştirilemez
      createdAt: contents[index].createdAt, // Oluşturma tarihi değiştirilemez
      updatedAt: new Date().toISOString(),
    };

    contents[index] = updatedContent;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contents));
    return updatedContent;
  },

  // İçerik sil
  delete: (id) => {
    const contents = storageService.getAll();
    const filteredContents = contents.filter(c => c.id !== id);

    if (filteredContents.length === contents.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredContents));
    return true;
  },

  // Tüm içeriği temizle
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  // İstatistikleri getir
  getStats: () => {
    const contents = storageService.getAll();
    return {
      total: contents.length,
      movies: contents.filter(c => c.type === 'movie').length,
      series: contents.filter(c => c.type === 'series').length,
      completed: contents.filter(c => c.status === 'completed').length,
      watching: contents.filter(c => c.status === 'watching').length,
      planToWatch: contents.filter(c => c.status === 'plan-to-watch').length,
      dropped: contents.filter(c => c.status === 'dropped').length,
      averageRating: contents.length > 0
        ? contents.reduce((sum, c) => sum + c.rating, 0) / contents.length
        : 0,
    };
  },
};
