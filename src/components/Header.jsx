import { useState } from 'react';
import { Search, Menu, X, Radio } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Header({ onSearch, searchTerm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Radio className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-primary">Radios Comores</h1>
            <p className="text-xs text-muted-foreground">Écoutez en direct</p>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher une radio..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#accueil" className="text-sm font-medium hover:text-primary transition-colors">
            Accueil
          </a>
          <a href="#radios" className="text-sm font-medium hover:text-primary transition-colors">
            Radios
          </a>
          <a href="#apropos" className="text-sm font-medium hover:text-primary transition-colors">
            À propos
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher une radio..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <a href="#accueil" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Accueil
              </a>
              <a href="#radios" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Radios
              </a>
              <a href="#apropos" className="text-sm font-medium hover:text-primary transition-colors py-2">
                À propos
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

