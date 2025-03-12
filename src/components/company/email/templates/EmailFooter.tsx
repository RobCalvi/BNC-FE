import React, { useState, useEffect } from "react";

const EmailFooter: React.FC = () => {
  const images = {
    banner: "/images/email/binary/footer/email_banner_footer_base64_3.txt",
    linkedinIcon: "/images/email/binary/footer/icon_linkedin_footer_base64.txt",
    youtubeIcon: "/images/email/binary/footer/icon_youtube_footer_base64.txt",
  };

  const readBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    return await response.text();
  };

  const [bannerBase64, setBannerBase64] = useState<string>("");
  const [linkedinBase64, setLinkedinBase64] = useState<string>("");
  const [youtubeBase64, setYoutubeBase64] = useState<string>("");

  useEffect(() => {
    Promise.all([
      readBase64(images.banner).then(setBannerBase64),
      readBase64(images.linkedinIcon).then(setLinkedinBase64),
      readBase64(images.youtubeIcon).then(setYoutubeBase64),
    ]);
  }, []);

  const employees = [
    {
      name: "Jean-Philippe Bernard, FCSI®, CIM®",
      title: "Conseiller en gestion du patrimoine & Gestionnaire de portefeuille",
      phone: "514 871-5081",
      web: "http://groupebernard.ca/",
      email: "jeanph.bernard@bnc.ca",
      linkedin: "https://www.linkedin.com/in/jgroupebernard/",
    },
    {
      name: "Olivier Babineau-Jacques, CIM®",
      title: "Analyste en placement",
      phone: "514 412-3122",
      web: "http://groupebernard.ca/",
      email: "Olivier.BabineauJacques@bnc.ca",
      linkedin: "https://www.linkedin.com/in/jgroupebernard/",
    },
    {
      name: "Francis Martin",
      title: "Associé en gestion de patrimoine",
      phone: "514 390-7948",
      web: "http://groupebernard.ca/",
      email: "francis.martin@bnc.ca",
      linkedin: "https://www.linkedin.com/in/jgroupebernard/",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", paddingTop: "20px", borderTop: "1px solid #ddd", fontSize: "14px" }}>
      {bannerBase64 && (
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <img src={bannerBase64} alt="Groupe Bernard Banner" style={{ display: "block", maxWidth: "40%", height: "auto" }} />
        </div>
      )}
      {employees.map((employee) => (
        <div key={employee.email} style={{ marginBottom: "15px" }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>{employee.name}</p>
          <p style={{ margin: 0 }}>{employee.title}</p>
          <p style={{ margin: 0 }}>Téléphone: <a href={`tel:${employee.phone}`} style={{ color: "#1a73e8" }}>{employee.phone}</a></p>
          <p style={{ margin: 0 }}>Web: <a href={employee.web} style={{ color: "#1a73e8" }}>{employee.web}</a></p>
          <p style={{ margin: 0 }}>Courriel: <a href={`mailto:${employee.email}`} style={{ color: "#1a73e8" }}>{employee.email}</a></p>
          <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
            <a href={employee.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={linkedinBase64} alt="LinkedIn" style={{ width: "20px", height: "20px" }} />
            </a>
            <a href="https://www.youtube.com/channel/UCELIM0rOkHlGqJ3uwdcwDxg/featured" target="_blank" rel="noopener noreferrer">
              <img src={youtubeBase64} alt="YouTube" style={{ width: "20px", height: "20px" }} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailFooter;
