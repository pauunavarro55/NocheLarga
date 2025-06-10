import React, {useEffect, useState} from 'react'
import { objetos } from './Objetos';

const EventosCielo = ({tipo, cerrarEvento}) => {
    const [objetoObtenido, setObjetoObtenido] = useState(null);
    const objetosPorTipo = {
        estrella: [1, 6, 2],             
        constelacion: [1, 6, 3, 7],      
        planeta: [2, 5, 4],              
        agujero_negro: [9, 8, 10]        
    };

    const obtenerIDObjeto = (tipo) => {
        const posibles = objetosPorTipo[tipo];
        if (!posibles) return null;
        return posibles[Math.floor(Math.random() * posibles.length)];
    };

    const masObjeto = (id) => {
        const datos = localStorage.getItem('inventario');
        const inventario = datos ? JSON.parse(datos) : [];
        inventario.push(id);
        localStorage.setItem('inventario', JSON.stringify(inventario));
    };

    useEffect(() => {
        const id = obtenerIDObjeto(tipo);
        if (id) {
            masObjeto(id);
            const objeto = objetos.find(o => o.id === id);
            setObjetoObtenido(objeto.nombre);
        }
    }, []);

    



  return (
    <div>
      <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#111',
      color: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      zIndex: 999,
      textAlign: 'center'
    }}>
      <h2>Evento cósmico</h2>
      <p>Has obtenido {objetoObtenido} y algo más!</p>
      <button onClick={cerrarEvento} style={{
        marginTop: '1rem',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Cerrar
      </button>
    </div>
    </div>
  )
}

export default EventosCielo
