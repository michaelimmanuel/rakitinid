'use client'
 
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
 
export default function InvoiceApproval() {
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id')
  const [buildData, setBuildData] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    axios.get(`/api/builds/${id}`).then((response) => {
      console.log(response.data)
      setBuildData(response.data)
    }).catch((error) => {
      console.error('Failed to fetch invoice:', error)
    })
  }, [id])

  
 
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold ml-4">Invoice Approval</h1>
      <p className="text-sm ml-2">ID: {id}</p>
    </div>
  )

}