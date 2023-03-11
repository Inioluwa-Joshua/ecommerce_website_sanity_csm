import React from 'react'
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      
      <Head>
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <title>My Store</title>
      </Head>
      <header>
        <Navbar />
      </header>     
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout