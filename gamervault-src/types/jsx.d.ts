import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    
    interface ElementChildrenAttribute {
      children: {};
    }
    
    interface ElementAttributesProperty {
      props: {};
    }
  }
}
