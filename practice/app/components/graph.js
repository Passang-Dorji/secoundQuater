
import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';

const Graph = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            try {
                const response = await fetch('/api/expenses');
                if (!response.ok) {
                    throw new Error("Network response was not okay");
                }
                const { data } = await response.json();
                
                const yValues = data.map((expense) => expense.amount); // Extract amount from each expense object
                const xValues = data.map((expense) => expense.created_at);

                const graphData = [{
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: { color: 'blue' },
                }];

                setExpenses(graphData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        getExpenses();
    }, []);

    const layout = useMemo(() =>({
              title: 'Expenses Over Time',
              yaxis: {
                  title: 'Amount Spent',
              },
              xaxis: {
                  title: 'Date',
                  type: 'date',
                  nticks:10,
                  gridcolor: 'rgba(0, 0, 255, 0.1)',
              },
          }),[]) 

    return <Plot data={expenses} layout={layout} />;
};

export default Graph;
