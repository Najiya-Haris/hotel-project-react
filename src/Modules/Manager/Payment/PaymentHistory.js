import React from 'react'
import Tables from '../../../Components/Tables';

function PaymentHistory() {
    const columns = [
        {
          title: 'date',
          dataIndex: 'date',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'totalorder',
    
          dataIndex: 'totalorder',
        },
        {
          title: 'totalprice',
          dataIndex: 'totalprice',
        }, 
      ]
    
      const PaymentData = [
        { date: '12/02/24', totalorder: 2, totalprice: 10, },
        { date: '12/02/24', totalorder: 3, totalprice: 15,  },
        { date: '12/02/24', totalorder: 1, totalprice: 8, },
       
      ];
      
  return (
   <Tables  columns={columns} dataSource={PaymentData} />
  )
}

export default PaymentHistory