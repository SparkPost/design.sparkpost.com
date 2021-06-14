import { Box, Portal } from '@sparkpost/matchbox';
import { motion } from 'framer-motion';
// import useDrawer from '@hooks/useDrawer';
import styled from 'styled-components';
import css from '@styled-system/css';

type DrawerProps = {
  children: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  id: string;
  onChange: () => void;
  onClose: () => void;
  open: boolean;
  portalId: string;
  position: 'right' | 'left';
};

const drawerAnimation = {
  open: {
    x: 0,
    opacity: 1
  },
  closed: {
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

function Drawer(props: DrawerProps): JSX.Element {
  const { open, onClose, children } = props;
  console.log(open);
  const variants = open ? 'open' : 'closed';
  return (
    <Portal>
      <Box
        position="fixed"
        tabIndex="-1"
        width="100vw"
        height="100vh"
        top="0"
        right="0"
        zIndex="100"
        style={{ pointerEvents: open ? null : 'none' }}
      >
        <DrawerContent
          animate={variants}
          variants={drawerAnimation}
          transition={{
            duration: 0.3,
            ease: 'easeOut'
          }}
        >
          {children}
        </DrawerContent>
        <Overlay animate={variants} variants={overlayAnimation} onClick={onClose} />
      </Box>
    </Portal>
  );
}

export default Drawer;
