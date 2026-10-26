/* ═══════════════════════════════════════════════════════════════════════
   config.js — Alcance visible del sitio
   Dashboard Meteorológico RDCFT — Arauco
   ═══════════════════════════════════════════════════════════════════════ */

/* SOLO_AVISO — interruptor único del alcance del sitio.

   true  → el sitio queda reducido al envío de Aviso RDCFT. El portal, el
           dashboard meteorológico (paisajes, simulador de humo, consultas)
           y las alertas comunales no se muestran. La administración sigue
           disponible para admins.

   false → portal completo (comportamiento original, nada oculto).

   OJO: este interruptor solo gobierna lo que hace el navegador. El bloqueo
   de verdad está en vercel.json, que redirige las rutas de esos apartados
   (/, /index.html, /pages/dashboard.html, /pages/alertas.html y sus atajos)
   a la pantalla de ingreso, de modo que su HTML nunca se entrega y no se
   alcanzan ni forzando la URL. Son redirecciones 307 (temporales) a
   propósito, para que ningún navegador las memorice.

   Para restaurar el portal completo hay que hacer las dos cosas:
     1. poner este valor en false, y
     2. quitar de vercel.json las seis redirecciones de bloqueo. */
window.SOLO_AVISO = true;

// Puerta de entrada (pantalla de ingreso) y destino del envío de avisos
window.RUTA_ACCESO = '/pages/acceso.html';
window.RUTA_AVISO  = '/pages/aviso-rdcft.html';
window.RUTA_ADMIN  = '/pages/admin.html';

// Correos con acceso al aviso además de los admins y del cargo Central Protección
window.AVISO_EXTRA_EMAILS = ['mauricio.almendra@arauco.com'];

// Regla única de quién puede emitir avisos RDCFT
window.tieneAccesoAviso = function (usuario) {
  if (!usuario || !usuario.email) return false;
  if (usuario.rol === 'admin') return true;
  const cargo = String(usuario.cargo || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  if (cargo === 'central proteccion') return true;
  return window.AVISO_EXTRA_EMAILS.includes(String(usuario.email).trim().toLowerCase());
};

/* Redirige a la puerta de entrada cuando el apartado está oculto.
   Se invoca desde el <head> de las páginas ocultas para que no alcancen
   a pintarse. */
window.redirigirSiOculto = function () {
  if (window.SOLO_AVISO) window.location.replace(window.RUTA_ACCESO);
};
