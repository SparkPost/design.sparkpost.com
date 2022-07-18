import React from 'react';
import { Box, Portal, ScreenReaderOnly, styles, useWindowEvent } from '@sparkpost/matchbox';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import css from '@styled-system/css';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';

const drawerAnimation = {
  open: {
    x: 0,
    opacity: 1
  },
  closed: {
    x: '100%',
    opacity: 0
  },
  initial: {
    x: '100%',
    opacity: 0
  }
};

const overlayAnimation = {
  open: {
    opacity: 1
  },
  closed: {
    opacity: 0
  },
  initial: {
    opacity: 0
  }
};

const DrawerContent = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 80vw;
  height: 100vh;
  ${css({ bg: 'scheme.bg' })};
`;
const Overlay = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  ${css({ bg: 'scheme.transparentBg' })};
`;

const CloseButton = styled.button`
  ${styles.buttonReset}
  width: 24px;
  height: 24px;
  position: relative;
  display: inline-block;
  /* ${css({ p: '400' })} */
`;

function CloseIcon({ onClick }) {
  return (
    <Box p="400">
      <ScreenReaderOnly>Close</ScreenReaderOnly>
      <CloseButton onClick={onClick}>
        <Box
          width="100%"
          height="2px"
          bg="scheme.fg"
          position="absolute"
          left="0"
          top="50%"
          style={{ transform: 'rotate(45deg)' }}
        />
        <Box
          width="100%"
          height="2px"
          bg="scheme.fg"
          position="absolute"
          left="0"
          top="50%"
          style={{ transform: 'rotate(-45deg)' }}
        />
      </CloseButton>
    </Box>
  );
}

function Drawer(props): JSX.Element {
  const { children, open, id, onClose } = props;
  const variants = open ? 'open' : 'closed';

  useWindowEvent('keydown', onKeyDown);

  function onKeyDown(e) {
    const { key } = e;
    if (key === 'Escape') {
      onClose();
    }
  }

  return (
    <>
      <ScrollLock isActive={open} />
      <Portal>
        <Box
          position="fixed"
          tabIndex={-1}
          width="100vw"
          height="100vh"
          top="0"
          right={'0'}
          zIndex="100"
          style={{ pointerEvents: open ? null : 'none' }}
          id={id}
          aria-modal="true"
          role="dialog"
        >
          <DrawerContent
            animate={variants}
            variants={drawerAnimation}
            initial={drawerAnimation.initial}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
          >
            <Box as="header" display="flex" justifyContent="flex-end" position="relative">
              <CloseIcon onClick={onClose} />
            </Box>
            <TouchScrollable>
              <Box height="calc(100vh - 62px)" overflowX="hidden" overflowY="scroll">
                {children}
              </Box>
            </TouchScrollable>
          </DrawerContent>
          <Overlay
            animate={variants}
            variants={overlayAnimation}
            initial={overlayAnimation.initial}
            onClick={onClose}
          />
        </Box>
      </Portal>
    </>
  );
}

export default Drawer;
