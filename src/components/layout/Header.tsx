"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/common/Logo';
import NavItem from '@/components/layout/NavItem';
import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import type { NavItemType } from '@/types';
import { services } from '@/data/mock';

const navItems: NavItemType[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: services.map(service => ({ label: service.title, href: service.slug })),
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'AI Pricing', href: '/ai-pricing' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-background'}`}>
      <Container className="flex items-center justify-between h-20">
        <Logo />
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Logo iconSize={24} textSize="text-xl" />
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Close menu">
                        <X className="h-6 w-6" />
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow p-4 space-y-1">
                  {navItems.map((item) => (
                    <NavItem key={item.href} item={item} isMobile onLinkClick={closeMobileMenu} />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
};

export default Header;
