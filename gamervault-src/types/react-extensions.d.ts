// This file extends React types for better TypeScript support
import * as React from 'react';

declare module 'react' {
  // Extend React FC to have better type support
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): React.ReactElement<any, any> | null;
  }
  
  // Ensure children prop is properly typed
  interface PropsWithChildren<P> {
    children?: React.ReactNode;
    props?: P;
  }
  
  // Ensure JSX.Element is properly typed
  type ReactElement = JSX.Element;
}
