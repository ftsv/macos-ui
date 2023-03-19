
export const resize = (resizableElement: HTMLElement) => { 
  let width = 0;
  let height = 0;
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;


  let xCoord = 0;
  let yCoord = 0;

  const fixMouseCoord = ({x, y}: {x: number, y: number}): void => {
    xCoord = x;
    yCoord = y;
  }

  const minHeight = 100;
  const minWidth = 100;

  
  const fixCoords = (): void => {
    const styles = window.getComputedStyle(resizableElement);
    width = parseInt(styles.width);
    height = parseInt(styles.height);
    top = parseInt(styles.top);
    bottom = window.innerHeight - (top + height);
    left = parseInt(styles.left);
    right = window.innerWidth - (left + width);
  }
  
  fixCoords();


  // Top
  const onMouseMoveTopResize = (event: MouseEvent) => {
    const dy = event.clientY - yCoord;
    height = height - dy;

    fixMouseCoord({x: event.clientX, y: event.clientY});

    if (height < minHeight) return ;

    resizableElement.style.height = height + 'px';   
  }

  const onMouseUpTopResize = () => {
    fixCoords();
    document.removeEventListener("mousemove", onMouseMoveTopResize);
  }

  const onMouseDownTopResize = (event: MouseEvent) => {
    fixMouseCoord({x: event.clientX, y: event.clientY});

    resizableElement.style.bottom = bottom +'px';
    resizableElement.style.top = '';
    
    document.addEventListener("mousemove", onMouseMoveTopResize);
    document.addEventListener("mouseup", onMouseUpTopResize);
  }

  // Bottom
  const onMouseMoveBottomResize = (event: MouseEvent) => {
    const dy = event.clientY - yCoord;
    height = height + dy;

    fixMouseCoord({x: event.clientX, y: event.clientY});

    if (height < minHeight) return ;

    resizableElement.style.height = height + 'px';   
  }

  const onMouseUpBottomResize = () => {
    fixCoords();
    document.removeEventListener("mousemove", onMouseMoveBottomResize);
  }

  const onMouseDownBottomResize = (event: MouseEvent) => {
    fixMouseCoord({x: event.clientX, y: event.clientY});

    resizableElement.style.top = top + 'px';
    resizableElement.style.bottom = '';

    document.addEventListener("mousemove", onMouseMoveBottomResize);
    document.addEventListener("mouseup", onMouseUpBottomResize);
  }

  //Left
  const onMouseMoveLeftResize = (event: MouseEvent) => {
    const dx = event.clientX - xCoord;
    width = width - dx;

    fixMouseCoord({x: event.clientX, y: event.clientY});

    if (width < minWidth) return ;

    resizableElement.style.width = width + 'px';   
  }

  const onMouseUpLeftResize = () => {
    fixCoords();
    document.removeEventListener("mousemove", onMouseMoveLeftResize);
  }

  const onMouseDownLeftResize = (event: MouseEvent) => {
    fixMouseCoord({x: event.clientX, y: event.clientY});

    resizableElement.style.right = right + 'px';
    resizableElement.style.left = '';

    document.addEventListener("mousemove", onMouseMoveLeftResize);
    document.addEventListener("mouseup", onMouseUpLeftResize);
  }
  
  //Right
  const onMouseMoveRightResize = (event: MouseEvent) => {
    const dx = event.clientX - xCoord;
    width = width + dx;
    
    fixMouseCoord({x: event.clientX, y: event.clientY});
    
    if (width < minWidth) return ;

    resizableElement.style.width = width + 'px';   
  }

  const onMouseUpRightResize = () => {
    fixCoords();
    document.removeEventListener("mousemove", onMouseMoveRightResize);
  }

  const onMouseDownRightResize = (event: MouseEvent) => {
    fixMouseCoord({x: event.clientX, y: event.clientY});

    resizableElement.style.left = left + 'px';
    resizableElement.style.right = '';

    document.addEventListener("mousemove", onMouseMoveRightResize);
    document.addEventListener("mouseup", onMouseUpRightResize);
  }

  //Move
  const onMouseMove = (event: MouseEvent) => {
    const dx = event.clientX - xCoord;
    const dy = event.clientY - yCoord;
    top = top + dy;
    left = left + dx;
 
    fixMouseCoord({x: event.clientX, y: event.clientY});

    if (top < 25 || (left + width) < 10 || (window.innerHeight - top) < 70) return;

    resizableElement.style.top = top + 'px';
    resizableElement.style.left = left + 'px';
  }

  const onMouseUp = () => {
    fixCoords();
    resizableElement.style.cursor = 'default';
    document.removeEventListener("mousemove", onMouseMove);
  }

  const onMouseDown = (event: MouseEvent) => {
    fixMouseCoord({x: event.clientX, y: event.clientY});
    resizableElement.style.cursor = 'move';

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }


  return {
    onMouseDownTopResize,
    onMouseDownBottomResize,
    onMouseDownLeftResize,
    onMouseDownRightResize,
    onMouseDown,
  }
}