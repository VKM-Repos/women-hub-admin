import React from 'react'

type Props = {
  data: any;
  filter: Function;
};

const TicketsButtons = ({data, filter}: Props) => {
  console.log(data)
  return (
    <button onClick={()=> filter(data.title)} className={`px-8 py-2 bg-inherit font-medium border-2 border-t-white border-r-white border-l-white ${data.isActive? "border-b-textPrimary" : "border-b-white"}`}>{data.title}</button >
  )
}

export default TicketsButtons