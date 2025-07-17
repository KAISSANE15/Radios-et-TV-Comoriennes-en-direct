import { Radio, Heart, ExternalLink } from 'lucide-react';
import drapeauComores from '../assets/images/drapeau_comores.png';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Radio className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-primary">Radios Comores</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre portail vers toutes les radios des Comores. Écoutez vos stations préférées 
              en direct et restez connecté à votre culture.
            </p>
            <div className="flex items-center space-x-2">
              <img 
                src={drapeauComores} 
                alt="Drapeau des Comores" 
                className="w-6 h-4 object-cover rounded-sm"
              />
              <span className="text-sm text-muted-foreground">Fièrement comorien</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="font-semibold">Liens rapides</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#accueil" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </a>
              <a href="#radios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Toutes les radios
              </a>
              <a href="#apropos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                À propos
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Informations */}
          <div className="space-y-4">
            <h4 className="font-semibold">Informations</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Ce site rassemble les radios des Comores pour faciliter l'accès 
                à l'information et à la culture comorienne.
              </p>
              <div className="flex items-center space-x-1">
                <span>Développé avec</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>pour les Comores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Radios Comores. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Fait avec React & Tailwind CSS</span>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Code source</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

