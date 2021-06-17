import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

type PageTransitionProps = {
  children: React.ReactNode;
};

function PageTransition(props: PageTransitionProps): JSX.Element {
  const { children } = props;
  const router = useRouter();

  return (
    <motion.div
      key={router.asPath}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
