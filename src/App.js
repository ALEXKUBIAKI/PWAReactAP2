import React, { useState, useEffect } from 'react';
import './input.css';
import { Layout } from 'antd';
import Menu from './components/Menu'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {

  return (
    <Layout class="w-full h-full">
      <Menu />
      <Content/>
      <Footer />
    </Layout>
  );
}

export default App;