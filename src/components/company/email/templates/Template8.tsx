import React, { useState, useEffect } from 'react';
import EmailFooter from './EmailFooter';

interface Template8Props {
  recipientName: string;
  recipientGender: 'Male' | 'Female';
}

const Template8: React.FC<Template8Props> = ({ recipientName, recipientGender }) => {
  const paragraphStyle = { marginBottom: '1.5em' };

  const greeting =
    recipientGender === 'Male' ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

  // Base64 image reference
  const images = {
    donationTable: '/images/email/binary/template8/tableau2024_base64.txt',
  };

  // State for storing Base64-encoded image
  const [donationTableBase64, setDonationTableBase64] = useState<string>('');

  const readBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    return await response.text();
  };

  useEffect(() => {
    readBase64(images.donationTable).then(setDonationTableBase64);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6em', padding: '20px' }}>
      <p style={paragraphStyle}>{greeting}</p>

      <p style={paragraphStyle}>
        Pour un organisme de bienfaisance, l’automne correspond à un nombre accru de dons de titres de vos donateurs puisque ceux-ci
        pourront bénéficier des avantages fiscaux liés avant la fin de l’année financière. Grâce à{' '}
        <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/Outils-OBNL.html" style={{ color: '#1a73e8' }}>
          nos outils
        </a>
        , notre offre OBNL est particulièrement bien adaptée afin de maximiser les retombées financières de votre campagne de levée de
        fonds. Rappelons les avantages pour votre organisme et vos donateurs du don de titres :
      </p>

      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        {donationTableBase64 && (
          <img
            src={donationTableBase64}
            alt="Tableau des dons en titres - Année 2024"
            style={{
              width: '200px', // Explicit width in pixels
              height: 'auto', // Maintain aspect ratio
              borderRadius: '5px',
            }}
          />
        )}
      </div>

      <p style={paragraphStyle}>
        Pour davantage d’information consultez le document en pièce jointe ou communiquez avec nous. Pour en discuter, merci de
        consulter mon{' '}
        <a
          href="https://outlook.office365.com/book/GroupeFinancierBernardFinancireBanqueNationale@cbncnbccs.onmicrosoft.com/"
          style={{ color: '#1a73e8' }}
        >
          agenda en ligne
        </a>{' '}
        pour prévoir un rendez-vous sur TEAMS et réserver une plage horaire.
      </p>

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

export default Template8;
