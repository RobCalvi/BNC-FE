import React from 'react';

interface EmailButtonProps {
  href: string; // The URL the button should link to
  text: string; // The text displayed on the button
  backgroundColor?: string; // Optional background color
  color?: string; // Optional text color
}

const EmailButton: React.FC<EmailButtonProps> = ({
  href,
  text,
  backgroundColor = '#e4002b',
  color = '#ffffff',
}) => {
  return (
    <table
      border={0}
      cellPadding={0}
      cellSpacing={0}
      style={{ display: 'inline-block', marginRight: '10px' }} // Ensures buttons are inline
    >
      <tr>
        <td align="center" style={{ borderRadius: '5px', overflow: 'hidden' }}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              color: color,
              backgroundColor: backgroundColor,
              textDecoration: 'none',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              textAlign: 'center',
              borderRadius: '5px',
            }}
          >
            {text}
          </a>
        </td>
      </tr>
    </table>
  );
};

export default EmailButton;
