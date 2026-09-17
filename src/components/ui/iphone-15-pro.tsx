import { cn } from "@/lib/utils";

export interface Iphone15ProProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Iphone15Pro({
  className,
  children,
  ...props
}: Iphone15ProProps) {
  return (
    <div
      className={cn(
        "relative mx-auto h-[600px] w-[280px] overflow-hidden rounded-[3rem] border-[8px] border-zinc-900 bg-black shadow-2xl ring-1 ring-zinc-800",
        className
      )}
      {...props}
    >
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
        <div className="w-24 h-6 bg-zinc-900 rounded-b-xl flex items-center justify-between px-2">
           {/* Dynamic Island */}
           <div className="w-1.5 h-1.5 rounded-full bg-white/10 ml-1"></div>
           <div className="w-2 h-2 rounded-full bg-black/50 border border-white/5"></div>
        </div>
      </div>
      <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-white">
        {children}
      </div>
    </div>
  );
}
