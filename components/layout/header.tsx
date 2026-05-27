"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCHOOL_INFO, NAV_ITEMS } from "@/lib/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-border/80 shadow-md py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 group outline-none"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-300">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {SCHOOL_INFO.shortName}
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline-block font-medium">
                Catarinense • INEP {SCHOOL_INFO.inep}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp CTA Button */}
          <div className="hidden md:block">
            <a
              href={SCHOOL_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Secretaria Digital</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-muted-foreground hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              aria-label="Alternar Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 top-[60px] bottom-0 z-40 bg-background/98 backdrop-blur-lg border-t border-border md:hidden transition-all duration-300 ease-in-out flex flex-col justify-between p-6",
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 p-3 rounded-xl hover:bg-emerald-500/5 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="mt-auto space-y-4">
          <a
            href={SCHOOL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full justify-center inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Secretaria Digital (WhatsApp)</span>
          </a>
          <div className="text-center text-xs text-muted-foreground">
            <p className="font-semibold">{SCHOOL_INFO.name}</p>
            <p className="mt-1">{SCHOOL_INFO.address.full}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
