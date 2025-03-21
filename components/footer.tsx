import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#990000', 
      color: 'white', 
      padding: '15px', 
      fontSize: '14px',
      textAlign: 'center',
      marginTop: 'auto',
      width: '100%'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '10px' }}>
          <Image 
            src="/images/upv-logo-blanco.png" 
            alt="Universitat Politècnica de València" 
            width={120}
            height={30}
            style={{ margin: '0 auto', display: 'block' }}
          />
        </div>
        <p style={{ marginBottom: '7px' }}>
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVQokY3RwQ2DIBAF0DcmHrj0UiVegJN34cLVHtiB9uHZA+3AIbMJJoLLn2Tykz8/M5Q5a6xwwBEnHLFi1PqpJbGv1nT/CdxrEvcXYL5bYJZmVOu9L8CA5AJm5w2LNZ+xOFnXpTi5r+GHSl6Du5M5h0vL894EJrQ7fUETx2aP7wL3VzSkXxQCqgAAAABJRU5ErkJggg==" 
            alt="Ubicación" 
            style={{ display: 'inline-block', marginRight: '5px', verticalAlign: 'middle' }}
          />
          Camino de Vera, s/n 46022 Valencia
        </p>
        <p style={{ marginBottom: '7px' }}>
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3ElEQVQokYXQPUtDQRAF0HN9ggQbEYmIjZWFhYWVhYWFpY2Njf6D/AULCwsLCwsRERERERERsVCxEBEJQtj7PnazMCwJTjWcuczM5jKUOQP0cYcTvOIat5pBG3Ooo4EtvOEDJ6i04mhjAXtYw7GCPfy44QvY1jvmsO/KT2jiFa8Y/EvexS1mXfmZbZRiF684w7CDwGpRfuKKZ0SxqSu+sVM0P2MBQwzKY6lU8iMO/+h+izcM4g4THGEfk6Jwwrr0JQrVcYZRQVLz0FznDQ28o1sYPKGHSbHxgrqk/QVK1TDlQ53WPAAAAABJRU5ErkJggg==" 
            alt="Teléfono" 
            style={{ display: 'inline-block', marginRight: '5px', verticalAlign: 'middle' }}
          />
          Tel: +34 96 387 70 00
        </p>
        <p style={{ marginBottom: '0' }}>
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVQokZXQMW7CUBBF0TPJBt6BPSBsKZsoooASKuhTpUxJlZouBV26dClTUqWiokwfUVGwH8W8yA4uKK40xdX9M/PPzPAXX7g35JHVkLXOV3k9xS+GTY3PWMUs8JiG/wLH+I7m3RImaSq6iP6g88h5F5C1cIkjvOAzCFfx/Fz+wCCq+TQtQj1A3qDeI9sI94hWB9+CcIxpEtcY7ZA9bANyGXwAG18uwWKbMZEAAAAASUVORK5CYII=" 
            alt="Contacto" 
            style={{ display: 'inline-block', marginRight: '5px', verticalAlign: 'middle' }}
          />
          Contacto
        </p>
      </div>
    </footer>
  );
} 