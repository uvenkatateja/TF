declare module '@tsparticles/engine' {
  export type Container = any;
  export type SingleOrMultiple<T> = T | T[];
}

declare module '@tsparticles/react' {
  import { ComponentType } from 'react';
  
  export function initParticlesEngine(callback: (engine: any) => Promise<void>): Promise<void>;
  
  const Particles: ComponentType<any>;
  export default Particles;
}

declare module '@tsparticles/slim' {
  export function loadSlim(engine: any): Promise<void>;
}