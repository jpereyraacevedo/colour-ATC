export const saveConfiguration = async ({ inputs, userId, onSuccess, onError }) => {
  try {
    const requestBody = {
      userId,
      configurations: {
        bases: inputs.bases ?? 0,
        colorantes: inputs.colorantes ?? 0,
      },
    };

    const response = await fetch('http://192.168.0.240:5000/api/users/update-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar configuración.');
    }

    const updatedUserData = {
      ...JSON.parse(localStorage.getItem('userData')),
      configurations: {
        bases: data.configurations.bases,
        colorantes: data.configurations.colorantes,
      }
    };

    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    onSuccess?.(data);
  } catch (error) {
    console.error("🔴 Error al guardar configuración:", error.message);
    onError?.(error);
  }
};