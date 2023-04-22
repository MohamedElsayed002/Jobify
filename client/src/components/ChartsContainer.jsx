
import React , {useState} from 'react'
import BarChartComponent from '../pages/dashboard/BarChart'
import AreaChartComponent from '../pages/dashboard/AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'



const ChartsContainer =  () => {

    const [barChart , setBarChart] = useState(true)
    const {monthlyApplications : data} = useAppContext()

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type="button" onClick={() => setBarChart(!barChart)}>
                {barChart ? 'AreaChart' : 'BarChartComponent'}
            </button>
            {barChart ?      <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer