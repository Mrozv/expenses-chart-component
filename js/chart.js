// Pobierz odniesienie do canvas, na którym chcesz wyświetlić wykres
const ctx = document.getElementById("myChart").getContext("2d");
const titleTooltip = (tooltipItems) => {
  return "";
};

// Asynchronicznie wczytaj dane JSON z innego pliku
fetch("/js/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Dane JSON zostały pomyślnie wczytane
    // Tutaj możesz przetworzyć dane i stworzyć wykres
    const labels = data.map(function (item) {
      return item.day;
    });

    const values = data.map(function (item) {
      return item.amount;
    });

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
            backgroundColor: function (context) {
              const index = context.dataIndex;
              const maxIndex = values.indexOf(Math.max(...values));
              const baseColor =
                index === maxIndex ? "rgb(0, 159, 225)" : "hsl(10, 79%, 65%)";
              const brighterColor =
                index === maxIndex ? "rgb(150, 224, 255)" : "hsl(10, 79%, 85%)";
              return context.active ? brighterColor : baseColor;
            },
          },
        ],
      },
      options: {
        scales: {
          y: {
            display: false,
          },
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
            position: "nearest",
            yAlign: "bottom",
            caretSize: 0,
            caretPadding: 10,
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
            callbacks: {
              title: titleTooltip,
              label: function (context) {
                let label = context.dataset.label || "";

                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
            bodyFont: {
              size: 18,
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Błąd podczas wczytywania danych JSON: " + error);
  });
