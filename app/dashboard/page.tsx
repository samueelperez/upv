'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '../../lib/supabase';
import Image from 'next/image';
import './page.css';
// Cambiamos la forma de importar las librerías para PDF
import { useCallback } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showIntranet, setShowIntranet] = useState(false);
  const [showCalificaciones, setShowCalificaciones] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const calificacionesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { user, error } = await getCurrentUser();
      
      if (error || !user) {
        console.error('Error al obtener usuario o usuario no autenticado');
        router.push('/');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    } else {
      router.push('/');
    }
  };

  const handleIntranetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowIntranet(true);
    setShowCalificaciones(false);
  };

  const handleBackToDashboard = () => {
    setShowIntranet(false);
    setShowCalificaciones(false);
  };

  const handleCalificacionesClick = () => {
    setShowCalificaciones(true);
  };

  const handleBackToIntranet = () => {
    setShowCalificaciones(false);
  };

  // Función para exportar la tabla de calificaciones a PDF
  const exportToPDF = useCallback(async () => {
    if (!calificacionesRef.current) return;
    
    try {
      setGeneratingPDF(true);
      
      // Importamos las librerías dinámicamente solo cuando se necesiten
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      
      // Creamos una copia del contenedor para mantener los estilos al exportar
      const container = calificacionesRef.current;
      
      // Usamos html2canvas para convertir el elemento HTML a una imagen
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      // Obtenemos las dimensiones del elemento
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Ancho de página A4 en mm
      const pageHeight = 297; // Alto de página A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Creamos un nuevo documento PDF en formato A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Añadimos la imagen al PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Si la imagen es más alta que una página, añadimos más páginas
      let heightLeft = imgHeight;
      let position = 0;
      
      while (heightLeft > pageHeight) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Guardamos el PDF
      pdf.save('calificaciones-upv.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.');
    } finally {
      setGeneratingPDF(false);
    }
  }, [calificacionesRef]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-message">Cargando...</div>
        </div>
      </div>
    );
  }

  // Obtener fecha actual formateada como en la imagen
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Image 
            src="/images/logo-upv-negro.svg" 
            alt="UPV" 
            width={180} 
            height={45} 
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </header>

      <div className="content-wrapper">
        {/* Bienvenido y cerrar sesión */}
        <div className="user-welcome">
          <h2 className="welcome-text">
            Bienvenido, {user.email}
          </h2>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Contenido principal */}
        <main className="main-content">
          {showCalificaciones ? (
            <>
              <div className="calificaciones-header">
                <button 
                  onClick={exportToPDF} 
                  className="export-button"
                  disabled={generatingPDF}
                >
                  {generatingPDF ? 'Generando PDF...' : 'Exportar a PDF'}
                </button>
                <button onClick={handleBackToIntranet} className="back-button">
                  Volver a la Secretaría Virtual
                </button>
              </div>
              
              <div className="calificaciones-container" ref={calificacionesRef}>
                <div className="curso-academico">
                  <h2>Curso académico 2024/2025</h2>
                  <div className="curso-line"></div>
                </div>
                
                <div className="grado-info">
                  <h3>Grado en Ingeniería Informática (157) - Samuel Perez Torres</h3>
                  <div className="grado-line"></div>
                </div>
                
                <div className="calificaciones-table-container">
                  <table className="calificaciones-table">
                    <thead>
                      <tr>
                        <th className="asignatura-column">Asignaturas y Actividades</th>
                        <th className="calificacion-column">Calificación final</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Estadística</td>
                        <td className="nota">5</td>
                      </tr>
                      <tr>
                        <td>Fundamentos de computadores</td>
                        <td className="nota">6</td>
                      </tr>
                      <tr>
                        <td>Programación</td>
                        <td className="nota">5</td>
                      </tr>
                      <tr>
                        <td>Tecnología de computadores</td>
                        <td className="nota">5</td>
                      </tr>
                  
                      <tr>
                        <td>Álgebra</td>
                        <td className="nota">5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : showIntranet ? (
            <>
              <div className="intranet-header">
                <h1 className="dashboard-title">
                  Secretaría Virtual
                </h1>
                <button onClick={handleBackToDashboard} className="back-button">
                  Volver al Dashboard
                </button>
              </div>
              
              <div className="intranet-sections">
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">📋</span> Automatrícula (Datos personales / Matrícula)
                  </h3>
                  <div className="intranet-subsection-list">
                    {/* Subsecciones están inicialmente cerradas */}
                  </div>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">ℹ️</span> Información
                  </h3>
                  <div className="intranet-subsection-list">
                    <div className="intranet-subsection" onClick={handleCalificacionesClick}>
                      <span className="subsection-arrow">›</span> Calificaciones
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Carnet UPV
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Relación con la UPV
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Cita previa automatrícula
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Situación becas
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Nº de Cuenta Bancaria
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Nº Seguridad Social
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Recibos
                    </div>
                  </div>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">📝</span> Solicitudes
                  </h3>
                  <div className="intranet-subsection-list">
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Certificados y justificantes
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Solicitud SET
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Solicitud de Título
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Preinscripción Máster
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Preinscripción 2º Ciclo
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Preinscripción Doctorado
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Solicitudes de Reconocimiento
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Solicitud de Transferencia de Estudios
                    </div>
                  </div>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">📊</span> Encuestas
                  </h3>
                  <div className="intranet-subsection-list">
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> Herramienta Encuestas On-line
                    </div>
                  </div>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">📨</span> Solicitudes, notificaciones, peticiones...
                  </h3>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">❓</span> poli[Consulta]
                  </h3>
                  <div className="intranet-subsection-list">
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> A mi centro
                    </div>
                    <div className="intranet-subsection">
                      <span className="subsection-arrow">›</span> A otras unidades
                    </div>
                  </div>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">📅</span> poli[Cita]
                  </h3>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">💬</span> Sugerencias, quejas y felicitaciones
                  </h3>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">📜</span> Partes MISTRAL
                  </h3>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">🎓</span> Portal de Formación Continua y Permanente
                  </h3>
                </div>
                
                <div className="intranet-section">
                  <h3 className="intranet-section-title">
                    <span className="intranet-icon">🏢</span> Reserva de salas, aulas y espacios (Monnegre)
                  </h3>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="dashboard-title">
                Dashboard UPV
              </h1>

              <div className="sections-grid">
                {/* Novedades */}
                <section className="section">
                  <h2 className="section-title">
                    Novedades
                  </h2>
                  <p className="section-content">
                    No hay novedades recientes
                  </p>
                </section>

                {/* Accesos rápidos */}
                <section className="section">
                  <h2 className="section-title">
                    Accesos rápidos
                  </h2>
                  <div className="quick-access-grid">
                    <a href="#" className="quick-access-button" onClick={handleIntranetClick}>
                      <svg width="16" height="16" fill="#990000" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                      </svg>
                      <span>Intranet personal</span>
                    </a>
                    <a href="#" className="quick-access-button">
                      <svg width="16" height="16" fill="#990000" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                      </svg>
                      <span>Correo electrónico</span>
                    </a>
                    <a href="#" className="quick-access-button">
                      <svg width="16" height="16" fill="#990000" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                      </svg>
                      <span>PoliformaT</span>
                    </a>
                    <a href="#" className="quick-access-button">
                      <svg width="16" height="16" fill="#990000" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                      </svg>
                      <span>Servicios UPV</span>
                    </a>
                  </div>
                </section>

                {/* Información de usuario */}
                <section className="section">
                  <h2 className="section-title">
                    Información de usuario
                  </h2>
                  <div className="section-content">
                    <p className="user-info-item">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="user-info-item">
                      <strong>ID:</strong> {user.id.substring(0, 8)}...
                    </p>
                    <p className="user-info-item">
                      <strong>Último acceso:</strong> {formattedDate}
                    </p>
                  </div>
                </section>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
} 