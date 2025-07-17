import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import RadioCard from './components/RadioCard';
import AudioPlayer from './components/AudioPlayer';
import Footer from './components/Footer';
import { radios } from './data/radios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedLocation, setSelectedLocation] = useState('Toutes');
  const [currentRadio, setCurrentRadio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter radios based on search and filters
  const filteredRadios = radios.filter(radio => {
    const matchesSearch = radio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         radio.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || radio.category === selectedCategory;
    const matchesLocation = selectedLocation === 'Toutes' || radio.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const onlineRadios = radios.filter(radio => radio.isOnline).length;

  const handlePlayRadio = (radio) => {
    setCurrentRadio(radio);
    setIsPlaying(true);
  };

  const handlePauseRadio = () => {
    setIsPlaying(false);
  };

  const handleClosePlayer = () => {
    setCurrentRadio(null);
    setIsPlaying(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory('Toutes');
    setSelectedLocation('Toutes');
    setSearchTerm('');
  };

  const scrollToRadios = () => {
    document.getElementById('radios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />
      
      <main>
        <HeroSection 
          onScrollToRadios={scrollToRadios}
          totalRadios={radios.length}
          onlineRadios={onlineRadios}
        />
        
        <section id="radios" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Toutes les radios des Comores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre collection complète de radios comoriennes. 
              Filtrez par catégorie ou localisation pour trouver votre station préférée.
            </p>
          </div>

          <FilterBar
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            onCategoryChange={setSelectedCategory}
            onLocationChange={setSelectedLocation}
            onClearFilters={handleClearFilters}
            filteredCount={filteredRadios.length}
            totalCount={radios.length}
          />

          {filteredRadios.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucune radio trouvée</h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche ou vos filtres.
              </p>
              <button 
                onClick={handleClearFilters}
                className="text-primary hover:underline"
              >
                Effacer tous les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRadios.map((radio) => (
                <RadioCard
                  key={radio.id}
                  radio={radio}
                  isPlaying={currentRadio?.id === radio.id && isPlaying}
                  onPlay={handlePlayRadio}
                  onPause={handlePauseRadio}
                />
              ))}
            </div>
          )}
        </section>

        <section id="apropos" className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">À propos de Radios Comores</h2>
            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Radios Comores est votre portail unique vers toutes les stations de radio 
                des îles Comores. Notre mission est de rassembler en un seul endroit 
                toutes les radios comoriennes pour faciliter l'accès à l'information, 
                à la musique et à la culture de notre archipel.
              </p>
              <p className="leading-relaxed">
                Que vous soyez aux Comores ou dans la diaspora, restez connecté à votre 
                culture grâce à nos radios locales, nationales et internationales. 
                Écoutez les dernières actualités, découvrez la musique comorienne 
                et suivez vos programmes préférés en direct.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AudioPlayer
        currentRadio={currentRadio}
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={handlePauseRadio}
        onClose={handleClosePlayer}
      />
    </div>
  );
}

export default App;

