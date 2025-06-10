import React, { useEffect, useState } from 'react'
import estilosJS from './estilos';
import EventosCielo from './EventosCielo';

//Estadísticas del mapa
const ancho = 15;
const alto = 15;




//Generación del mapa. Se rellena todo de vacío
const generarMapa = () => {
    const mapa = [];

    for (let y = 0; y < alto; y++) {
        const fila = [];
        for (let x = 0; x < ancho; x++) {
            fila.push({
                tipo: "vacio", x, y, eventoUsado: false
            });
        }
        mapa.push(fila);
    }
    //Se colocan estrellas, agujeros negros, constelaciones y planetas
    colocarElemento(mapa, "estrella", 4);
    colocarElemento(mapa, "agujero_negro", 1);
    colocarElemento(mapa, "constelacion", 3);
    colocarElemento(mapa, "planeta", 6);

    return mapa;
};

//Se colocan aleatoriamente los elementos en el mapa y la cantidad de ellos. 
const colocarElemento = (mapa, tipo, cantidad) => {
    let colocados = 0;
    while (colocados < cantidad) {
        const x = Math.floor(Math.random() * ancho);
        const y = Math.floor(Math.random() * alto);
        if (mapa[y][x].tipo === "vacio") {
            mapa[y][x].tipo = tipo;
            colocados++;
        }
    }
};




const CieloNocturno = ({ atras }) => {
    const [mapa, mapaset] = useState(generarMapa());
    const [posicionYo, setPosicion] = useState({ x: 7, y: 7 });
    const [energia, setEnergia] = useState(15);     
    const [cordura, setCordura] = useState(10);     


    //movimiento
    const mover = (dx, dy) => {
        const nuevaX = posicionYo.x + dx;
        const nuevaY = posicionYo.y + dy;
        setEnergia(prev => Math.max(0, prev - 1));
        //para que no se escape del recuadro 
          if (nuevaX < 0 || nuevaX >= 15 || nuevaY < 0 || nuevaY >= 15) return;
        setPosicion({ x: nuevaX, y: nuevaY });

        
    };


    useEffect(() => {
    if (energia <= 0 || cordura <= 0) {
        alert("Te has desmayado... Volviendo al menú principal.");
        atras(); 
    }
    }, [energia, cordura]);

    useEffect(() => {
        //recoge la posición actual
        const celdaActual = mapa[posicionYo.y][posicionYo.x];
        
        
        if (!celdaActual.eventoUsado && ["estrella", "planeta", "constelacion", "agujero_negro"].includes(celdaActual.tipo)) 
            {
                eventoCielo(celdaActual.tipo);
                const nuevoMapa = [...mapa];
                nuevoMapa[posicionYo.y][posicionYo.x] = 
                {
                    ...celdaActual,
                    eventoUsado: true,
                };
            mapaset(nuevoMapa);
        }
    }, [posicionYo]);



    const [eventoActivo, setEventoActivo] = useState(null);
    const eventoCielo = (tipo) => {
        setCordura(prev => Math.max(0, prev - 3));
        setEventoActivo(tipo);
    };

    return (
        <div style={estilosJS.contenedor}>
            <h1>Surcando el cielo nocturno...</h1>
            
            <div style={estilosCielo.mapa}>
                {mapa.map((fila, y) =>
                    fila.map((celda, x) => {
                        const yo = posicionYo.x === x && posicionYo.y === y;

                        const contenido = yo ? "🚀" :
                            celda.eventoUsado ? "⚫":
                            celda.tipo === "estrella" ? "🌟" :
                            celda.tipo === "planeta" ? "🪐" :
                            celda.tipo === "constelacion" ? "✨" :
                            celda.tipo === "agujero_negro" ? "🖤" :
                            celda.tipo === "vacio" ? "⬛" :
                            " ";
                        return (
                            <div key={`${x}-${y}`} style={estilosCielo.celda}>
                                {contenido}
                            </div>
                        );
                    })
                )}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <button onClick={() => mover(0, -1)}>⬆️ Arriba</button>
                </div>
                <div>
                    <button onClick={() => mover(-1, 0)} style={{ marginRight: '10px', marginTop: '10px' }}>⬅️Izquierda</button>
                    <button onClick={() => mover(1, 0)} style={{ marginLeft: '10px', marginTop: '10px' }}>Derecha➡️</button>
                </div>
                <div>
                    <button onClick={() => mover(0, 1)} style={{marginTop: '10px' }}>⬇️ Abajo</button>
                </div>
            </div>
            {eventoActivo && (
                <EventosCielo
                    tipo={eventoActivo}
                    cerrarEvento={() => setEventoActivo(null)}/>
                )}

            <div style={{ position: "fixed", color: '#fff', marginBottom: '1rem' }}>
                🔋 Energía: {energia} &nbsp; | &nbsp; 🧠 Cordura: {cordura}
            </div>
        </div>  
    )
    
}


const estilosCielo = {
    mapa: {
        display: "grid",
        gridTemplateColumns: "repeat(15, 30px)", // 15 columnas
        gridTemplateRows: "repeat(15, 30px)",    // 15 filas
        gap: "1px",
        backgroundColor: "#222",
        width: "fit-content",
        margin: "2rem auto",
    },
    celda: {
        width: "30px",
        height: "30px",
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        lineHeight: "30px",
        fontSize: "18px",
        border: "1px solid #333",
    }
}

export default CieloNocturno;
