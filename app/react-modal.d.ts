// app/@types/react-modal.d.ts
declare module 'react-modal' {
    import { Component } from 'react';
  
    interface ModalProps {
      isOpen: boolean;
      onRequestClose: () => void;
      contentLabel?: string;
      //appElement?: HTMLElement | undefined; 
      className?: string;
      overlayClassName?: string;
      // Add any other props you need
    }
  
    export default class Modal extends Component<ModalProps> {}
  }