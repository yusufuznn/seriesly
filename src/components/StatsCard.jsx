export const StatsCard = ({ stats }) => {
  return (
    <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
      <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-lg px-5 py-3 min-w-fit shadow-sm">
        <div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Toplam</div>
        </div>
        <div className="h-8 w-px bg-gray-200"></div>
        <div>
          <div className="text-lg font-semibold text-gray-900">{stats.movies}</div>
          <div className="text-xs text-gray-500">Film</div>
        </div>
        <div className="h-8 w-px bg-gray-200"></div>
        <div>
          <div className="text-lg font-semibold text-gray-900">{stats.series}</div>
          <div className="text-xs text-gray-500">Dizi</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 min-w-fit shadow-sm">
          <span className="text-xs text-gray-500 mr-2">İzlenen:</span>
          <span className="font-semibold text-gray-900">{stats.watching}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 min-w-fit shadow-sm">
          <span className="text-xs text-gray-500 mr-2">Tamamlanan:</span>
          <span className="font-semibold text-gray-900">{stats.completed}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 min-w-fit shadow-sm">
          <span className="text-xs text-gray-500 mr-2">Listemde:</span>
          <span className="font-semibold text-gray-900">{stats.planToWatch}</span>
        </div>
      </div>

      {stats.averageRating > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 min-w-fit shadow-sm ml-auto">
          <span className="text-xs text-gray-500 mr-2">Ort. Puan:</span>
          <span className="font-semibold text-gray-900">{stats.averageRating.toFixed(1)}</span>
        </div>
      )}
    </div>
  );
};
