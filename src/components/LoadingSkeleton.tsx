interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />;
}

export function ExchangeCardSkeleton() {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <div>
            <Skeleton className="w-24 h-5 mb-2" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <Skeleton className="w-16 h-7 rounded-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-16 h-6 rounded-full" />
        ))}
      </div>
      <div className="flex gap-2">
        <Skeleton className="flex-1 h-10 rounded-xl" />
        <Skeleton className="flex-1 h-10 rounded-xl" />
      </div>
    </div>
  );
}

export function PriceTableSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
            <Skeleton className="w-6 h-4" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="w-20 h-4 mb-1" />
              <Skeleton className="w-10 h-3" />
            </div>
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-14 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <Skeleton className="w-64 h-8 mx-auto mb-4" />
          <Skeleton className="w-96 h-5 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ExchangeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
