// get data from data.json file
const getData = async(url) => {
    const res = await fetch(url);
    const data = await res.json();
    const chartDays = [];
    const chartAmount = [];
    data.map(day => {
        chartDays.push(day.day);
        chartAmount.push(day.amount);
    })
    main(data, chartDays, chartAmount);
}

const main = (chartData, chartDays, chartAmount) => {

    const chart = document.getElementById("myChart");

    // data
    const data = {
        labels: chartDays,
        datasets: [{
            label: "",
            data: chartAmount,
            backgroundColor: ['#ec775f', '#ec775f', '#ec775f', '#ec775f', '#ec775f', '#ec775f', '#ec775f'],
            hoverBackgroundColor: ['#ebab9f', '#ebab9f', '#ebab9f', '#ebab9f', '#ebab9f', '#ebab9f', '#ebab9f'],
            borderRadius: 4,
            borderSkipped: false, // makes the bottom of the bars get the border radius effect as well
            barThickness: window.innerWidth > 800 ? 50 : 34,
        }]
    }

    // set appropriate bar thickness value based on screen width
    const handleResize = () => {
        data.datasets[0].barThickness = window.innerWidth > 800 ? 50 : 34;
    }

    window.addEventListener('resize', handleResize);

    // tooltips - customizing the tooltip's appearance
    const titleTooltip = (tooltipItems) => {
        return `$${tooltipItems[0].raw}`;
    }

    const labelTooltip = (tooltipItems) => {
        return '';
    }

    // config
    const config = {
        type: "bar",
        data: data,
        options: {
            scales: {
                x: {
                    // making x axis grid lines not appear
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    // customizing the text below the bars in the x axis
                    ticks: {
                        color: '#93867b',
                        font: {
                            family: "'DM Sans', sans-serif"
                        },
                    },
                },
                y: {
                    // making x axis grid lines not appear
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    // making text on the y axis not appear
                    ticks: {
                        display: false,
                        padding: 0

                    }
                },
            },
            plugins: {
                //the box above the chart showing what the chart is about and the color of the bars
                legend: {
                    labels: {
                        boxWidth: 0,
                        boxHeight: 0
                    }
                },
                tooltip: {
                    yAlign: 'bottom', // making caret pointer of tooltip start from the bottom
                    displayColors: false, // disabling displaying color in the tooltip on hover
                    titleMarginBottom: 0,
                    // customizing tooltip to my liking
                    callbacks: {
                        title: titleTooltip,
                        label: labelTooltip
                    },
                    caretSize: 0, // removing caret pointer
                    caretPadding: 5, // adding space between bar and tooltip
                }
            },
            maintainAspectRatio: false, // makes possible to resize chart to whatever width and height you want to
            // onClick of the bar change the background color of the bar clicked and it's hover color
            onClick: function(e) {
                // getting bar clicked
                const element = myChart.getElementsAtEventForMode(e, 'nearest', 'nearest', { intersect: true }, false);
                const elementIndex = element[0].index;
                const barsBackgroundColor = data.datasets[0].backgroundColor;
                const hoverBackgroundColor = data.datasets[0].hoverBackgroundColor;
                for (var i = 0; i < barsBackgroundColor.length; i++) {
                    barsBackgroundColor[i] = '#ec775f';
                    hoverBackgroundColor[i] = '#ebab9f';
                }
                barsBackgroundColor[elementIndex] = '#76b5bc';
                hoverBackgroundColor[elementIndex] = '#b5e2e7';
                myChart.update();
            },
            // onHover to bar turn cursor to pointer 
            onHover: (e, chart) => {
                e.native.target.style.cursor = chart[0] ? 'pointer' : 'default';
            },
        }
    };

    const myChart = new Chart(chart, config);

    return myChart;
}


getData("./data.json");