document.addEventListener("DOMContentLoaded", function () {
  const chart = echarts.init(document.getElementById("metricsChart"));
  const option = {
      animation: false,
      tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 40,
      },
      xAxis: {
          type: "category",
          data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      },
      yAxis: {
          type: "value",
      },
      series: [
          {
              name: "Eficiencia",
              type: "line",
              smooth: true,
              data: [30, 40, 45, 50, 55, 60],
              itemStyle: {
                  color: "rgba(87, 181, 231, 1)",
              },
              areaStyle: {
                  color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                          {
                              offset: 0,
                              color: "rgba(87, 181, 231, 0.2)",
                          },
                          {
                              offset: 1,
                              color: "rgba(87, 181, 231, 0)",
                          },
                      ],
                  },
              },
          },
      ],
  };
  chart.setOption(option);

  window.addEventListener("resize", () => {
      chart.resize();
  });
});