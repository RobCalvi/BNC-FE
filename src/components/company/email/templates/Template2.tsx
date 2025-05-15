// Template2.tsx

import React, { useState, useEffect } from 'react';
import EmailFooter from './EmailFooter';

interface Template2Props {
  recipientName: string;
  recipientGender: 'Male' | 'Female';
  companyName: string;
  financials?: {
    checkingAccount?: number;
    longTermInvestments?: number;
  };
  exercise: string;
}

const Template2: React.FC<Template2Props> = ({
  recipientName,
  recipientGender,
  companyName,
  financials = {},
}) => {
  const paragraphStyle = { marginBottom: '1.5em' };

  const greeting =
    recipientGender === 'Male'
      ? `Bonjour M. ${recipientName},`
      : `Bonjour Mme. ${recipientName},`;

  const bannerPath = '/images/email/binary/template2/ap_template2_base64.txt';
  const [bannerBase64, setBannerBase64] = useState<string>('');

  const readBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    return await response.text();
  };

  useEffect(() => {
    readBase64(bannerPath).then(setBannerBase64);
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        lineHeight: '1.6em',
        padding: '20px',
      }}
    >
      {bannerBase64 && (
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <img
            src={bannerBase64}
            alt="Approche personnalisée"
            style={{ maxWidth: '70%', height: 'auto' }}
          />
        </div>
      )}

      <p style={paragraphStyle}>{greeting}</p>

      <p style={paragraphStyle}>
        Je me présente,{' '}
        <a
          href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/notre-equipe/jean-philippe-bernard.html"
          style={{ color: '#1a73e8', textDecoration: 'underline', fontWeight: 'bold' }}
        >
          Jean-Philippe Bernard
        </a>
        , Conseiller en gestion de patrimoine et Gestionnaire de portefeuille au sein de la Financière Banque Nationale – Gestion de patrimoine.
      </p>

      <p style={paragraphStyle}>
        Selon la plus récente déclaration <strong>T3010</strong> de votre entreprise, disponible sur le site de l’<strong>ARC</strong>, voici le statut de vos liquidités et placements :
      </p>

      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5em' }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Nom</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>
              Argent comptant, comptes bancaires et placements à court terme
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>
              Placements à long terme
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{companyName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {financials.checkingAccount
                ? financials.checkingAccount.toLocaleString()
                : 'N/A'}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {financials.longTermInvestments
                ? financials.longTermInvestments.toLocaleString()
                : 'N/A'}
            </td>
          </tr>
        </tbody>
      </table>

              <p style={paragraphStyle}>
      À cet égard, je vous invite à découvrir nos{' '}
      <a
        href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-produits.html"
        style={{ color: '#1a73e8', textDecoration: 'underline', fontWeight: 'bold' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        taux
      </a>, nos {' '}
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
        Le Groupe Financier Bernard est spécialisé dans la gestion des organismes comme le vôtre avec près de <strong>100 clients OBNL</strong>. Consultez quelques{' '}
        <a
          href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/obnl-fondations.html"
          style={{ color: '#1a73e8', textDecoration: 'underline', fontWeight: 'bold' }}
        >
          témoignages
        </a>
        . <strong>Pour en apprendre davantage sur notre accompagnement personnalisé des organismes, n’hésitez pas à communiquer avec nous dès aujourd’hui.</strong>
      </p>

            <p style={paragraphStyle}>
        <a
          href="https://outlook.office365.com/book/GroupeFinancierBernardFinancireBanqueNationale@cbncnbccs.onmicrosoft.com/"
          style={{ ...linkStyle, fontWeight: 'bold' }}
        >
          Planifiez une rencontre virtuelle
        </a>
      </p>

      <EmailFooter />
    </div>
  );
};

export default Template2;
