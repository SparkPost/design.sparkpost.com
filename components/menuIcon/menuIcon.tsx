import { Box, ScreenReaderOnly, styles } from '@sparkpost/matchbox';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import css from '@styled-system/css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
  toggleMenu: () => void;
}

const ToggleButton = styled.button`
  ${styles.buttonReset}
  position: relative;
  ${css({
    py: '400',
    px: '300',
    display: ['block', null, null, null, 'none'],
    mr: '300'
  })}
`;

const barStyles = `
    width: 100%;
    height: 2px;
    position: absolute;
    top: 50%;
    left: 0;
`;

const BarOne = styled(motion.div)`
  ${barStyles}
  ${css({
    bg: 'scheme.fg'
  })}
`;

const BarTwo = styled(motion.div)`
  ${barStyles}
  ${css({
    bg: 'scheme.fg'
  })}
`;

const top = {
  open: {
    rotate: 45,
    y: 0
  },
  closed: {
    rotate: 0,
    y: -4
  }
};

const bottom = {
  open: {
    rotate: -45,
    y: 0
  },
  closed: {
    rotate: 0,
    y: 4
  }
};

const initial = {
  top: {
    rotate: 0,
    y: -4
  },
  bottom: {
    rotate: 0,
    y: 4
  }
};

function MenuIcon(props: ButtonProps): JSX.Element {
  const { isOpen = false, toggleMenu, 'aria-controls': ariaControls } = props;
  const variant = isOpen ? 'open' : 'closed';

  return (
    <ToggleButton
      onClick={toggleMenu}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={ariaControls}
    >
      <ScreenReaderOnly>{isOpen ? 'Close' : 'Open'} Menu</ScreenReaderOnly>
      <Box width="24px" height="18px" position="relative" aria-hidden="true">
        <BarOne variants={top} animate={variant} initial={initial.top} />
        <BarTwo variants={bottom} animate={variant} initial={initial.bottom} />
      </Box>
    </ToggleButton>
  );
}

export default MenuIcon;
