import React, { useState, useEffect } from 'react';
import EmailFooter from './EmailFooter';

interface Template3Props {
  recipientName: string;
  recipientGender: 'Male' | 'Female';
}

const Template3: React.FC<Template3Props> = ({ recipientName, recipientGender }) => {
  const paragraphStyle = { marginBottom: '1.5em' };

  const greeting =
    recipientGender === 'Male' ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

  // Base64 image references
  const images = {
    fondations: '/images/email/binary/template3/Fondations et OBNL_base64.txt',
    politiquePlacement:
      '/images/email/binary/template3/Trousse_base64.txt',
  };

  // State for storing Base64-encoded images
  const [fondationsBase64, setFondationsBase64] = useState<string>('');
  const [politiquePlacementBase64, setPolitiquePlacementBase64] = useState<string>('');

  const readBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    return await response.text();
  };

  useEffect(() => {
    Promise.all([
      readBase64(images.fondations).then(setFondationsBase64),
      readBase64(images.politiquePlacement).then(setPolitiquePlacementBase64),
    ]);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6em', padding: '20px' }}>
      <p style={paragraphStyle}>{greeting}</p>

      <p style={paragraphStyle}>
        Selon les saines pratiques de gestion financière d’un OBNL, la mise en place ou mise à jour d’une politique de placement est
        souhaitable.{' '}
        <a href="https://imaginecanada.ca/fr" style={{ color: '#1a73e8' }}>
          Image Canada
        </a>
        , un organisme dont la mission est de renforcer la gouvernance des OBNL, présente la{' '}
        <a href="https://www.sourceosbl.ca/resource/glossary/un-examen-approfondi-de-la-norme-b8" style={{ color: '#1a73e8' }}>
          norme B8
        </a>{' '}
        qui suggère l’élaboration d’une politique de placement afin d’assurer que le rendement des actifs d’un organisme soit
        supérieur au taux d’inflation.
      </p>

      <p style={paragraphStyle}>
        À cet égard, notre{' '}
        <a
          href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/outils-obnl/politique-de-placement.pdf"
          style={{ color: '#1a73e8' }}
        >
          trousse sur les politiques de placement
        </a>{' '}
        fournit les outils nécessaires à cette réflexion et notre{' '}
        <a
          href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/obnl-fondations.html"
          style={{ color: '#1a73e8' }}
        >
          offre clé en main
        </a>{' '}
        permettra à votre organisation d’être accompagné tout au long de ce processus. Consultez notre offre OBNL et la trousse sur
        les politiques de placement pour OBNL :
      </p>

      <div style={{ textAlign: 'left', margin: '20px 0' }}>
        {fondationsBase64 && (
          <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/obnl-fondations.html">
            <img
              src={fondationsBase64}
              alt="Fondations et OBNL"
              style={{ maxWidth: '100%', borderRadius: '5px', marginBottom: '20px' }}
            />
          </a>
        )}
        {politiquePlacementBase64 && (
          <a href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/outils-obnl/politique-de-placement.pdf">
            <img
              src={politiquePlacementBase64}
              alt="Trousse d'élaboration Politique de placement OBNL"
              style={{ maxWidth: '100%', borderRadius: '5px' }}
            />
          </a>
        )}
      </div>

      <p style={paragraphStyle}>
        Si l’optimisation des rendements est une source de préoccupation pour vous, notre équipe sera en mesure de vous guider à les
        améliorer.
      </p>

      <p style={paragraphStyle}>Bonne journée !</p>

      <p style={paragraphStyle}>Jean Philippe</p>

      <p style={paragraphStyle}>
        Voir mes disponibilités en temps réel et planifier une rencontre :
        <br />
        <a href="https://outlook.office365.com/book/GroupeFinancierBernard" style={{ color: '#1a73e8' }}>
          https://outlook.office365.com/book/GroupeFinancierBernard
        </a>
      </p>
      <EmailFooter />
    </div>
  );
};

export default Template3;
