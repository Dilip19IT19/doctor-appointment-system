import React from 'react'

interface Iprop{
  params:{
    record:string
  }
}
function DetailsPage({params}:Iprop) {
  return (
    <div>
      <p>This is detail page and the Id is : {params.record}</p>
    </div>
  )
}

export default DetailsPage