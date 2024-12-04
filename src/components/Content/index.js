import React, { useState, useEffect } from 'react';
import { Layout, Button, Modal, Input, Form, Upload, message } from 'antd';
import Card from '../Card';
import cadeiraImg from '../../assets/image.png';

function Content() {
  const [produtos, setProdutos] = useState([]);
  const [modal, setModal] = useState(false);
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = () => {
    fetch('http://192.168.100.102:3001/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  };

  const handleAdicionarProduto = () => {
    setModal(true);
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleUploadChange = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/15f8eb74-f9a2-4885-a3fe-61f8aeb29b8a',
    onChange: handleUploadChange,
  };

  const handleNomeChange = (e) => {
    setNomeProduto(e.target.value);
  };

  const handleValorChange = (e) => {
    // Converter para decimal
    const valor = parseFloat(e.target.value);
    setValorProduto(valor);
  };

  const handleFormSubmit = () => {
    const novoProduto = {
      nome: nomeProduto,
      valor: valorProduto,
      imagem: cadeiraImg,
    };

    fetch('http://localhost:3001/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoProduto),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar produto');
        }
        message.success('Produto adicionado com sucesso!');
        setModal(false);
        fetchProdutos();
        setNomeProduto('');
        setValorProduto(null);
      })
      .catch(error => {
        console.error('Erro ao adicionar produto:', error);
        message.error('Erro ao adicionar produto. Por favor, tente novamente.');
      });
  };

  return (
    <Layout.Content className="text-center flex flex-col min-w-96 min-h-screen p-2">
      <div className="flex justify-center mb-2">
        <Button type="primary" onClick={handleAdicionarProduto}>
          Adicionar Produto
        </Button>
      </div>
      <div className="flex flex-wrap mt-2">
        <Card produtos={produtos} />
      </div>
      <Modal
        title="Adicionar Produto"
        visible={modal}
        onCancel={handleModalCancel}
        onOk={handleFormSubmit}
      >
        <Form>
          <Form.Item className="mt-2 mb-2 h-16" label="Nome do Produto" layout="vertical" required>
            <Input
              value={nomeProduto}
              onChange={handleNomeChange}
              placeholder="Produto"
              size="default"
              allowClear
            />
          </Form.Item>
          <Form.Item className="mt-2 mb-2 h-16" label="Valor" layout="vertical" required>
            <Input
              value={valorProduto === null ? '' : valorProduto.toString()}
              onChange={handleValorChange}
              placeholder="Valor"
              size="default"
              allowClear
            />
          </Form.Item>
          <Form.Item label="Imagem do Produto" required>
            <Upload {...uploadProps}>
              <Button>Selecionar Imagem</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Content>
  );
}

export default Content;
