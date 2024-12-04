import { Layout } from 'antd';
import logo from './logo.jpg'; 

function Menu() {
  return (
    <Layout.Header className="flex items-center justify-between min-h-20 bg-black">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-16 mr-4" />
        <a className="text-white">Home</a>
      </div>
      <a className="text-white mx-4">Produtos</a>
      <a className="text-white ml-auto">Contato</a>
    </Layout.Header>
  );
}

export default Menu;
