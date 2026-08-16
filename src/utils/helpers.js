export const translations = {
  contentType: {
    movie: 'Film',
    series: 'Dizi',
    all: 'Tümü',
  },
  watchStatus: {
    'plan-to-watch': 'İzlenecek',
    watching: 'İzleniyor',
    completed: 'Tamamlandı',
    dropped: 'Bırakılan',
    all: 'Tümü',
  },
  genres: {
    action: 'Aksiyon',
    adventure: 'Macera',
    animation: 'Animasyon',
    comedy: 'Komedi',
    crime: 'Suç',
    documentary: 'Belgesel',
    drama: 'Dram',
    fantasy: 'Fantastik',
    horror: 'Korku',
    mystery: 'Gizem',
    romance: 'Romantik',
    'sci-fi': 'Bilim Kurgu',
    thriller: 'Gerilim',
    western: 'Western',
    all: 'Tümü',
  },
};

export const genreOptions = [
  { value: 'action', label: 'Aksiyon' },
  { value: 'adventure', label: 'Macera' },
  { value: 'animation', label: 'Animasyon' },
  { value: 'comedy', label: 'Komedi' },
  { value: 'crime', label: 'Suç' },
  { value: 'documentary', label: 'Belgesel' },
  { value: 'drama', label: 'Dram' },
  { value: 'fantasy', label: 'Fantastik' },
  { value: 'horror', label: 'Korku' },
  { value: 'mystery', label: 'Gizem' },
  { value: 'romance', label: 'Romantik' },
  { value: 'sci-fi', label: 'Bilim Kurgu' },
  { value: 'thriller', label: 'Gerilim' },
  { value: 'western', label: 'Western' },
];

export const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'plan-to-watch', label: 'İzlenecek' },
  { value: 'watching', label: 'İzleniyor' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'dropped', label: 'Bırakılan' },
];

export const getStatusColor = (status) => {
  const colors = {
    'plan-to-watch': 'bg-neutral-600',
    'watching': 'bg-amber-600',
    'completed': 'bg-emerald-600',
    'dropped': 'bg-red-600',
  };
  return colors[status] || 'bg-neutral-600';
};

export const getRatingColor = (rating) => {
  if (rating >= 8) return 'text-emerald-400';
  if (rating >= 6) return 'text-amber-400';
  if (rating >= 4) return 'text-orange-400';
  return 'text-red-400';
};

export const filterAndSortContents = (contents, filters) => {
  let filtered = [...contents];

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(c => c.type === filters.type);
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(c => c.status === filters.status);
  }

  if (filters.genre && filters.genre !== 'all') {
    filtered = filtered.filter(c => c.genre.includes(filters.genre));
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      c =>
        c.title.toLowerCase().includes(query) ||
        (c.originalTitle && c.originalTitle.toLowerCase().includes(query)) ||
        (c.director && c.director.toLowerCase().includes(query))
    );
  }

  const sortBy = filters.sortBy || 'title';
  const sortOrder = filters.sortOrder || 'asc';

  filtered.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title, 'tr');
        break;
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'addedDate':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return filtered;
};

export const getPosterPlaceholder = (title, type) => {
  const baseUrl = 'https://placehold.co/300x450/e5e7eb/6b7280?text=';
  const encodedTitle = encodeURIComponent(title.substring(0, 20));
  return `${baseUrl}${encodedTitle}`;
};
