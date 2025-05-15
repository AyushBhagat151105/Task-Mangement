import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./Logout";
import ThemeToggle from "./ThemeToggle";
import React from "react";

const navItems = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Todo", href: "todo" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <header className="w-full border-b sticky top-0 bg-background z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Todo
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium hover:underline underline-offset-4 ${
                  location.pathname.includes(item.href)
                    ? "underline font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <LogoutButton />
          </nav>

          {/* Mobile Menu (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] flex flex-col">
              {/* Header with Close button */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="text-lg font-bold">Menu</h2>
                <SheetClose asChild>
                  <Button size="icon" variant="ghost">
                    {/* <X className="h-6 w-6" /> */}
                  </Button>
                </SheetClose>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4 mt-6 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      to={item.href}
                      className={`text-sm font-medium ${
                        location.pathname.includes(item.href)
                          ? "underline font-semibold"
                          : "hover:underline"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Theme Toggle & Logout */}
              <div className="mt-auto px-4 py-6 border-t flex flex-col gap-4">
                <ThemeToggle />
                <LogoutButton />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
