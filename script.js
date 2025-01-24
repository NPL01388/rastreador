document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const statusHistory = document.getElementById("status-history");
    const trackingForm = document.getElementById("tracking-form");

    // Simulación de datos (esto se obtendría del servidor o un archivo JSON)
    const trackingData = JSON.parse(localStorage.getItem("trackingData")) || {};

    // Función para actualizar la línea de tiempo
    const updateTimeline = (data) => {
        timeline.innerHTML = ""; 
        data.forEach((item) => {
            const timelineItem = document.createElement("div");
            timelineItem.className = "timeline-item visible";
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <h5>${item.status}</h5>
                    <p>${item.time}</p>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });
    };

    // Función para actualizar el historial
    const updateHistory = (data) => {
        statusHistory.innerHTML = ""; 
        data.forEach(item => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = `${item.time} - ${item.status}`;
            statusHistory.appendChild(listItem);
        });
    };

    // Evento del formulario
    trackingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const trackingNumber = document.getElementById("tracking-number").value;
        if (trackingData[trackingNumber]) {
            const data = trackingData[trackingNumber];
            updateTimeline(data);
            updateHistory(data);
        } else {
            alert("Número de guía no encontrado");
        }
    });
});
