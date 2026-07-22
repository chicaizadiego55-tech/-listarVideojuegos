import React, { useEffect } from 'react';
import './AlertaNotificacion.css';

const AlertaNotificacion = ({ mensaje, onClose }) => {
  useEffect(() => {
    // Temporizador para desvanecer y cerrar la alerta tras 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notificacion">
      <div className="toast-icono">✅</div>
      <div className="toast-contenido">
        <p>{mensaje}</p>
      </div>
      <button className="toast-cerrar" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default AlertaNotificacion;