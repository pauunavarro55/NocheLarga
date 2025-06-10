import React, { useEffect, useState } from 'react';
import { objetos } from './Objetos';
import estilosJS from './estilos';
const Dormir = () => {
  const [mensajes, setMensajes] = useState([]);
  const [contador, setContador] = useState(0);

  const frases = [
  "Te sumerges en un vacío de calma...",
  "Escuchas ecos lejanos de una estrella perdida...",
  "Flotas entre recuerdos de planetas olvidados...",
  "Tu mente viaja más allá de las constelaciones...",
  "Algo brilla y desaparece en la oscuridad...",
  "Una sombra en espiral roza tu conciencia...",
  "Sientes el peso de un cometa atravesándote en silencio...",
  "Una estrella fugaz deja un pensamiento ardiente en tu mente...",
  "Todo se vuelve luz, luego nada, luego tú...",
  "Un agujero negro susurra una melodía que no puedes olvidar...",
  "Tu energía se diluye en un mar de gas estelar...",
  "Recuerdas un lugar que nunca has visitado...",
  "Una figura te entrega algo y desaparece sin dejar rastro...",
  "Los fragmentos de tu mente orbitan en torno a un sol que no arde...",
  "Caes sin gravedad a través de un túnel de recuerdos siderales..."
];


  const posiblesObjetos = [1, 2, 3, 5, 6]; // IDs de objetos de sueños

  const añadirMensaje = (nuevo) => {
    setMensajes(prev => [...prev, nuevo]);
  };

  const obtenerObjeto = () => {
    const id = posiblesObjetos[Math.floor(Math.random() * posiblesObjetos.length)];
    const obj = objetos.find(o => o.id === id);
    const datos = localStorage.getItem('inventario');
    const inventario = datos ? JSON.parse(datos) : [];
    inventario.push(id);
    localStorage.setItem('inventario', JSON.stringify(inventario));
    añadirMensaje(`🌌 Has encontrado en sueños: ${obj.nombre}`);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (contador >= frases.length) {
        clearInterval(intervalo);
        return;
      }
      añadirMensaje(frases[contador]);
      if (contador % 2 === 1) obtenerObjeto(); 
      setContador(c => c + 1);
    }, 25000);

    return () => clearInterval(intervalo);
  }, [contador]);

  return (
    <div style={estilosJS.contenedor}>
      <div style={{
        fontSize: '3rem',
        animation: 'flotar 1.5s ease-in-out infinite',
        marginBottom: '1rem'
      }}>
        🚀
      </div>

      <div style={{ maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#111', padding: '1rem', borderRadius: '10px' }}>
        {mensajes.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>

      <style>
        {`
          @keyframes flotar {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Dormir;
