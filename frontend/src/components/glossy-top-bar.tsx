"use client";

export function GlossyTopBarComponent() {
  return (
    <div className="px-12 py-8">
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-neutral-900 shadow-lg backdrop-blur-md bg-opacity-70 dark:bg-opacity-70 rounded-lg">
        <div className="flex items-center px-4">
          <span className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
            Ali's Home
          </span>
        </div>
        <div className="flex items-center px-4">
          <span className="text-neutral-950 dark:text-neutral-50 px-4">
            Welcome back, Ali
          </span>
          <img
            src="/Memoji.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
