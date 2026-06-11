import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton', className)} />
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-3 w-24 rounded" />
      <Skeleton className="h-8 w-16 rounded-lg" />
      <Skeleton className="h-2.5 w-32 rounded" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-[rgba(12,14,18,0.04)]">
      <Skeleton className="w-9 h-9 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3 w-36 rounded" />
        <Skeleton className="h-2.5 w-24 rounded" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card overflow-hidden">
      <div className="bg-[#F7F8FA] px-4 py-3 border-b border-[rgba(12,14,18,0.06)]">
        <Skeleton className="h-3 w-48 rounded" />
      </div>
      {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}
