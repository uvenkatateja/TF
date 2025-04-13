/**
 * Smoothly scrolls to a target element or position with customizable duration
 * @param target - Element ID or Y position to scroll to
 * @param duration - Duration of the scroll animation in milliseconds
 */
export function smoothScroll(target: string | number, duration = 500): void {
  let targetPosition: number;
  
  // Determine target position based on input type
  if (typeof target === 'string') {
    // Handle element ID (with or without # prefix)
    const elementId = target.startsWith('#') ? target.substring(1) : target;
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found.`);
      return;
    }
    
    targetPosition = element.getBoundingClientRect().top + window.scrollY;
  } else {
    // Handle direct Y position
    targetPosition = target;
  }
  
  // Get starting position
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  // Animation function
  function animate(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function (easeInOutQuad)
    const easeProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    window.scrollTo(0, startPosition + distance * easeProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animate);
    }
  }
  
  // Start animation
  requestAnimationFrame(animate);
} 