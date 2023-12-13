import React, { useState, useEffect } from 'react';
import db from '../config/firebase.config'; // Importe a referência do Firestore
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, where, documentId } from 'firebase/firestore';

const AddData: React.FC = () => {
  const [data, setData] = useState('');
  const [documents, setDocuments] = useState([]);
  const [completedDocuments, setCompletedDocuments] = useState([]);

  useEffect(() => {
    fetchData(); // Busca os documentos da coleção ao carregar o componente
  }, []);

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, 'tasks2'); // Substitua 'tasks2' pelo nome da sua coleção

      const querySnapshot = await getDocs(collectionRef);
      const documentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocuments(documentsData.filter(doc => !doc.completed)); // Filtra os documentos não concluídos
      setCompletedDocuments(documentsData.filter(doc => doc.completed)); // Filtra os documentos concluídos
    } catch (error) {
      console.error('Erro ao buscar dados do Firestore:', error);
    }
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    if (data.length < 4 || data.length > 20) {
      console.error('Por favor, insira entre 4 e 20 caracteres.');
      return; // Retorna se o comprimento não estiver dentro do intervalo desejado
    }

    const collectionRef = collection(db, 'tasks2');

    await addDoc(collectionRef, { taskData: data, completed: false });

    setData('');
    console.log('Dados Adicionados ao Firestore!');
    fetchData();
  } catch (error) {
    console.error('Erro ao adicionar ao Firestore:', error);
  }
};


  const handleDelete = async (documentId: string) => {
    try {
      const documentRef = doc(db, 'tasks2', documentId); // Substitua 'tasks2' pelo nome da sua coleção e documentId pelo ID do documento a ser excluído

      await deleteDoc(documentRef);
      console.log('Documento removido do Firestore!');
      fetchData(); // Atualiza a lista de documentos após a exclusão
    } catch (error) {
      console.error('Erro ao remover do Firestore:', error);
    }
  };

  const  handleMarkAsDone = async (documentId: string) => {
    try {
      const documentRef = doc(db, 'tasks2', documentId); // Substitua 'tasks2' pelo nome da sua coleção e documentId pelo ID do documento a ser marcado como concluído

      await updateDoc(documentRef, { completed: true });
      console.log('Documento marcado como concluído!');
      fetchData(); // Atualiza a lista de documentos após marcar como concluído
    } catch (error) {
      console.error('Erro ao marcar como concluído:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
       <h2>Adicionar/Remover Dados</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Insira os Dados"
        />
        <button type="submit">Adicionar</button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h3>Tarefas Pendentes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
            {documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  backgroundColor: '#FFCC80',
                  padding: '10px',
                  borderRadius: '10px',
                  boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
                }}
              >
                <p>{doc.taskData}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <button style={{ marginRight: '8px' }} onClick={() => handleMarkAsDone(doc.id)}>Feito</button>
                  <button onClick={() => handleDelete(doc.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1', marginLeft: '20px' }}>
          <h3>Tarefas Concluídas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
            {completedDocuments.map((doc) => (
              <div
                key={doc.id}
                style={{
                  backgroundColor: '#AED581',
                  padding: '10px',
                  borderRadius: '10px',
                  boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
                }}
              >
                <p>{doc.taskData}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button onClick={() => handleDelete(doc.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddData;
