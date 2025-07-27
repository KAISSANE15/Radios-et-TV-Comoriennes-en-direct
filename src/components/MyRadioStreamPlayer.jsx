import { useEffect, useRef } from 'react';

export default function MyRadioStreamPlayer({ streamId, isPlaying, onError }) {
  const playerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!streamId) return;

    const loadScript = () => {
      // Vérifier si le script est déjà chargé
      if (window.MRSP || scriptLoaded.current) {
        initializePlayer();
        return;
      }

      const script = document.createElement('script');
      script.src = '//myradiostream.com/embed/embed.js';
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        initializePlayer();
      };
      script.onerror = (error) => {
        console.error('Erreur lors du chargement du script myradiostream:', error);
        onError && onError('Impossible de charger le lecteur audio');
      };

      document.body.appendChild(script);
    };

    const initializePlayer = () => {
      if (!window.MRSP) {
        console.error('La bibliothèque myradiostream n\'est pas chargée');
        onError && onError('Lecteur non disponible');
        return;
      }

      // Détruire le lecteur existant
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error('Erreur lors de la destruction du lecteur:', e);
        }
      }

      // Créer un nouveau lecteur
      try {
        playerRef.current = new window.MRSP({
          selector: '#myradiostream-player',
          channel: streamId,
          autoplay: isPlaying,
          width: '100%',
          height: '60px'
        });
      } catch (e) {
        console.error('Erreur lors de l\'initialisation du lecteur:', e);
        onError && onError('Erreur d\'initialisation du lecteur');
      }
    };

    loadScript();

    // Nettoyage
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error('Erreur lors du nettoyage du lecteur:', e);
        }
      }
    };
  }, [streamId, isPlaying, onError]);

  // Mettre à jour l'état de lecture
  useEffect(() => {
    if (!playerRef.current) return;
    
    try {
      if (isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    } catch (e) {
      console.error('Erreur lors de la mise à jour de la lecture:', e);
      onError && onError('Erreur de lecture');
    }
  }, [isPlaying, onError]);

  return <div id="myradiostream-player" />;
}
