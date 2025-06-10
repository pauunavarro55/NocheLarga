import React, { useState, useEffect } from 'react'
import { objetos } from './Objetos';

const Inventario = () => {
  const [mostrarPanel, setMostrarPanel] = useState(false);

  const contarObjetos = (lista) => {
  const conteo = {};
    for (let id of lista) {
      conteo[id] = (conteo[id] || 0) + 1;
    }
    return conteo;
  };

  


  const [inventario, setInventario] = useState(() => {
    const guardado = localStorage.getItem('inventario');
    return guardado ? JSON.parse(guardado) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('inventario', JSON.stringify(inventario));
  }, [inventario]);

  const inventarioProcesado = contarObjetos(inventario);



  return (
    <div style={{ color: '#fff' }}>
      <button style={estilosInventario.boton} onClick={() => setMostrarPanel(!mostrarPanel)}>
        Inventario
      </button>
      {mostrarPanel && (
        <div style={{
          position: 'fixed',
          top: '60px', 
          right: '20px',
          width: '280px',
          backgroundColor: '#111',
          color: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.6)',
          zIndex: 999,
          maxHeight: '70vh',
          overflowY: 'auto' 
        }}>
          <h3>🎒 Inventario</h3>
          <ul>
            {Object.entries(inventarioProcesado).map(([id, cantidad]) => {
              const objeto = objetos.find(o => o.id === parseInt(id));
              return (
                <li key={id}>
                  <strong>{objeto?.nombre}</strong> x{cantidad}
                  <p style={{ fontSize: '0.8rem' }}>{objeto?.descripcion}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  )
}


const estilosInventario = {
  boton: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '0.5rem 1rem',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 1000
    }
}

export default Inventario
