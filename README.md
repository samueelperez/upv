# Clon de Login UPV con Supabase

Este proyecto es un clon del sistema de login de la Universidad Politécnica de Valencia, implementado con Next.js y Supabase para la autenticación.

## Configuración

### Prerequisitos

- Node.js 18.x o superior
- Una cuenta en [Supabase](https://supabase.com)

### Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/upv-login-clone.git
   cd upv-login-clone
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura tus variables de entorno:
   - Copia el archivo `.env.local.example` a `.env.local`
   - Reemplaza los valores con tus credenciales de Supabase:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

### Configuración de Supabase

1. Crea una cuenta en [Supabase](https://supabase.com).
2. Crea un nuevo proyecto.
3. En la sección "Authentication > Settings", habilita el proveedor de Email/Password.
4. Opcionalmente, puedes crear algunos usuarios para pruebas en la sección "Authentication > Users".

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Características

- Autenticación con email y contraseña mediante Supabase
- Interfaz similar a la de la UPV
- Página de dashboard protegida
- Gestión de sesiones

## Estructura del proyecto

- `app/` - Rutas y páginas de la aplicación (Next.js App Router)
- `components/` - Componentes React reutilizables
- `lib/` - Utilidades y configuraciones (como el cliente de Supabase)
- `public/` - Archivos estáticos (imágenes, etc.)

## Notas importantes

- Este proyecto es solo con fines educativos y no está afiliado oficialmente a la UPV.
- Para un entorno de producción, debes implementar medidas adicionales de seguridad. 