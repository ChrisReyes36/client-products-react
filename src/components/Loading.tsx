export default function Loading() {
  return (
    <div className="flex items-center justify-center py-10 gap-3">
      <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="text-gray-600 font-medium">Cargando...</span>
    </div>
  );
}
