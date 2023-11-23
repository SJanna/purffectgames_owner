import { useState } from 'react';

const useIdentificationCheck = () => {
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    // Otros campos del cliente
  });

  const handleIdentificationCheck = async () => {
    // Realizar una solicitud al servidor para verificar el número de identificación
    try {
      const response = await fetch(`/api/check-client?identificationNumber=${identificationNumber}`);
      if (response.ok) {
        const clientInfo = await response.json();
        // Autocompletar los demás campos con la información del cliente
        setClientData({
          ...clientData,
          name: clientInfo.name,
          email: clientInfo.email,
          // Autocompletar otros campos según sea necesario
        });
      } else {
        console.error('Error al verificar el número de identificación');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return {
    identificationNumber,
    setIdentificationNumber,
    clientData,
    handleIdentificationCheck,
  };
};

export default useIdentificationCheck;
