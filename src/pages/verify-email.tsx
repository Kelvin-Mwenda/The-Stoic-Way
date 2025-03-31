// pages/verify-email.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import from react-router-dom
import { supabase } from '@/integrations/supabase/client';

export default function VerifyEmailPage() {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [searchParams] = useSearchParams(); // Use useSearchParams to access query parameters
  const otp = searchParams.get('otp'); // Extract the OTP from the query string

  useEffect(() => {
    const verifyEmail = async () => {
      if (otp) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token: otp,
            email: '', // Provide the user's email here (optional if not required)
            type: 'email', // Specify the verification type
          });

          if (error) {
            console.error('Error verifying email:', error);
            alert('Failed to verify email. Please try again.');
          } else {
            alert('Email verified successfully!');
            navigate('/'); // Redirect to a secure page
          }
        } catch (error) {
          console.error('Error during OTP verification:', error);
        }
      }
    };

    verifyEmail();
  }, [otp, navigate]);

  return (
    <div>
      <h1>Verifying Email</h1>
      <p>Please wait while we verify your email...</p>
    </div>
  );
}