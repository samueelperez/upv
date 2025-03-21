'use client';

import React, { useState } from 'react';
import { signInWithEmail } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Supabase usa email para autenticación, pero para mantener la interfaz UPV usamos "username"
      // Asumiendo que has configurado Supabase para usar email/password
      const { data, error } = await signInWithEmail(username, password);
      
      if (error) {
        console.error('Error de inicio de sesión:', error.message);
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      } else if (data.session) {
        console.log('Inicio de sesión exitoso:', data.user);
        // Redireccionar al dashboard o página principal
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      setError('Ha ocurrido un error. Por favor, inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '20px 0 5px' }}>INTRANET UPV</h1>
      <h2 style={{ fontSize: '16px', marginBottom: '30px', fontWeight: 'normal' }}>Introduce tu usuario y clave</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
        {/* Mensaje de error */}
        {error && (
          <div style={{ 
            backgroundColor: '#ffebee', 
            color: '#c62828', 
            padding: '10px', 
            marginBottom: '15px', 
            border: '1px solid #ef9a9a' 
          }}>
            {error}
          </div>
        )}
        
        {/* Usuario */}
        <div style={{ marginBottom: '10px' }}>
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7klEQVQ4jZ2TMWoCURCGvxUbIYWVlaXewJNYCLZewTPkCrmAR/AAOYJgZ2NlYSPYWVkJYiEEbPybXWV1fbtGHwwM/Dy+mZk3Izpc+wxMgS/gR+sZKNIeG8lHBX4B5S+wBJoIagQ80sKxdwTU9ugDFAn0HjgBK+BW6y0wUAW5gu8VfA0MnbB+BJ3FbQ0fK3gHZD5HiuAozhsH2Is7yb32NU6A6qoXJeKu3oGLOJ/EWf2nuAtg51K5lbfK/e+/4qzFcZc15SaA9gr2Mn4GDmrlP1p7YAlsvMcXUZBJ4acMP5TWHRx1nEW/tPIqfgGxMnbMvGiWjQAAAABJRU5ErkJggg==" 
            alt="Usuario" 
            style={{ display: 'inline-block', marginRight: '5px', verticalAlign: 'middle' }}
          />
          <input
            type="text"
            placeholder="Usuario o DNI"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '5px',
              border: '1px solid #ccc',
              marginTop: '5px'
            }}
            disabled={loading}
            required
          />
        </div>

        {/* Contraseña */}
        <div style={{ marginBottom: '10px' }}>
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8klEQVQ4jZ3TMUoDQRQG4G+NjYVgY2XlDbyBhWBrJ1h7A2uvkBt4AA/gESy0sLKwEWysrAQbC0ESm51lk2UzO5v8MPB4+f/3z5s3MyTccwTMgSfgS/YBzFKeNcm+E/AL2P4Bj0AvAvVCjnIudewO4EHnrqMcH8CbxmfAELiSb1jm+C4yPgFj4Bk4x7tIzZYar2OrBKAdaXzuRW4kR47Ama+xuX7kzCqG3GsclkmPGu9jAlQx5F1jpxKgI7tVTZykAFKl0a0muFEtOw+nAFUtyQjYxA7kEvZN4ZYOCdRcN28ZTkCLEriJM8kqwYveC6Aj+AUYAnXR1LgzIAAAAABJRU5ErkJggg==" 
            alt="Contraseña" 
            style={{ display: 'inline-block', marginRight: '5px', verticalAlign: 'middle' }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Clave"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                flexGrow: 1, 
                padding: '5px',
                border: '1px solid #ccc',
                marginTop: '5px'
              }}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ 
                backgroundColor: '#990000',
                width: '30px',
                height: '28px',
                marginLeft: '0',
                marginTop: '5px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none'
              }}
              disabled={loading}
            >
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3UlEQVQ4jZ3TMUoDURSF4W9MYWFhYWVlZekOsoVUdnaCYGNnbWEjWFtY2FhYCBZWVoKFIOQqb4aZZN68vPwwcLnv/ufAuTdpecYIWAIb4I/xBSxaPqsmx21CH+AdOExoE4HmwGNC/yROPMUVqC67iXPPcQU6PsUrMO2b4GvMOcqAl5inTglQjTkCdjHnWyWM4uAq59wlwCrmTHMLVOKkBqjF3fYqSJwbx9kmuQVqnCb46OvcUYFGzVQW22tUX+cyQxmDDTCo/QVcx5lFJgkPZAFMgNuKZirM6u7/Ab/P6HTYnAvCAAAAAElFTkSuQmCC" 
                alt="Mostrar"
                style={{ width: '16px', height: '16px' }}
              />
            </button>
          </div>
        </div>

        {/* Link para olvidar contraseña */}
        <div style={{ marginTop: '0', marginBottom: '15px' }}>
          <a href="#" style={{ color: '#990000', fontSize: '14px' }}>¿Has olvidado tu clave?</a>
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          style={{ 
            backgroundColor: '#990000', 
            color: 'white', 
            border: 'none', 
            padding: '5px 15px',
            display: 'inline-block',
            marginBottom: '20px',
            fontSize: '14px',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'wait' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />

        {/* Otros métodos de autenticación */}
        <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>Otros métodos de autenticación</h3>
        <button
          type="button"
          style={{ 
            backgroundColor: '#990000', 
            color: 'white', 
            border: 'none', 
            padding: '5px 15px',
            marginBottom: '20px',
            fontSize: '14px'
          }}
          disabled={loading}
        >
          Certificado digital
        </button>

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />

        {/* Ayuda */}
        <h4 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>¿Necesitas Ayuda?</h4>
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '15px', 
          marginTop: '10px',
          backgroundColor: '#fff',
          color: '#990000',
          fontSize: '14px'
        }}>
          <p>Por razones de seguridad, por favor cierra tu navegador web cuando hayas terminado de acceder a los servicios que requieren autenticación</p>
          <p style={{ marginTop: '15px' }}>
            Si tienes algún problema con la nueva autenticación, por favor
            <a href="#" style={{ color: '#990000', textDecoration: 'underline' }}> comunícalo </a>
            y, mientras tanto, puedes identificarte en la intranet usando la
            <a href="#" style={{ color: '#990000', textDecoration: 'underline' }}> autenticación antigua</a>.
          </p>
        </div>
      </form>
    </div>
  );
} 