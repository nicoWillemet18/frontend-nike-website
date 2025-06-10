import React from 'react';

interface LogoutConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ onConfirm, onCancel }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#111',
          padding: 16,
          borderRadius: 10,
          maxWidth: 280,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          fontWeight: 600,
          textAlign: 'center',
          fontSize: '1rem',
        }}
      >
        ¿Cerrar sesión?
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            gap: 12,
            width: '100%',
          }}
        >
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: '#007A33',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 0',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(0, 122, 51, 0.5)',
              flex: 1,
            }}
          >
            Sí
          </button>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: '#d33',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 0',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(211, 51, 51, 0.5)',
              flex: 1,
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
