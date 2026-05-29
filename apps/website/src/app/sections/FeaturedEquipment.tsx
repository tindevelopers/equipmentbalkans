import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardMeta, CardPrice, CardTitle } from "@/components/ui/card";
import { Bookmark, ChevronRight } from "lucide-react";
import Link from "next/link";

const equipment = [
  {
    id: 1,
    title: "Caterpillar 320D L",
    category: "Excavator",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&q=80",
    year: 2018,
    hours: "6,450 h",
    location: "Germany",
    price: "€58,900",
    featured: true,
    badge: "certified" as const,
  },
  {
    id: 2,
    title: "Linde H80D-03",
    category: "Diesel Forklift",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80",
    year: 2018,
    hours: "8,200 h",
    location: "Croatia",
    price: "€34,500",
    featured: false,
    badge: "inspected" as const,
  },
  {
    id: 3,
    title: "HAAS VF-4SS",
    category: "CNC Vertical Machining Center",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80",
    year: 2020,
    hours: "—",
    location: "USA",
    price: "€89,000",
    featured: false,
    badge: "certified" as const,
  },
  {
    id: 4,
    title: "Atlas Copco QAS 200",
    category: "Generator Set",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&q=80",
    year: 2019,
    hours: "4,100 h",
    location: "Serbia",
    price: "€23,900",
    featured: false,
    badge: "inspected" as const,
  },
];

export default function FeaturedEquipment() {
  return (
    <section className="py-16 bg-[hsl(0_0%_10%)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Featured Equipment
          </h2>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm text-[hsl(0_0%_54%)] hover:text-[hsl(38_96%_50%)] transition-colors"
          >
            View all listings
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipment.map((item) => (
            <Card key={item.id} className="group overflow-hidden cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Badges overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.featured && (
                    <Badge variant="certified">Featured</Badge>
                  )}
                  <Badge variant={item.badge}>
                    {item.badge === "certified" ? "Certified" : "Inspected"}
                  </Badge>
                </div>
                {/* Bookmark */}
                <button className="absolute top-3 right-3 p-1.5 rounded bg-[hsl(0_0%_5%)]/60 text-[hsl(0_0%_78%)] hover:text-white hover:bg-[hsl(0_0%_5%)]/80 transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              <CardContent className="pt-4">
                <div className="text-xs text-[hsl(0_0%_54%)] uppercase tracking-wider mb-1">
                  {item.category}
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardMeta className="mt-2">
                  {item.year} · {item.hours} · {item.location}
                </CardMeta>
              </CardContent>

              <CardFooter className="justify-between">
                <CardPrice>{item.price}</CardPrice>
                <ChevronRight className="h-5 w-5 text-[hsl(0_0%_54%)] group-hover:text-[hsl(38_96%_50%)] transition-colors" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
