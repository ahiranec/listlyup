interface SharePreviewCardProps {
  product: {
    id: string;
    title: string;
    price: string;
    location: string;
    image: string;
    rating?: number;
    type: string;
  };
}

export default function SharePreviewCard({ product }: SharePreviewCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100">
      <div className="flex gap-3">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">{product.title}</h3>
          <p className="text-lg font-bold text-blue-600 mt-1">{product.price}</p>
          <p className="text-xs text-gray-500 mt-1">{product.location}</p>
          {product.rating && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-yellow-600">⭐</span>
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
