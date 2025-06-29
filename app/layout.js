import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { ClinicProvider } from '@/hooks/useClinic';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aria Voice - AI Receptionist for Dental Clinics',
  description: 'Never miss a patient call again. Aria answers in < 100ms, triages problems and books directly into your calendar.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClinicProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toast />
        </ClinicProvider>
      </body>
    </html>
  );
}