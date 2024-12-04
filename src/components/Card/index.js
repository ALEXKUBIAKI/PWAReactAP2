import React, { useState } from 'react';
import { Card, Modal, Row, Col } from 'antd';

function Produto({ produtos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  const handleCardClick = (produto) => {
    setSelectedProduto(produto);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Row gutter={[16, 16]} justify="center">
        {produtos.map((produto) => (
          <Col key={produto.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              bordered={true}
              cover={<img alt={produto.nome} src={produto.imagem} style={{ objectFit: 'cover', height: '200px' }} />}
              className="w-72 max-h-80 mt-2 ml-2 mr-1 bg-black"
              onClick={() => handleCardClick(produto)}
            >
              <p className="text-white font-medium">{produto.nome}</p>
              <p className="text-white font-medium">Valor: R${parseFloat(produto.valor).toFixed(2)}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedProduto && (
        <Modal
          title="Detalhes do Produto"
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <div className="text-center">
            <img alt={selectedProduto.nome} src={selectedProduto.imagem} className="max-w-full rounded" style={{ maxHeight: '400px', objectFit: 'contain' }} />
            <p className="text-center font-medium mt-2">Nome: {selectedProduto.nome}</p>
            <p className="text-center font-medium mt-2">Valor: R${selectedProduto.valor}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Produto;
