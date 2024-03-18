//componente del cuadro, se podria crear en un archivo separado, 
//se asigno este espacio porque es mas comodo, y se crea como otro componente para utilizarlo en dos instancias
export function Square({children, isSelected, updateBoard, index}) {
    //recibe como pros, el children sea o u x, una funcion que le permite actualizarse y el indice que ocupa en el array
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => {
      updateBoard(index);
    }
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }