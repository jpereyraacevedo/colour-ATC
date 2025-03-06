import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { SpinnerCircular } from 'spinners-react';
import { BiSolidLike } from 'react-icons/bi';

const ConfigurationModal = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    bases: '',
    colorantes: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Cargar valores de configuración almacenados en localStorage al montar el componente
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData.configurations) {
          setInputs({
            bases: userData.configurations.bases ?? '',
            colorantes: userData.configurations.colorantes ?? '',
          });
        }
      } catch (error) {
        console.error("❌ Error al parsear 'userData' desde localStorage:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Math.max(0, Math.min(999, Number(value)));
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: numericValue,
    }));
  };

  const handleSave = async () => {
    console.log("🔵 Iniciando guardado...");
    setIsSaving(true);

    try {
      const userDataString = localStorage.getItem('userData');

      if (!userDataString) {
        console.error("❌ No se encontró `userData` en localStorage.");
        throw new Error("No se encontró `userData` en localStorage.");
      }

      const userData = JSON.parse(userDataString);
      console.log("🟢 Datos del usuario obtenidos de localStorage:", userData);

      if (!inputs || typeof inputs !== "object") {
        console.error("❌ `inputs` no es válido:", inputs);
        throw new Error("Los datos de configuración no son válidos.");
      }

      console.log("🟡 Inputs actuales:", inputs);

      const requestBody = {
        userId: userData.id,
        configurations: {
          bases: inputs.bases ?? 0,
          colorantes: inputs.colorantes ?? 0,
        }
      };

      console.log("📤 Enviando datos al backend:", requestBody);

      const response = await fetch('http://192.168.0.240:5000/api/users/update-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Respuesta del backend recibida");

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("❌ Error al parsear respuesta del backend", parseError);
        throw new Error("Error al procesar la respuesta del servidor.");
      }

      console.log("🟢 Datos recibidos del backend:", data);

      if (!response.ok) {
        console.error("🔴 Error en la respuesta del backend:", data);
        throw new Error(data.message || "Error al actualizar configuración.");
      }

      const updatedUserData = {
        ...userData,
        configurations: {
          ...userData.configurations,
          bases: data.configurations.bases,
          colorantes: data.configurations.colorantes,
        }
      };

      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      console.log("✅ Configuración guardada en localStorage:", updatedUserData);

      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("🔴 Error al guardar:", error.message);
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-96 relative">
      <button
        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      <h1 className="text-lg font-bold text-center mb-4">Configuración</h1>

      <div className="mb-4">
        <label className="block mb-1">
          Ganancia a <span className="font-bold">bases</span>:
        </label>
        <input
          type="number"
          name="bases"
          value={inputs.bases}
          onChange={handleInputChange}
          min="0"
          max="100"
          className="w-full border border-[var(--primary-color)] focus:outline-[var(--primary-color)] focus:border-[var(--primary-color)] rounded p-2"
          placeholder="Ingresa ganancia a bases"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">
          Ganancia a <span className="font-bold">colorantes</span>:
        </label>
        <input
          type="number"
          name="colorantes"
          value={inputs.colorantes}
          onChange={handleInputChange}
          min="0"
          max="100"
          className="w-full border border-[var(--primary-color)] focus:outline-[var(--primary-color)] focus:border-[var(--primary-color)] rounded p-2"
          placeholder="Ingresa ganancia a colorantes"
        />
      </div>

      <div className="flex justify-between items-center">
        {isSaving ? (
          <div className="flex items-center justify-center w-full">
            <SpinnerCircular size={40} thickness={100} color="var(--primary-color)" />
          </div>
        ) : isSaved ? (
          <div className="flex items-center justify-center w-full text-green-500">
            <BiSolidLike className="mr-2 text-xl" />
            Datos guardados correctamente
          </div>
        ) : (
          <>
            <button
              className="bg-[var(--primary-color)] text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={onClose}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfigurationModal;
