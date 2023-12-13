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
      const collectionRef = collection(db, 'tasks2'); // Substitua 'tasks2' pelo nome da sua coleção

      await addDoc(collectionRef, { taskData: data, completed: false }); // Adiciona um novo documento com os dados fornecidos

      setData('');
      console.log('Dados Adicionados ao Firestore!');
      fetchData(); // Atualiza a lista de documentos após adicionar um novo
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
    <div>
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
      <h3>Tarefas Pendentes</h3>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            {doc.taskData}
            <button onClick={() => handleMarkAsDone(doc.id)}>Feito</button>
            <button onClick={() => handleDelete(doc.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Tarefas Concluídas</h3>
      <ul>
        {completedDocuments.map((doc) => (
          <li key={doc.id}>
            {doc.taskData}
            <button onClick={() => handleDelete(doc.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddData;
