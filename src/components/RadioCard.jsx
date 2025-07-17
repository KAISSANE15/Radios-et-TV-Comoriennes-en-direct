import { Play, Pause, Users, MapPin, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

export default function RadioCard({ radio, isPlaying, onPlay, onPause }) {
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(radio);
    }
  };

  return (
    <Card className="radio-card group cursor-pointer border-2 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Logo placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
              <img 
                src={radio.logo} 
                alt={`${radio.name} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{radio.name}</h3>
              <p className="text-sm text-muted-foreground">{radio.frequency}</p>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            {radio.isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <Badge variant={radio.isOnline ? "default" : "secondary"}>
              {radio.isOnline ? "En ligne" : "Hors ligne"}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {radio.description}
        </p>

        {/* Info */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{radio.location}</span>
          </div>
          {radio.isOnline && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{radio.listeners.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <Badge variant="outline" className="text-xs">
            {radio.category}
          </Badge>
        </div>

        {/* Play Button */}
        <Button 
          className={`w-full ${isPlaying ? 'radio-playing' : ''}`}
          variant={isPlaying ? "default" : "outline"}
          onClick={handlePlayPause}
          disabled={!radio.isOnline}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              En cours de lecture
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              {radio.isOnline ? "Écouter" : "Indisponible"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

