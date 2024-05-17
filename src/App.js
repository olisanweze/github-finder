import { React, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Search from './components/Search';
import User from './components/User';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 1.3, ease: "easeInOut" } },
};

function App() {
  const token = process.env.REACT_APP_TOKEN;
  const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}`}}), [token]);

  return (
    <>
      <main className='grid p-center'>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={
              <motion.div 
                className='container' 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                variants={pageTransition} 
                layout
              >
                <Search options={options} />
              </motion.div>
            }/>
            <Route path="/user/:username" element={
              <motion.div 
                className='container' 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                variants={pageTransition} 
                layout
              >
                <User options={options} />
              </motion.div>
            }/>
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;