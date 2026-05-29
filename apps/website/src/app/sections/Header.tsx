"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Marketplace", href: "#", hasDropdown: true },
  { label: "Auctions", href: "#" },
  { label: "Categories", href: "#", hasDropdown: true },
  { label: "Services", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/eb-logo.png"
              alt="Equipment Balkans"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[hsl(0_0%_78%)] leading-tight">
                Equipment
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[hsl(0_0%_78%)] leading-tight">
                Balkans
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-0.5 px-3 py-2 text-sm text-[hsl(0_0%_78%)] hover:text-foreground transition-colors"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Login
            </Button>
            <Button variant="default" size="sm" className="hidden sm:inline-flex">
              + Post an Ad
            </Button>
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[hsl(0_0%_78%)]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[hsl(0_0%_25%)] bg-[hsl(0_0%_10%)]/95 backdrop-blur-sm">
            <nav className="flex flex-col py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between px-4 py-3 text-sm text-[hsl(0_0%_78%)] hover:text-foreground hover:bg-[hsl(0_0%_18%)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-4 w-4 opacity-60" />}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-3 border-t border-[hsl(0_0%_25%)]">
                <Button variant="ghost" size="sm">Login</Button>
                <Button variant="default" size="sm">+ Post an Ad</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
