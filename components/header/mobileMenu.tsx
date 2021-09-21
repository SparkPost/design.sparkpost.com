import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from '@sparkpost/matchbox';
import { motion } from 'framer-motion';

type MenuProps = {
  children: React.ReactNode;
  isOpen: boolean;
  id: string;
};

const StyledOverlay = styled(motion.div)`
  position: absolute;
  width: calc(100vw - 4px);
  height: calc(100vh - 66px);
  top: 66px;
  left: 0;
  background: ${(props) => props.theme?.colors?.scheme.transparentBg};
  z-index: -1;
`;

const overlayAnimations = {
  open: {
    opacity: 1,
    display: 'block'
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
};

const MobileStyledList = styled(motion.ul)`
  list-style: none;
  margin: 0;
  position: absolute;
  top: 64px;
  right: -2px;
  width: calc(100% + 4px);
  height: auto;
  flex-direction: column;
  text-align: left;
  transform-origin: 0 0;

  ${css({
    border: 'thick',
    bg: 'scheme.bg',
    p: 0,
    display: ['flex', null, null, null, 'none']
  })}
`;

const menuAnimations = {
  open: {
    opacity: 1,
    scaleY: 1,
    display: 'flex'
  },
  closed: {
    opacity: 0,
    scaleY: 0.9,
    transitionEnd: {
      display: 'none'
    }
  }
};

function MobileMenu(props: MenuProps): JSX.Element {
  const { children, isOpen = false, id } = props;
  const variant = isOpen ? 'open' : 'closed';

  return (
    <Box display={['block', null, null, null, 'none']}>
      <MobileStyledList
        id={id}
        initial={{ opacity: 0, scaleY: 0.9 }}
        animate={variant}
        variants={menuAnimations}
        transition={{
          ease: 'easeInOut',
          duration: 0.3
        }}
      >
        {children}
      </MobileStyledList>
      <StyledOverlay animate={variant} initial={{ opacity: 0 }} variants={overlayAnimations} />
    </Box>
  );
}

export default MobileMenu;
