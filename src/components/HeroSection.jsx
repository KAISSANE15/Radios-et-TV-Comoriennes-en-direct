import { Button } from './ui/button';
import { Play, Headphones } from 'lucide-react';
import comoresPaysage from '../assets/images/comores_paysage.webp';

export default function HeroSection({ onScrollToRadios, totalRadios, onlineRadios }) {
  return (
    <section id="accueil" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${comoresPaysage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <Headphones className="w-16 h-16 mx-auto mb-4 text-accent" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Radios des
          <span className="block text-accent">Comores</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Découvrez et écoutez toutes vos radios comoriennes préférées en un seul endroit. 
          Musique, actualités, culture en direct.
        </p>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{totalRadios}</div>
            <div className="text-sm text-white/80">Radios disponibles</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/30"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{onlineRadios}</div>
            <div className="text-sm text-white/80">En ligne maintenant</div>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg"
          onClick={onScrollToRadios}
        >
          <Play className="w-5 h-5 mr-2" />
          Découvrir les radios
        </Button>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

