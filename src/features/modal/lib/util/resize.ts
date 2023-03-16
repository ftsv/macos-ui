export const resize = (resizableElement: HTMLElement) => {
    const styles = window.getComputedStyle(resizableElement);
    let width = parseInt(styles.width);
    let height = parseInt(styles.height);

    let xCord = 0;
    let yCord = 0;
  
    // Top
    const onMouseMoveTopResize = (event: MouseEvent) => {
      const dy = event.clientY - yCord;
      height = height - dy;
      yCord = event.clientY;
      resizableElement.style.height = height + 'px';   
    }

    const onMouseUpTopResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    }

    const onMouseDownTopResize = (event: MouseEvent) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizableElement);

      resizableElement.style.bottom = styles.bottom;
      resizableElement.style.top = ''; //! WARNING need null
      
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);

      console.log("onMouseDownTopResize", { yCord, top: styles.bottom});
    }

    // Bottom
    const onMouseMoveBottomResize = (event: MouseEvent) => {
      const dy = event.clientY - yCord;
      height += dy;
      yCord = event.clientY;
      resizableElement.style.height = height + 'px';   
    }

    const onMouseUpBottomResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    }

    const onMouseDownBottomResize = (event: MouseEvent) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizableElement);

      resizableElement.style.top = styles.top;
      resizableElement.style.bottom = ''; //! WARNING need null

      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    }

    //Left
    const onMouseMoveLeftResize = (event: MouseEvent) => {
      const dx = event.clientX - xCord;
      width = width - dx;
      xCord = event.clientX;
      resizableElement.style.width = width + 'px';   
    }

    const onMouseUpLeftResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    }

    const onMouseDownLeftResize = (event: MouseEvent) => {
      xCord = event.clientX
      const styles = window.getComputedStyle(resizableElement);
      console.log('left ->', styles.left,'right ->', styles.right)

      resizableElement.style.right = styles.right;
      resizableElement.style.left = ''; //! WARNING need null

      console.log('left ', resizableElement.style.left,'right ', resizableElement.style.right)

      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    }
    
    //Right
    const onMouseMoveRightResize = (event: MouseEvent) => {
      const dx = event.clientX - xCord;
      width = width + dx;
      xCord = event.clientX;
      resizableElement.style.width = width + 'px';   
    }

    const onMouseUpRightResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    }

    const onMouseDownRightResize = (event: MouseEvent) => {
      xCord = event.clientX
      const styles = window.getComputedStyle(resizableElement);

      resizableElement.style.left = styles.left;
      resizableElement.style.right = ''; //! WARNING need null

      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    }


    return {
      onMouseDownTopResize,
      onMouseDownBottomResize,
      onMouseDownLeftResize,
      onMouseDownRightResize,
    }
}