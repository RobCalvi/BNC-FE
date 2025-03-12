import React, { useState, useEffect } from 'react';
import EmailFooter from './EmailFooter';

interface Template6Props {
  recipientName: string;
  recipientGender: 'Male' | 'Female';
}

const Template6: React.FC<Template6Props> = ({ recipientName, recipientGender }) => {
  const paragraphStyle = { marginBottom: '1.5em' };
  const headingStyle = { fontWeight: 'bold', marginBottom: '1em' };

  const greeting = recipientGender === 'Male' ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

  // Base64 image references
  const images = {
    donationGuide: '/images/email/binary/template6/titres_base64.txt',
    plannedGiving: '/images/email/binary/template6/dons_base64.txt',
    politiquePlacement: '/images/email/binary/template6/Trousse_base64.txt',
  };

  // State for storing Base64-encoded images
  const [donationGuideBase64, setDonationGuideBase64] = useState<string>('');
  const [plannedGivingBase64, setPlannedGivingBase64] = useState<string>('');
  const [politiquePlacementBase64, setPolitiquePlacementBase64] = useState<string>('');

  const readBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    return await response.text();
  };

  useEffect(() => {
    Promise.all([
      readBase64(images.donationGuide).then(setDonationGuideBase64),
      readBase64(images.plannedGiving).then(setPlannedGivingBase64),
      readBase64(images.politiquePlacement).then(setPolitiquePlacementBase64),
    ]);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6em', padding: '20px' }}>
      <p style={paragraphStyle}>{greeting}</p>

      <p style={paragraphStyle}>
        La dynamique d’affaire d’un OBNL gravite autour d’une stratégie philanthropique bien ficelée et une saine gouvernance des actifs.
        Vous trouverez ci-dessous des éléments de notre offre de services, spécifiquement conçus pour répondre aux besoins de gouvernance
        et de développement philanthropique de votre organisation.
      </p>

      <h2 style={headingStyle}>Philanthropie</h2>
      <p style={paragraphStyle}>
        Nous avons mis à jour récemment{' '}
        <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/Outils-OBNL.html" style={{ color: '#1a73e8' }}>
          nos outils
        </a>{' '}
        pour supporter les efforts philanthropiques de nos clients (Également disponible en{' '}
        <a href="https://www.nbfwm.ca/advisor/groupe-financier-bernard/our-services/our-tools-npos.html" style={{ color: '#1a73e8' }}>
          Anglais
        </a>
        ) :
      </p>

      <div style={{ textAlign: 'left', margin: '20px 0' }}>
        {donationGuideBase64 && (
          <a href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/outils-obnl/le-don-de-titres.pdf" style={{ display: 'block', marginBottom: '20px' }}>
            <img
              src={donationGuideBase64}
              alt="Le don de titres"
              style={{ maxWidth: '100%', borderRadius: '5px' }}
            />
          </a>
        )}
        {plannedGivingBase64 && (
          <a href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/outils-obnl/les-dons-planifies.pdf" style={{ display: 'block', marginBottom: '20px' }}>
            <img
              src={plannedGivingBase64}
              alt="Les dons planifiés"
              style={{ maxWidth: '100%', borderRadius: '5px' }}
            />
          </a>
        )}
      </div>

      <h2 style={headingStyle}>Gestion des actifs</h2>
      <p style={paragraphStyle}>
        Le{' '}
        <a href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/performance-portefeuille-unifie/rendements-uma.pdf" style={{ color: '#1a73e8' }}>
          rendement de nos portefeuilles
        </a>{' '}
        est mis à jour mensuellement. À cet égard, notre{' '}
        <a href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/outils-obnl/politique-de-placement.pdf" style={{ color: '#1a73e8' }}>
          trousse d’élaboration sur les politiques de placement
        </a>{' '}
        pourra s’avérer un outil utile pour guider vos réflexions :
      </p>

      <div style={{ textAlign: 'left', margin: '20px 0' }}>
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
        Si une discussion plus élaborée sur notre accompagnement pour les OBNL est requise, merci de consulter mon{' '}
        <a href="https://outlook.office365.com/book/GroupeFinancierBernard" style={{ color: '#1a73e8' }}>
          agenda en ligne
        </a>{' '}
        pour prévoir un rendez-vous sur TEAMS et réserver une plage horaire.
      </p>

      <p style={paragraphStyle}>Bonne journée !<br />Jean Philippe</p>

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

export default Template6;
