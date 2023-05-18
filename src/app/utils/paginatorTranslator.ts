import { MatPaginatorIntl } from '@angular/material/paginator';

// Esta función devuelve una nueva instancia de MatPaginatorIntl configurada para español.
export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = 'Héroes por página:';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  
  // getRangeLabel se llama cuando se necesita actualizar el rango de elementos que se muestran.
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    // Si no hay elementos o el tamaño de la página es 0, muestra "0 de {length}".
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  
  return paginatorIntl;
}
