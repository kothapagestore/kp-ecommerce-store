'use client';

import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import verifiedImg from '@/public/assets/images/verified.gif';
import verificationFailedImg from '@/public/assets/images/verification-failed.gif';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WEBSITE_HOME } from '@/routes/WebsiteRoute';
import { useSearchParams } from 'next/navigation';

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!token) {
      setStatus('failed');
      return;
    }

    const verify = async () => {
      try {
        const { data } = await axios.post('/api/auth/verify-email', { token });

        if (data.success) {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (err) {
        setStatus('failed');
      }
    };

    verify();
  }, [token]);

  return (
    <Card className="w-[400px]">
      <CardContent className="py-10">
        {status === 'loading' && (
          <h1 className="text-center text-lg font-semibold">
            Verifying your email...
          </h1>
        )}

        {status === 'success' && (
          <div>
            <div className="flex justify-center">
              <Image
                src={verifiedImg}
                className="h-[100px] w-auto"
                alt="Verification success"
              />
            </div>
            <h1 className="text-2xl font-bold text-green-500 my-5 text-center">
              Email verification success!
            </h1>
            <div className="text-center">
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div>
            <div className="flex justify-center">
              <Image
                src={verificationFailedImg}
                className="h-[100px] w-auto"
                alt="Verification Failed"
              />
            </div>
            <h1 className="text-2xl font-bold text-red-500 my-5 text-center">
              Email verification failed!
            </h1>
            <div className="text-center">
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
