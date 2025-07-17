import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

export default function VideoPlayer({ currentMedia, isPlaying, onPlay, onPause, onClose }) {
  const [volume, setVolume] = useState([0.7]);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume[0];
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (currentMedia) {
      if (isPlaying) {
        setIsLoading(false); // Vimeo handles loading internally
      } else {
        // No direct pause for iframe, just hide or remove
      }
    }
  }, [currentMedia, isPlaying]);

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

  if (!currentMedia) return null;

  return (
    <>
      {currentMedia.type === 'radio' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 audio-player border-t">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Media Info */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {currentMedia.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm truncate">{currentMedia.name}</h4>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-muted-foreground truncate">{currentMedia.description}</p>
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
                {currentMedia.website && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hidden md:flex w-8 h-8"
                  >
                    <a href={currentMedia.website} target="_blank" rel="noopener noreferrer">
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

          {/* Hidden video element for demo */}
          <video
            ref={videoRef}
            autoPlay={false} // Managed by useEffect
            loop
            className="hidden"
          />
        </div>
      )}

      {/* Vimeo iframe for TV */}
      {currentMedia.type === 'tv' && isPlaying && (
        <div className="fixed bottom-4 right-4 z-50 w-80 h-48 bg-black border border-gray-700 shadow-lg rounded-lg overflow-hidden">
          <iframe
            src={currentMedia.streamUrl + "&autoplay=1"} // Add autoplay parameter
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={currentMedia.name}
          ></iframe>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 text-white z-50 bg-black bg-opacity-50 rounded-full p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  );
}


