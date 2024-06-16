import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import "./Chart.css";
import ClearIcon from '@mui/icons-material/Clear';
import { CategoryScale, LinearScale, BarElement, Title} from 'chart.js';
import DialogContent from "@mui/material/DialogContent";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement, Title);
const  Charts=  (props) => {
        const data =  axios.get(
                "http://localhost:8080/api/customer/analyticsView"
              );
              console.log(data.data);
        const pie = {
                labels: ['USD', 'CAD'],
                datasets: [
                {
                label: 'Invoice Currency',
                data: [44710, 3869],
                backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        
                ],
                borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
                },
                ],
        };
        
        const options = {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' ,
                  },
                  title: {
                    display: true,
                    text: 'Chart.js Bar Chart',
                  },
                },
              };
              
              const labels = ["Business1", "Business2", "Business3", "Business4", "Business5", "Business6"];
              
              const bar = {
                labels,
                datasets: [
                  {
                    label: 'No. of Customers',
                    data: [100, 200, 200, 600, 300, 500, 900],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Total Open Amount',
                    data: [300, 800, 200, 500, 700, 100, 400],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ],
              };
              
        return(
                <React.Fragment>
                        <DialogContent>
                        <div>
                                <Button
                                        onClick={props.chartClose}
                                        style={{ borderColor: "black" }}
                                >
                                        <ClearIcon style={{ color: "black" }}>CANCEL</ClearIcon>
                                </Button>
                                <h6 className="headview">Analytical View</h6>
                                <Box
                                alignItems="center"
                                component="form"
                                noValidate
                                sx={{
                                display: "grid",
                                gridTemplateColumns: { sm: "1fr 1fr" },
                                gap: 1,
                                }}
                                >
                                <div className="piechart">
                                        <Pie data={pie} />
                                </div>
                                <div className="barchart">
                                        <Bar options={options} data={bar}  />
                                </div>
                                </Box>
                        </div> 
                        </DialogContent>
                </React.Fragment>
                );
};

export default Charts;