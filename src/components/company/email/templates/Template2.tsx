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

  // We’ll keep the banner image references as is
  const bannerPath = '/images/email/binary/template2/ap_template2_base64.txt';

  // We only store banner base64 now (remove buttons)
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
      {/* Banner */}
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
          style={{ color: '#1a73e8' }}
        >
          Jean-Philippe Bernard
        </a>
        , Conseiller en gestion de patrimoine et Gestionnaire de portefeuille au
        sein de la Financière Banque Nationale – Gestion de patrimoine. Mon
        équipe et moi, effectuons une vigie de certains organismes de
        bienfaisance qui ne font pas partie de la clientèle de la Banque
        Nationale et de la Financière Banque Nationale.
      </p>

      <p style={paragraphStyle}>
        Selon la plus récente déclaration <strong>T3010</strong> de votre
        entreprise, disponible sur le site de l’<strong>ARC</strong>, voici le
        statut de vos liquidités et placements :
      </p>

      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5em' }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: '1px solid #ddd',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}
            >
              Nom
            </th>
            <th
              style={{
                border: '1px solid #ddd',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}
            >
              Argent comptant, comptes bancaires et placements à court terme
            </th>
            <th
              style={{
                border: '1px solid #ddd',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}
            >
              Placements à long terme
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {companyName}
            </td>
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
        À cet égard, je vous invite à tirer un comparatif avec les conditions
        actuelles de votre institution financière.
      </p>

      {/* 
        Buttons (Side by Side) 
        Using bulletproof HTML/CSS tables instead of images 
      */}
      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <table border={0} cellPadding={0} cellSpacing={0} style={{ display: 'inline-block' }}>
          <tbody>
            <tr>
              <td>
                <a
                  href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-produits/taux-cpg-et-placements-garantis.html"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <table
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                      backgroundColor: '#d6002e', // Red
                      borderRadius: '4px',
                      marginRight: '10px'
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            padding: '10px 20px',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '14px',
                            lineHeight: '16px',
                            color: '#ffffff',
                            fontWeight: 'normal',
                            textAlign: 'center',
                          }}
                        >
                          Consultez les taux
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </a>
              </td>

              <td>
                <a
                  href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/obnl-fondations.html"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <table
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                      backgroundColor: '#00336f', // Blue
                      borderRadius: '4px',
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            padding: '10px 20px',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '14px',
                            lineHeight: '16px',
                            color: '#ffffff',
                            fontWeight: 'normal',
                            textAlign: 'center',
                          }}
                        >
                          Découvrez nos services
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={paragraphStyle}>
        Le Groupe Financier Bernard est spécialisé dans la gestion des
        organismes comme le vôtre avec près de <strong>100 clients OBNL</strong>
        . Consultez quelques{' '}
        <a
          href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-services/obnl-fondations.html"
          style={{ color: '#1a73e8' }}
        >
          témoignages
        </a>
        <span>. </span>
        <strong>
          Pour en apprendre davantage sur notre accompagnement personnalisé des
          organismes, n’hésitez pas à communiquer avec nous dès aujourd’hui.
        </strong>
      </p>

      {/* 
        Final Call-to-Action (another bulletproof button)
      */}
      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <a
          href="https://outlook.office365.com/book/GroupeFinancierBernardFinancireBanqueNationale@cbncnbccs.onmicrosoft.com/"
          style={{ textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            style={{
              backgroundColor: '#d6002e', // Red
              borderRadius: '4px',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '10px 20px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#ffffff',
                    fontWeight: 'normal',
                    textAlign: 'center',
                  }}
                >
                  Planifiez une rencontre virtuelle
                </td>
              </tr>
            </tbody>
          </table>
        </a>
      </div>

      <EmailFooter />
    </div>
  );
};

export default Template2;
