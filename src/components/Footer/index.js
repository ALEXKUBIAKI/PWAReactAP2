import { Layout } from 'antd';

function Footer() {
  return (
<Layout.Footer class="text-center items-center flex justify-center min-h-16 bg-gray-800">
  <a class="text-white">Loja Teste {new Date().getFullYear()}  Shopify</a>
</Layout.Footer>
  );
}

export default Footer;