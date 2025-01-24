document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById("update-form");
    const statusHistory = document.getElementById("status-history");
    const trackingData = JSON.parse(localStorage.getItem("trackingData")) || {};

    // Función para convertir el tiempo a formato de 12 horas
    const formatTimeTo12H = (time) => {
        const [date, hour] = time.split(" ");
        let [hours, minutes] = hour.split(":");
        const suffix = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convertir a formato de 12 horas
        return `${date} ${hours}:${minutes} ${suffix}`;
    };


    // Función para agregar un cambio de estado
    const updatePackageStatus = (trackingNumber, status, time) => {
        if (!trackingData[trackingNumber]) {
            trackingData[trackingNumber] = [];
        }
        trackingData[trackingNumber].push({ status, time });
        localStorage.setItem("trackingData", JSON.stringify(trackingData));
        alert("Estado actualizado correctamente.");
    };

    // Función para mostrar el historial de estados
    const updateHistory = (data, trackingNumber) => {
        statusHistory.innerHTML = "";
        data.forEach(item => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.textContent = `${item.time} - ${item.status}`;

            // Botón para eliminar una guía
            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deletePackage(trackingNumber);  // Asignar evento de eliminación

            listItem.appendChild(deleteButton);
            statusHistory.appendChild(listItem);
        });
    };

    // Función para eliminar una guía
    const deletePackage = (trackingNumber) => {
        if (confirm(`¿Estás seguro de que deseas eliminar la guía ${trackingNumber}?`)) {
            delete trackingData[trackingNumber]; // Eliminar la guía del objeto
            localStorage.setItem("trackingData", JSON.stringify(trackingData)); // Actualizar localStorage
            alert(`La guía ${trackingNumber} ha sido eliminada.`);
            location.reload(); // Recargar la página para actualizar la vista
        }
    };

    // Evento del formulario de actualización de estado
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const trackingNumber = document.getElementById("tracking-number").value;
        const status = document.getElementById("status").value;
        const time = document.getElementById("time").value;

        updatePackageStatus(trackingNumber, status, time);

        // Mostrar el historial del paquete
        if (trackingData[trackingNumber]) {
            updateHistory(trackingData[trackingNumber], trackingNumber);
        }
    });
});
