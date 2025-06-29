'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-900 transition-colors"
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <Mic2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Aria Voice</span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <Button asChild variant="outline">
              {/* NEW entry-point */}
              <Link href="/start">Start Free Trial</Link>
            </Button>
          </nav>

          {/* mobile hamburger */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* mobile nav */}
        {open && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/faq">FAQ</NavLink>
              <Button asChild className="w-full">
                <Link href="/start">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
