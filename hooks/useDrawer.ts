import { useState } from 'react';

type DrawerProps = {
  initialOpen?: boolean;
  id?: string;
};

type DrawerReturnProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  getActivatorProps: () => object;
  getDrawerProps: () => object;
};

function useDrawer(props: DrawerProps): DrawerReturnProps {
  const { initialOpen = false, id = 'matchbox-drawer' } = props;
  const [isOpen, setIsOpen] = useState(initialOpen);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function getActivatorProps(additionalProps = {}) {
    return {
      'aria-controls': id,
      onClick: open,
      ...additionalProps
    };
  }

  function getDrawerProps(additionalProps = {}) {
    return {
      id: id,
      onClose: close,
      open: isOpen,
      ...additionalProps
    };
  }

  return {
    isOpen,
    toggleDrawer: toggle,
    openDrawer: open,
    closeDrawer: close,
    getActivatorProps,
    getDrawerProps
  };
}

export default useDrawer;
