'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'

export default function InvoiceApproval() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [data, setData] = useState<any>(null)
  const [selectedPrices, setSelectedPrices] = useState<Record<string, { id: number, price: number }>>({})
  const [modalData, setModalData] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    axios
      .get(`/api/builds/${id}`)
      .then((response) => {
        setData(response.data)
        getModal(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch invoice:', error)
      })
  }, [id])

  const getModal = (fetchedData: any) => {
    const payload = {
      processor: fetchedData.processor,
      motherboard: fetchedData.motherboard,
      gpu: fetchedData.gpu,
      ram: fetchedData.ram,
      storage: fetchedData.storage,
      psu: fetchedData.psu,
      cooler: fetchedData.cooler,
      casing: fetchedData.casing,
      accessories1: fetchedData.accessories1,
      accessories2: fetchedData.accessories2,
      accessories3: fetchedData.accessories3,
      accessories4: fetchedData.accessories4,
      fan1: fetchedData.fan1,
      fan2: fetchedData.fan2,
      fan3: fetchedData.fan3,
      fan4: fetchedData.fan4,
    }
    axios
      .post('/api/modal', payload)
      .then((response) => {
        setModalData(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch modal:', error)
      })
  }

  const handlePriceChange = (category: string, id: number, price: number) => {
    setSelectedPrices((prev) => ({ ...prev, [category]: { id, price } }))
  }

  const renderPriceSelect = (category: string, prices: any[]) => {
    return prices.map((price: any) => (
      <option key={price.id} value={price.id}>
        {`Rp ${price.price.toLocaleString()} (Qty: ${price.quantity})`}
      </option>
    ))
  }

  const renderCategory = (category: string, label: string) => {
    if (!data[category]) return null // Skip rendering if data is empty or undefined
    return (
      <div className="p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{label}</h2>
        <ul>
          <li className="mb-2">
            <div>
              <strong>{label}:</strong> {data[category]}
            </div>
            <div>
              <label htmlFor={`${category}-price`} className="block text-sm">
                Select Price:
              </label>
              <select
                id={`${category}-price`}
                className="w-full p-2 border rounded text-black"
                value={selectedPrices[category]?.id || ''}
                onChange={(e) => {
                  const selectedPrice = modalData?.[`${category}Prices`]?.find(
                    (price: any) => price.id === Number(e.target.value)
                  )
                  if (selectedPrice) {
                    handlePriceChange(category, selectedPrice.id, selectedPrice.price)
                  }
                }}
              >
                <option value="">Select a price</option>
                {modalData && modalData[`${category}Prices`] && renderPriceSelect(`${category}Prices`, modalData[`${category}Prices`])}
              </select>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Build Details</h1>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Components */}
          <div>
            {['processor', 'motherboard', 'gpu', 'ram', 'storage', 'psu', 'cooler', 'casing']
              .filter((category) => data[category]) // Filter out empty categories
              .map((category) => renderCategory(category, category.charAt(0).toUpperCase() + category.slice(1)))}
          </div>

          {/* Accessories */}
          <div>
            {['accessories1', 'accessories2', 'accessories3', 'accessories4']
              .filter((category) => data[category]) // Filter out empty categories
              .map((category, index) => renderCategory(category, `Accessory ${index + 1}`))}
          </div>

          {/* Fans */}
          <div>
            {['fan1', 'fan2', 'fan3', 'fan4']
              .filter((category) => data[category]) // Filter out empty categories
              .map((category, index) => renderCategory(category, `Fan ${index + 1}`))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Button variant="success" onClick={() => console.log(selectedPrices)}>
        Approve Invoice
      </Button>
    </div>
  )
}
