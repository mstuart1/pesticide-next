import ResponseChart from '../ui/response-chart'


const AdminDash = () => {
  return (
    <div className={"min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16"}>
      <ResponseChart survey="structural"/>
      <ResponseChart survey="private"/>
      <ResponseChart survey="mosquito"/>
      <ResponseChart survey="row"/>
      <ResponseChart survey="turf"/>
      <ResponseChart survey="golf"/>
    </div>
  )
}

export default AdminDash