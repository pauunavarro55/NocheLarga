import { useState } from 'react';
import CieloNocturno from './Componentes/CieloNocturno';
import Dormir from './Componentes/Dormir';
import Inventario from './Componentes/Inventario';

function App() {
  const [modo, elegirModo] = useState(null); 
  let contenido;
  
  //Si no hay ningún modo elegido, que haga Display del menú principal
  
  
  if (!modo){
    contenido = (
      <div style={estilos.contenedor}>
        <h1>Entre sueños y estrellas...🌌</h1>
        <h2>...encuentras un mar de descanso.</h2>
        <h3>Esta noche será una larga noche.</h3>

        <button style={estilos.boton} onClick={() => elegirModo('cielo')}>
          🌠 Explorar el cielo nocturno
        </button>
        <button style={estilos.boton} onClick={() => elegirModo('dormir')}>
          💤 Dormir y soñar
        </button>

      </div>
      )

  } else if(modo === 'cielo'){ 
    
    contenido = (
      <>
        <button style={estilos.botoncielo} onClick={() => elegirModo(null)}>
          🔙 Volver
        </button> 
        <CieloNocturno atras={() => elegirModo(null)}/>
      </>
    );
  } else if(modo === 'dormir'){ 
    
    contenido = (
      <>
        <button style={estilos.botoncielo} onClick={() => elegirModo(null)}>
          🔙 Volver
        </button> 
        <Dormir />
      </>
    );
  }

  return (
    <div>
      {contenido}
      <BotonMusic />
      <Inventario />
      
    </div>
  );
  
  


  

}


//Botón para panel de música
function BotonMusic() {
  const [mostrarPanel, setMostrarPanel] = useState(false);

  return (
    <div style={estilos.contenedorMusica}>
      <button style={estilos.botonMusica} onClick={() => setMostrarPanel(!mostrarPanel)}>
        🎵 Música
      </button>

      {mostrarPanel && (
        <div style={estilos.panelMusica}>
          <iframe 
            width="100%" 
            height="300" 
            scrolling="no" 
            frameborder="no" 
            allow="autoplay" 
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1746424434&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
          </iframe>
        </div>
      )}
    </div>
  );
}




//Estilos a parte.
const estilos = {
  contenedor: {
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'monospace',
    backgroundColor: '#111',
    color: '#f1f1f1',
    width: '100vw',
    height: '100vh'
  },

  boton: {
    margin: '1rem 0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  },

  //contenedor para el botón de música, que sea flotante
  contenedorMusica: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },

//botón de música
  botonMusica: {
    padding: '0.5rem 1rem',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '0.5rem'
  },
  playMusica: {
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
  botoncielo: {
        position: 'fixed',
        top: '20px',
        left: '20px',
        padding: '0.5rem 1rem',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 1000
    }
  
};


export default App;
