export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Image */}
      <div className="aspect-[3/4] rounded-2xl bg-brand-muted shimmer" />

      {/* Body */}
      <div className="mt-2.5 space-y-2 px-0.5">
        {/* Colour dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full bg-brand-border shimmer" />
          ))}
        </div>
        {/* Name */}
        <div className="h-3.5 bg-brand-border rounded-full shimmer w-4/5" />
        <div className="h-3.5 bg-brand-border rounded-full shimmer w-3/5" />
        {/* Rating */}
        <div className="h-3 bg-brand-border rounded-full shimmer w-1/3" />
        {/* Price */}
        <div className="h-4 bg-brand-border rounded-full shimmer w-2/5" />
        {/* Button */}
        <div className="h-8 bg-brand-border rounded-xl shimmer w-full md:hidden" />
      </div>
    </div>
  );
}
