import React from 'react';
import EmailFooter from './EmailFooter';

interface Template4Props {
    recipientName: string;
    recipientGender: 'Male' | 'Female';
}

const Template4: React.FC<Template4Props> = ({ recipientName, recipientGender }) => {
    const paragraphStyle = { marginBottom: '1.5em' };

    const greeting = recipientGender === 'Male' ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6em', padding: '20px' }}>
            <p style={paragraphStyle}>{greeting}</p>

            <p style={paragraphStyle}>
                À titre informatif, voici une mise à jour des <strong>taux bruts</strong> sur les différents instruments de placement à court, moyen et long terme :
            </p>

            <div style={{ textAlign: 'left', margin: '20px 0' }}>
                <img
                    src="https://example.com/taux-updates.jpg"
                    alt="Mise à jour des taux"
                    style={{ maxWidth: '100%', borderRadius: '5px', marginBottom: '20px' }}
                />
            </div>

            <p style={{ fontSize: '0.9em', fontStyle: 'italic', marginBottom: '1.5em' }}>
                *Taux sujets à changement sans préavis selon conditions de marché
            </p>

            <p style={paragraphStyle}>
                Nos <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-produits/taux-cpg-et-placements-garantis.html" style={{ color: '#1a73e8' }}>taux CPG pour 500k$ et +</a> sont mis à jour hebdomadairement sur notre site web et je vous invite à les consulter afin d’établir des bases comparatives. Des honoraires sont à prévoir pour la gestion des comptes selon une tarification de <strong>0,25%</strong> pour les comptes épargnes à intérêts élevés et de <strong>0,30%</strong> pour les certificats de dépôt (CPG) et grille variable pour les CPG prorogeables.
            </p>

            <p style={paragraphStyle}>
                Au plaisir d’en discuter avec vous et pour élaborer davantage, merci de consulter mon <a href="https://outlook.office365.com/book/GroupeFinancierBernardFinancireBanqueNationale@cbncnbccs.onmicrosoft.com/" style={{ color: '#1a73e8' }}>agenda en ligne</a> pour prévoir un rendez-vous sur TEAMS et réserver une plage horaire.
            </p>

            <p style={paragraphStyle}>Bonne journée !</p>

            <p style={paragraphStyle}>Jean Philippe</p>

            <p style={paragraphStyle}>
                Voir mes disponibilités en temps réel et planifier une rencontre :
                <br />
                <a href="https://outlook.office365.com/book/GroupeFinancierBernard" style={{ color: '#1a73e8' }}>https://outlook.office365.com/book/GroupeFinancierBernard</a>
            </p>

            <EmailFooter />
        </div>
    );
};

export default Template4;
