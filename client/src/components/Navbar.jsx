import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Link, Outlet } from "react-router-dom";
import LogoutButton from "./Logout";

const navItems = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Todo", href: "todo" },
];

export default function Navbar() {
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
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
            <LogoutButton />
          </nav>

          {/* Mobile Menu (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <LogoutButton />
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
