// import { useState } from "react"
// import styles from './ResponseChart.module.css'
import prisma from "@/lib/prisma"

// const getData = async (survey: string) => {
//   const response = await prisma.response.findMany()
//   return response.data.data
// }


  const surveyTitles = {
      structural: 'Structural',
      private: 'Private Applicator',
      mosquito: 'Mosquito Control',
      row: 'Right of Way',
      turf: 'Lawn/Turf Care',
      golf: 'Golf Course'
    } as const;
  
  type SurveyKey = keyof typeof surveyTitles;

const ResponseChart = ({survey}: {survey: SurveyKey | string}) => {

  
//   const [data, setData] = useState<any>(null)
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<any>(null)

//   useEffect(() => {
//     setLoading(true)
//     // getData(survey).then(data => {setData(data); setLoading(false)}).catch(err => {
//     //   console.error(err)
//     //   setLoading(false)
//     //   setError(err)
//     // }
//     // )
//   }, [survey])

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>
//   }

//   if (data.length === 0) {
//     return <div className={``}>
//       <span className={``}>{data.length}</span>
//       <p className={``}>No responses have been recorded for this survey in the online system.</p>
//       <p className={``}>{survey in surveyTitles ? surveyTitles[survey as SurveyKey] : survey}</p>
//     </div>
//   }
  return (
    <div className="text-black">ResponseChart</div>
  )
}

export default ResponseChart