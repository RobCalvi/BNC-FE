import React, { useState, useEffect } from 'react';
import EmailFooter from './EmailFooter';

interface Template7Props {
  recipientName: string;
  recipientGender: 'Male' | 'Female';
}

const Template7: React.FC<Template7Props> = ({ recipientName, recipientGender }) => {
  const paragraphStyle = { marginBottom: '1.5em' };

  const greeting =
    recipientGender === 'Male' ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

  // Base64 image references
  const images = {
    collectiveInsuranceBanner: '/images/email/binary/template7/collectives_base64.txt',
  };

  // State for storing Base64-encoded images
  const [collectiveInsuranceBannerBase64, setCollectiveInsuranceBannerBase64] = useState<string>('');

  const readBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    return await response.text();
  };

  useEffect(() => {
    readBase64(images.collectiveInsuranceBanner).then(setCollectiveInsuranceBannerBase64);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6em', padding: '20px' }}>
      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        {collectiveInsuranceBannerBase64 && (
          <img
            src={collectiveInsuranceBannerBase64}
            alt="Gestion et optimisation des coûts"
            style={{ maxWidth: '100%', borderRadius: '5px' }}
          />
        )}
      </div>

      <p style={paragraphStyle}>{greeting}</p>

      <p style={paragraphStyle}>
        Parmi nos{' '}
        <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/obnl-fondations.html" style={{ color: '#1a73e8' }}>
          services offerts aux OBNL
        </a>
        , nous sommes entourés de partenaires exclusifs pour accompagner les organisations dans l’optimisation des coûts. Les{' '}
        <a href="https://www.hubinternational.com/fr-CA/products/employee-benefits/employee-health-and-performance/" style={{ color: '#1a73e8' }}>
          services collectifs de HUB International
        </a>{' '}
        pourront fournir une proposition pour assurer collectivement les employés de votre entreprise. Leur offre s’étend à tous les
        assureurs au Canada permettant un choix vaste, flexible et adapté aux besoins de la main d’œuvre.
      </p>

      <p style={paragraphStyle}>
        Notre représentant de chez Hub International pourra communiquer avec vous afin de discuter des pistes possibles pour s’assurer
        que votre régime répond bien aux attentes des employés. Il sera également capable d’évaluer la possibilité de diminuer les coûts
        et/ou d’améliorer vos couvertures d’assurances pour le même prix.
      </p>

      <p style={paragraphStyle}>
        Écoutez notre{' '}
        <a href="https://www.youtube.com/watch?v=aF791DqVF1o" style={{ color: '#1a73e8' }}>
          Balado sur l’assurance collective
        </a>{' '}
        avec notre partenaire Éric Harvey de CABN qui en dévoile davantage sur le sujet.
      </p>

      <p style={paragraphStyle}>Merci de me signifier si un suivi sera requis à cet égard.</p>

      <p style={paragraphStyle}>
        Bonne journée !
        <br />
        Jean Philippe
      </p>

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

export default Template7;
