import Image from 'next/image';

export function LoadingPage() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={`flex min-h-[85vh] bg-love-50 items-center justify-center`}>
      <div className={`flex-col items-center`}>
      <Image
        src="/loading-bar.png"
        alt="Loading bar"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      {`Loading...`}
      </div>
    </div>
  )
}