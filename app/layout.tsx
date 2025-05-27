import '@/app/globals.css';
import { Metadata } from 'next';
import SessionProviderWrapper from '@/app/SessionProvider';
// import { roboto } from './ui/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | Pesticide Surveys | NJDEP',
    default: 'Pesticide Surveys | NJDEP'},
  description: 'NJDEP Water Monitoring Pesticide Surveys',
  metadataBase: new URL('https://njdep.rutgers.edu/pesticide-surveys'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
