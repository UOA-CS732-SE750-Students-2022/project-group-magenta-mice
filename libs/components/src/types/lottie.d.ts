import { DOMAttributes, CSSProperties } from "react";

export type CustomElement<T> = Partial<
  T & DOMAttributes<T> & { children: any }
>;

export interface Lottie {
  src: string;
  background: string;
  speed: string;
  style: CSSProperties;
  loop: boolean;
  autoplay: boolean;
  className: string;
}

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["lottie-player"]: CustomElement<Lottie>;
    }
  }
}
