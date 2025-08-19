"use client";

import { Link } from 'react-router-dom';
import { Recycle, Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext.jsx';
import { useAuth } from '@/hooks/use-auth.js';
import { useState } from 'react';

const navLinks = [
  { href: '/bins', label: 'Find Bins' },
  { href: '/process', label: 'Our Process' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const totalCartItems = cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Recycle className="h-8 w-8" />
          <span className="font-bold text-xl">EcoCycle Rewards</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm font-medium hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
          <Button variant="outline" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">{totalCartItems}</span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/reports">Admin Dashboard</Link>
          </Button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">{totalCartItems}</span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild onClick={() => setOpen(true)}>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" open={open} onOpenChange={setOpen}>
              <div className="flex flex-col gap-6 p-2">
                <Link to="/" className="flex items-center gap-2 mb-4" onClick={() => setOpen(false)}>
                  <Recycle className="h-6 w-6" />
                  <span className="font-bold text-lg">EcoCycle Rewards</span>
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-6 mt-4 flex flex-col gap-4">
                  {user ? (
                    <>
                      <Button variant="outline" asChild><Link to="/profile" onClick={() => setOpen(false)}>My Account</Link></Button>
                      <Button variant="ghost" onClick={() => { logout(); setOpen(false); }}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild><Link to="/login" onClick={() => setOpen(false)}>Login</Link></Button>
                      <Button asChild><Link to="/register" onClick={() => setOpen(false)}>Sign Up</Link></Button>
                    </>
                  )}
                  <Button variant="secondary" asChild><Link to="/reports" onClick={() => setOpen(false)}>Admin Dashboard</Link></Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

