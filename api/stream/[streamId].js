export default async function handler(req, res) {
  const { streamId } = req.query;
  
  // Liste blanche des flux autorisés
  const allowedStreams = {
    'ladatou': 'http://s43.myradiostream.com:23858/stream'
  };

  const streamUrl = allowedStreams[streamId];
  
  if (!streamUrl) {
    return res.status(404).json({ error: 'Stream non trouvé' });
  }

  try {
    // Configurer les en-têtes CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'audio/mpeg');
    
    // Gérer la pré-requête OPTIONS
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Faire une requête vers le flux audio
    const audioResponse = await fetch(streamUrl);
    
    if (!audioResponse.ok) {
      throw new Error(`Erreur HTTP: ${audioResponse.status}`);
    }

    // Transférer les en-têtes de la réponse
    const contentType = audioResponse.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    // Transférer le flux audio
    const audioBuffer = await audioResponse.arrayBuffer();
    res.status(200).send(Buffer.from(audioBuffer));
    
  } catch (error) {
    console.error('Erreur du proxy:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération du flux audio',
      details: error.message 
    });
  }
}
