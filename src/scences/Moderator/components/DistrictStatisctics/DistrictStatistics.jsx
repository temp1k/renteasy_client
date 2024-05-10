import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getStatisticsAPI} from "../../api/usersAPI.js";
import {getErrorText} from "../../../../utils/helpers.js";
import {Pie} from "react-chartjs-2"
import {CenterLoading} from "../../../../feutures/index.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './statisctics.css'
import {COLORS} from "../../../../utils/consts/colors.js";



function getPropertyFromArray(array, propertyName, label) {
    return array.map(obj => label ? `${obj[propertyName]} ${label}` : obj[propertyName]);
}

function generateArrayColors(count) {
    let colors = []
    for (let i = 0; i < count; i++) {
        colors.push(COLORS[i])
    }
    return colors
}

ChartJS.register(ArcElement, Tooltip, Legend);

const DistrictStatistics = props => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStatisticsAPI()
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                alert(getErrorText(err))
            })
    }, []);

    useEffect(() => {
        console.log(state)
    }, [data]);

    const state = {
        labels: getPropertyFromArray(data, 'name', 'округ'),
        datasets: [
            {
                label: 'Количество публикаций',
                backgroundColor: generateArrayColors(data.length),
                borderColor: 'rgb(7,0,0)',
                borderWidth: 2,
                data: getPropertyFromArray(data, 'count')
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                fontSize: '10px',
            },
            title: {
                text: 'Lorem',
                display: true,
                fontSize: '20px',
            }
        }
    }

    return (
        <div className='pie_container'>
            <p>Диаграмма публикаций по округам</p>
            {loading ?
                <div>
                    <CenterLoading/>
                </div>
                :
                <Pie
                data={state}
                options={options}
                />
            }
        </div>
    );
};

DistrictStatistics.propTypes = {};

export default DistrictStatistics;