import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { SpinnerCircular } from 'spinners-react';
import { BiSolidLike } from 'react-icons/bi';

const ConfigurationModal = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    bases: '',
    colorantes: '',
  });

  const [isSaving, setIsSaving] = useState(false); // Estado para mostrar el spinner
  const [isSaved, setIsSaved] = useState(false); // Estado para mostrar confirmación

  // Maneja los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Math.max(0, Math.min(999, Number(value))); // Asegura que esté entre 0 y 100
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: numericValue,
    }));
  };

  // Maneja el guardado de datos
  const handleSave = () => {
    setIsSaving(true); // Muestra el spinner
    setTimeout(() => {
      console.log('Datos guardados:', inputs); // Puedes usar estos datos donde los necesites
      setIsSaving(false); // Oculta el spinner
      setIsSaved(true); // Muestra el mensaje de éxito
      setTimeout(() => {
        setIsSaved(false); // Oculta el mensaje de éxito
        onClose(); // Cierra el modal
      }, 1500); // Mantiene el mensaje de éxito visible por 1.5 segundos
    }, 1000); // Simula un proceso de guardado de 1 segundo
  };

  return (
    <div className="bg-white rounded-lg p-6 w-96 relative">
      {/* Botón para cerrar el modal */}
      <button
        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {/* Título centrado */}
      <h1 className="text-lg font-bold text-center mb-4">Configuración</h1>

      {/* Inputs */}
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

      {/* Botones Aceptar y Cancelar */}
      <div className="flex justify-between items-center">
        {isSaving ? ( // Muestra el spinner mientras se guarda
          <div className="flex items-center justify-center w-full">
            <SpinnerCircular size={40} thickness={100} color="var(--primary-color)" />
          </div>
        ) : isSaved ? ( // Muestra el mensaje de éxito
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
