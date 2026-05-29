import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, ClipboardList, Users, Globe, Clock } from "lucide-react";

const stats = [
  { icon: ClipboardList, value: "2,450+", label: "ACTIVE LISTINGS" },
  { icon: Users, value: "680+", label: "VERIFIED SELLERS" },
  { icon: Globe, value: "32", label: "COUNTRIES" },
  { icon: Clock, value: "24h", label: "AVG. RESPONSE TIME" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[720px] flex flex-col justify-end overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&q=80"
          alt="Industrial excavator"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_0%_5%)]/95 via-[hsl(0_0%_5%)]/80 to-[hsl(0_0%_5%)]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_5%)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* Left: Text content */}
          <div className="max-w-xl">
            <h1
              className="font-[family-name:var(--font-barlow-condensed)] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase leading-[1.05] tracking-tight text-white"
            >
              The industrial
              <br />
              marketplace
              <br />
              for serious buyers.
              <br />
              <span className="text-[hsl(22_97%_46%)]">Real equipment.</span>
              <br />
              <span className="text-[hsl(22_97%_46%)]">Real deals.</span>
            </h1>
            <p className="mt-5 text-base text-[hsl(0_0%_70%)] max-w-md leading-relaxed">
              Buy and sell heavy equipment, machinery, vehicles and industrial assets
              across the Balkans and beyond.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="default" size="lg">
                Browse Equipment
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Play className="h-4 w-4 fill-current" />
                How it Works
              </Button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[hsl(0_0%_25%)]/50 pt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon className="h-5 w-5 text-[hsl(0_0%_54%)]" />
              <div>
                <div className="font-[family-name:var(--font-roboto-mono)] text-lg font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[hsl(0_0%_54%)]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
