"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItemType } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface NavItemProps {
  item: NavItemType;
  isMobile?: boolean;
  onLinkClick?: () => void; // For mobile menu to close on click
}

const NavItem = ({ item, isMobile, onLinkClick }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

  if (item.children && item.children.length > 0) {
    if (isMobile) {
      // Basic mobile dropdown - could be improved with Accordion
      return (
        <div className="py-2">
          <span className="flex justify-between items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">
            {item.label}
            <ChevronDown className="h-4 w-4" />
          </span>
          <div className="mt-1 space-y-1 pl-4">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onLinkClick}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === child.href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
              isActive ? "text-primary" : "text-foreground/80"
            )}
          >
            {item.label}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {item.children.map((child) => (
            <DropdownMenuItem key={child.href} asChild>
              <Link href={child.href} className={cn(pathname === child.href ? "font-semibold text-primary" : "")}>
                {child.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onLinkClick}
      className={cn(
        isMobile 
          ? "block px-3 py-2 rounded-md text-base font-medium"
          : "text-sm font-medium transition-colors hover:text-primary focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
        isActive 
          ? (isMobile ? "bg-primary text-primary-foreground" : "text-primary")
          : (isMobile ? "text-foreground hover:bg-secondary" : "text-foreground/80")
      )}
    >
      {item.label}
    </Link>
  );
};

export default NavItem;
