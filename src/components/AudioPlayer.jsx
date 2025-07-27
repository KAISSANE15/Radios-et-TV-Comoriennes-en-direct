import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ExternalLink, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import MyRadioStreamPlayer from './MyRadioStreamPlayer';

// Fonction utilitaire pour ajouter des paramètres à une URL
const addUrlParams = (url, params) => {
  if (!url) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${new URLSearchParams(params).toString()}`;
};

export default function AudioPlayer({ currentRadio, isPlaying, onPlay, onPause, onClose }) {
  const [volume, setVolume] = useState([0.7]);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0];
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (!currentRadio) return;

    const audio = audioRef.current;
    
    const handleError = (error) => {
      console.error("Erreur de lecture audio:", error);
      setIsLoading(false);
      onPause();
      setError("Impossible de lire cette station radio. Veuillez réessayer ou sélectionner une autre station.");
      
      // Réinitialiser l'erreur après 5 secondes
      setTimeout(() => {
        setError(null);
      }, 5000);
    };

    const handleCanPlay = () => {
      console.log("Le flux audio est prêt à être lu");
      setIsLoading(false);
      setError(null);
    };

    const handleLoadStart = () => {
      console.log("Chargement du flux audio...");
      setIsLoading(true);
    };

    const handleStalled = () => {
      console.log("Flux audio en attente...");
      setIsLoading(true);
    };

    // Ajout des écouteurs d'événements
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('stalled', handleStalled);

    if (isPlaying) {
      console.log("Tentative de lecture de:", currentRadio.streamUrl);
      
      // Ajout d'un timestamp pour éviter le cache
      const timestamp = new Date().getTime();
      const streamUrl = addUrlParams(currentRadio.streamUrl, { _: timestamp });
      
      // Configuration pour les flux Shoutcast/Icecast
      audio.crossOrigin = 'anonymous';
      audio.preload = 'auto';
      
      // Forcer un nouveau chargement de la source audio
      audio.pause();
      audio.src = streamUrl;
      
      // Essayer de lire le flux
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Erreur lors de la lecture:", error);
          // Essayer avec une approche différente pour les navigateurs stricts
          audio.muted = true;
          audio.play().then(() => {
            audio.muted = false;
          }).catch(handleError);
        });
      }
    } else {
      audio.pause();
    }

    // Nettoyage des écouteurs d'événements
    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('stalled', handleStalled);
    };
  }, [currentRadio, isPlaying, onPause]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      setError(null);
      onPlay();
    }
  };
  
  const handleRetry = () => {
    setError(null);
    onPlay();
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  if (!currentRadio) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 audio-player border-t">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Radio Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
              {currentRadio.logo ? (
                <img src={currentRadio.logo} alt={currentRadio.name} className="w-full h-full object-cover" />
              ) : (
                currentRadio.name.charAt(0)
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm truncate">{currentRadio.name}</h4>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground truncate">{currentRadio.description}</p>
                {isPlaying && !isLoading && (
                  <Badge variant="default" className="text-xs animate-pulse">
                    En direct
                  </Badge>
                )}
                {isLoading && (
                  <Badge variant="secondary" className="text-xs">
                    Connexion...
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {error && (
            <div className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm flex items-center">
              <span>{error}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRetry}
                className="ml-2 h-6 px-2 text-red-700 hover:bg-red-200"
              >
                <RotateCw className="w-3 h-3 mr-1" /> Réessayer
              </Button>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <Button
              size="sm"
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-10 h-10 rounded-full"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>

            {/* Volume Control - Hidden on mobile */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVolumeToggle}
                className="w-8 h-8"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <div className="w-20">
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={1}
                  step={0.1}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Website Link */}
            {currentRadio.website && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden md:flex w-8 h-8"
              >
                <a href={currentRadio.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}

            {/* Close */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden audio element for standard streams */}
      {!isMyRadioStream && (
        <audio
          ref={audioRef}
          autoPlay={false}
          loop={false}
          crossOrigin="anonymous"
          preload="auto"
          className="hidden"
          playsInline
          webkit-playsinline="true"
        />
      )}
      
      {/* MyRadioStream Player */}
      {isMyRadioStream && (
        <div className="hidden">
          <MyRadioStreamPlayer 
            streamId={currentRadio.streamId || 'KAISSANE01'}
            isPlaying={isPlaying}
            onError={(error) => {
              console.error('Erreur du lecteur MyRadioStream:', error);
              setError(error);
              onPause();
            }}
          />
        </div>
      )}
    </div>
  );
}

