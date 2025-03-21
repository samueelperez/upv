import React from 'react';
import LoginForm from '../components/login-form';
import Footer from '../components/footer';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header con logo */}
      <header style={{ 
        borderBottom: '1px solid #ccc', 
        padding: '15px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <Image 
              src="/images/logo-upv-negro.svg" 
              alt="UNIVERSITAT POLITÈCNICA DE VALÈNCIA" 
              width={164}
              height={35}
            />
          </div>
        </div>
      </header>

      {/* Contenido principal con flex-grow para empujar el footer abajo */}
      <div className="flex-grow bg-[#f2f2f2] py-5">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <LoginForm />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 