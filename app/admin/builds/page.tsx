'use client'

import { useState, useMemo, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, Search } from 'lucide-react'
import axios from 'axios'
import { BuildDialog } from './build-dialog'


const statusOptions = ['all', 'Not Approved', 'in-progress', 'completed', 'cancelled']

const getBadgeVariant = (status: string) => {
  switch (status) {
    case 'Not Approved':
      return 'outline'
    case 'in-progress':
      return 'default'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'destructive'
    default:
      return 'secondary'
  }
}

interface PcBuild {
    id: string;
    status: string;
    totalPrice: number;
    createdAt: string;
  }
  

export default function AdminPage() {

  const getId = (id: string) => {
    return id.replace(/\D/g, "");
    } 

  const [initialPcBuilds, setInitialPcBuilds] = useState<PcBuild[]>([])
  const [pcBuilds, setPcBuilds] = useState(initialPcBuilds)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof initialPcBuilds[0] | null, direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' })
  const [openDialog, setOpenDialog] = useState('')

  const handleSort = (key: keyof typeof initialPcBuilds[0]) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }))
  }

  function isEmpty(str : string) {
    return (!str || str.length === 0 );
}

  const getData = () => {
    axios
      .get(`/api/builds`)
      .then((response) => {
        // cast id to string
        const data = response.data.map((build: any) => ({ ...build, id: "RKTN"+build.id.toString() }))
        setInitialPcBuilds(data)
        setPcBuilds(data)
        console.log(data)
    })
      .catch((error) => console.error("Error fetching data:", error))
  }

    useEffect(() => {
        getData()
       
    }, [])


  const filteredAndSortedData = useMemo(() => {
    return pcBuilds
      .filter((build) => 
        build.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'all' || build.status === statusFilter)
      )
      .sort((a, b) => {
        if (sortConfig.key === null) return 0
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1
        return 0
      })
  }, [pcBuilds, searchTerm, statusFilter, sortConfig])

  const handleStatusChange = (buildId: string, newStatus: string) => {
    console.log(`put to /api/builds/${getId(buildId)}/status with status ${newStatus}`)
    axios.put(`/api/builds/${getId(buildId)}/status`, { status: newStatus }).then(() => {
        setPcBuilds(prevBuilds => 
        prevBuilds.map(build => 
            build.id === buildId ? { ...build, status: newStatus } : build
        )
        )
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">builds</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search by Build ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 text-black"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" onClick={() => handleSort('id')}>
                Build ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('totalPrice')}>
                Total Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('createdAt')}>
                Time
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedData.map((build) => (
            <TableRow key={build.id}>
              <TableCell className="font-medium">
                
                <Button variant="link" onClick={() => setOpenDialog(getId(build.id))}>
                {build.id}
                </Button>

              </TableCell>
              <TableCell>
                <Select 
                  value={build.status} 
                  onValueChange={(value) => handleStatusChange(build.id, value)}
                >
                  <SelectTrigger className="w1/2">
                    <SelectValue>
                      <Badge variant={getBadgeVariant(build.status)}>
                        {build.status}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.filter(status => status !== 'all').map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{build.totalPrice.toLocaleString()}</TableCell>
              <TableCell>{new Date(build.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

        <BuildDialog isOpen={!isEmpty(openDialog)} onClose={() => setOpenDialog("")} id={openDialog} />
    </div>
  )
}

