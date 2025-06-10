import React from 'react'

//Esta parte no está implementada todavía. Es de prueba
const BorrarPartida = () => {
  return (
      <div>
          <button
              onClick={() => { localStorage.removeItem("inventario"); window.location.reload();}}>
            Vaciar inventario
          </button>
    </div>
  )
}

export default BorrarPartida
