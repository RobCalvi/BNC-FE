import React, { useState, useEffect } from 'react';
import EmailFooter from './EmailFooter';

interface Template9Props {
  recipientName: string;
  recipientGender: 'Male' | 'Female';
}

const Template9: React.FC<Template9Props> = ({ recipientName, recipientGender }) => {
  const paragraphStyle = { marginBottom: '1.5em' };
  const linkStyle = { color: '#1a73e8' };
  const headingStyle = { fontWeight: 'bold', marginBottom: '1em' };

  const greeting =
    recipientGender === 'Male' ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

  const [bannerBase64, setBannerBase64] = useState<string>('');

  const readBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    return await response.text();
  };

  useEffect(() => {
    readBase64('/images/email/binary/template9/taux_banner.txt').then(setBannerBase64);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6em', padding: '20px' }}>
      {bannerBase64 && (
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <img
            src={bannerBase64}
            alt="Une approche personnalisée pour votre organisme"
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}

      <p style={paragraphStyle}>{greeting}</p>

      <p style={paragraphStyle}>
        En tant qu'OBNL, chaque dollar compte dans l'accomplissement de votre mission.
      </p>

      <p style={paragraphStyle}>
        Nous savons que la gestion optimale de vos liquidités et placements représente un défi constant. Notre expertise spécialisée
        auprès des organismes comme le vôtre vous permet d'accéder à des solutions concrètes pour maximiser vos ressources financières.
      </p>

      <p style={headingStyle}>Trois opportunités immédiates pour votre organisme :</p>

      <ol style={paragraphStyle}>
        <li>
          Politique de placement absente ou désuète ? → Notre{' '}
          <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/Outils-OBNL.html" style={linkStyle}>
            processus clé en main
          </a>{' '}
          sécurise vos actifs tout en respectant votre mission
        </li>
        <li>
          Besoin d'améliorer vos revenus d’intérêts ? → Accès à 35 émetteurs CPG, analyse comparative des taux et accès en temps réel
          aux données financières et projections du taux directeur
        </li>
        <li>
          Régime d'employés coûteux ? → Obtenez gratuitement un 2e avis d'expert sur votre programme actuel
        </li>
      </ol>

        <p style={paragraphStyle}>
      Découvrez nos{' '}
      <a
        href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-produits.html"
        style={{ color: '#1a73e8', textDecoration: 'underline', fontWeight: 'bold' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        taux
      </a>{' '}
      et{' '}
      <a
        href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services.html"
        style={{ color: '#1a73e8', textDecoration: 'underline', fontWeight: 'bold' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        services
      </a>{' '}
      et comparez les avec ceux offert par votre institution financière.
    </p>

      <p style={paragraphStyle}>
        Consultez quelques{' '}
        <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/obnl-fondations.html" style={linkStyle}>
          témoignages
        </a>{' '}
        et prenez quelques minutes sur TEAMS avec nous pour découvrir pourquoi près de 100 OBNL nous font confiance.
      </p>

      <p style={paragraphStyle}>
        <a
          href="https://outlook.office365.com/book/GroupeFinancierBernardFinancireBanqueNationale@cbncnbccs.onmicrosoft.com/"
          style={{ ...linkStyle, fontWeight: 'bold' }}
        >
          Planifiez une rencontre virtuelle
        </a>
      </p>

      <p style={paragraphStyle}>Bonne journée !<br />Jean Philippe</p>

      <EmailFooter />
    </div>
  );
};

export default Template9;
