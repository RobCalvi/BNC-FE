import React from 'react';
import EmailFooter from './EmailFooter';

interface Template5Props {
    recipientName: string;
    recipientGender: 'Male' | 'Female';
    companyName: string;
    exercisePeriod: string;
    otherLiabilities?: number; // Make it optional
}

const Template5: React.FC<Template5Props> = ({ recipientName, recipientGender, companyName, exercisePeriod, otherLiabilities = 0 }) => {
    const paragraphStyle = { marginBottom: '1.5em' };
    const listStyle = { marginBottom: '1.5em', paddingLeft: '1.5em' };

    const greeting = recipientGender === 'Male' ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6em', padding: '20px' }}>
            <p style={paragraphStyle}>{greeting}</p>

            <p style={paragraphStyle}>
                Je me permets de vous contacter afin d’évaluer comment la Banque Nationale et sa filiale FBN serait en mesure de vous proposer une offre de financement pour votre organisme à but non lucratif (OBNL). 
                Nous avons consulté vos états financiers sur le <a href="https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=fr" style={{ color: '#1a73e8' }}>site de l’ARC</a> et déterminé qu’un financement est en cours pour votre établissement :
            </p>

            <div style={{ marginBottom: '1.5em' }}>
                <div style={{ marginBottom: '10px' }}><strong>Nom :</strong> {companyName}</div>
                <div style={{ marginBottom: '10px' }}><strong>Exercice :</strong> {exercisePeriod}</div>
                <div style={{ marginBottom: '10px' }}><strong>Autres éléments du passif :</strong> {otherLiabilities.toLocaleString()} $</div>
            </div>

            <p style={paragraphStyle}>
                De plus, selon les informations à notre disposition, votre OBNL ne serait pas avec la Banque Nationale. Apprenez en plus sur <a href="https://www.bnc.ca/entreprises/solutions-bancaires/secteurs/obnl-associations.html" style={{ color: '#1a73e8' }}>l’offre de financement pour OBNL</a> de la Banque Nationale.
            </p>

            <p style={paragraphStyle}>Nous recherchons notamment les situations suivantes chez les OBNL et qui pourraient vous concerner :</p>
            <ul style={listStyle}>
                <li><strong>Échéance de prêt :</strong> votre prêt arrive à échéance bientôt ? Profitez-en pour obtenir une soumission de notre institution.</li>
                <li><strong>Refinancement :</strong> vous rénovez, agrandissez ou cherchez à revoir vos modalités de financement ? Nous pouvons vous aider.</li>
                <li><strong>Nouveau financement :</strong> vous avez un projet en tête ? Notre équipe de directeurs commerciaux pourra vous prêter main forte.</li>
            </ul>

            <p style={paragraphStyle}>
                Sans aucun engagement de votre part, nous offrons la possibilité d’obtenir une <strong>seconde opinion</strong> sur la structure de votre financement actuel et de <strong>négocier un meilleur taux/offre</strong>. 
                Entouré d’une équipe de directeurs commerciaux répartis dans les différentes régions du Québec, je serai en mesure de vous introduire à la meilleure personne pour vous accompagner.
            </p>

            <p style={paragraphStyle}>
                Je serai ravi de fixer un moment pour discuter plus en détail des besoins spécifiques de votre OBNL et d’explorer comment nous pourrions vous accompagner. Pour en discuter, merci de consulter mon 
                <a href="https://outlook.office365.com/book/GroupeFinancierBernardFinancireBanqueNationale@cbncnbccs.onmicrosoft.com/" style={{ color: '#1a73e8' }}> agenda en ligne </a> pour prévoir un rendez-vous sur TEAMS et réserver une plage horaire.
            </p>

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

export default Template5;
