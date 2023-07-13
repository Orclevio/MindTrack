import React, { useEffect } from 'react';
import axios from 'axios';

function EnviarEmail () {
    const SENDGRID_API_KEY = "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";
  useEffect(() => {
    const sendEmail = async () => {
      try {
        const response = await axios.post(
          'https://api.sendgrid.com/v3/mail/send',
          {
            personalizations: [
              {
                to: [
                  {
                    email: 'orclevio@gmail.com',
                  },
                ],
              },
            ],
            from: {
              email: 'orclevioat@gmail.com',
            },
            subject: 'Consulta agendada com sucesso!',
            content: [
              {
                type: 'text/plain',
                value: 'Sua consulta com a psicóloga Lídia foi agendada com sucesso!',
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${SENDGRID_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Email sent:', response.data);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

    sendEmail();
  }, []);

  return (
    <div>
      <h1>Email Sender</h1>
      <p>Check the console for email sending status.</p>
    </div>
  );
};

export default EnviarEmail;
