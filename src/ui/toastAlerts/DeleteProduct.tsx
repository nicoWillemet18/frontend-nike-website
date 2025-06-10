// src/components/DeleteProduct.tsx

import React from 'react';

interface DeleteProductProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ onConfirm, onCancel }) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          color: 'white',
          fontWeight: '600',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        ¿Eliminar producto?
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            width: '100%',
            maxWidth: 220,
          }}
        >
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: '#007A33',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
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
              padding: '8px 16px',
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

export default DeleteProduct;
