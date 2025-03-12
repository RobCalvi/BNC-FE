import React, { useEffect, useState } from "react";
import EmailFooter from "./EmailFooter";

interface Template1Props {
  recipientName: string;
  recipientGender: "Male" | "Female";
  senderName: string;
}

const Template1: React.FC<Template1Props> = ({ recipientName, recipientGender, senderName }) => {
  const [policyToolBase64, setPolicyToolBase64] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch("/images/email/binary/template1/trousse_template1_base64.txt");
      setPolicyToolBase64(await response.text());
    };
    fetchImage();
  }, []);

  const greeting = recipientGender === "Male" ? `Bonjour M. ${recipientName},` : `Bonjour Mme. ${recipientName},`;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.6em", padding: "20px" }}>
      <p>{greeting}</p>

      <p>
        Dans le cadre de votre gestion des actifs et pour vos fins de gouvernance, voici l’outil que nous
        utilisons pour amorcer notre processus d’encadrement d’élaboration d’une politique de placement d’un OBNL.
      </p>

      <h2>Gestion des actifs</h2>

      <p>
        Notre <a href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/outils-obnl/politique-de-placement.pdf" style={{ color: "#1a73e8" }}>trousse d’élaboration sur les politiques de placement</a>
        pourra s’avérer un outil utile pour guider vos réflexions :
      </p>

      {policyToolBase64 && (
        <div style={{ textAlign: "left", margin: "20px 0" }}>
          <img src={policyToolBase64} alt="Trousse d'élaboration" style={{ maxWidth: "100%" }} />
        </div>
      )}

      <p>
        Le <a href="https://www.fbngp.ca/content/dam/fbngp/microsites/groupe-financier-bernard/performance-portefeuille-unifie/rendements-uma.pdf" style={{ color: "#1a73e8" }}>rendement de nos portefeuilles</a> est mis à jour mensuellement 
        ainsi que nos <a href="https://www.fbngp.ca/conseiller/groupe-financier-bernard/nos-produits.html" style={{ color: "#1a73e8" }}>taux CPG</a> (hebdomadairement). 
        Si une discussion plus élaborée sur notre accompagnement des OBNL est requise, merci de consulter mon 
        <a href="https://outlook.office365.com/book/GroupeFinancierBernardFinancireBanqueNationale@cbncnbccs.onmicrosoft.com/" style={{ color: "#1a73e8" }}> <b>agenda en ligne</b></a>.
      </p>

      <p>Bonne journée !<br />{senderName}</p>

      <EmailFooter />
    </div>
  );
};

export default Template1;
