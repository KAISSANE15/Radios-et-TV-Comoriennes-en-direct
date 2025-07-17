import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

export default function AudioPlayer({ currentRadio, isPlaying, onPlay, onPause, onClose }) {
  const [volume, setVolume] = useState([0.7]);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0];
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (currentRadio) {
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.src = currentRadio.streamUrl;
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsLoading(false);
        }).catch(error => {
          console.error("Error playing audio:", error);
          setIsLoading(false);
          onPause(); // Pause if playback fails
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentRadio, isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
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
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
              {currentRadio.name.charAt(0)}
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

      {/* Hidden audio element for demo */}
      <audio
        ref={audioRef}
        autoPlay={false} // Managed by useEffect
        loop
        className="hidden"
      />
    </div>
  );
}

