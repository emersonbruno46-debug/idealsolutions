import { cn } from "@/lib/utils";

export interface SafariProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Safari({
  url = "magicui.design",
  className,
  children,
}: SafariProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[800px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-black",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-amber-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto flex h-6 w-full max-w-[60%] items-center justify-center rounded-md bg-white px-2 text-[10px] text-zinc-500 shadow-sm dark:bg-black dark:text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          {url}
        </div>
        <div className="w-[42px]"></div>
      </div>
      <div className="relative w-full overflow-hidden bg-white dark:bg-black">
        {children}
      </div>
    </div>
  );
}
