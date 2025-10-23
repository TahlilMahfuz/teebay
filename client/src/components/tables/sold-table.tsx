"use client"

import { Table, Badge, Text, Group, Stack, Loader, Center, Alert } from "@mantine/core"
import { AlertCircle } from "lucide-react"
import { useQuery } from "@apollo/client"
import { GET_USER_ACTIVITY } from "../../services/query"
import { formatDate } from "../../lib/utils"

interface Product {
  id: string
  title: string
  description: string
  price: number
  rentPerDay: number
  viewCount: number
  createdAt: string
  buyer: {
    id: string
    firstname: string
    lastname: string
    email: string
  }
  categories: Array<{
    id: string
    name: string
  }>
}

interface UserActivityData {
  getUserActivity: {
    soldProducts: Product[]
  }
}

export default function SoldProductsTable() {
  const { data, loading, error } = useQuery<UserActivityData>(GET_USER_ACTIVITY)

  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    )
  }

  if (error) {
    return (
      <Alert icon={<AlertCircle size={16} />} color="red">
        Failed to load sold products. Please try again later.
      </Alert>
    )
  }

  const products = data?.getUserActivity?.soldProducts || []

  if (products.length === 0) {
    return (
      <Center py="xl">
        <Text c="dimmed">No sold products yet</Text>
      </Center>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Product</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Buyer</Table.Th>
            <Table.Th>Categories</Table.Th>
            <Table.Th>Views</Table.Th>
            <Table.Th>Sold</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {products.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <Stack gap={0}>
                  <Text fw={500} size="sm">
                    {product.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {product.description.substring(0, 50)}...
                  </Text>
                </Stack>
              </Table.Td>
              <Table.Td>
                <Text fw={500}>${product.price}</Text>
              </Table.Td>
              <Table.Td>
                <Stack gap={0}>
                  <Text size="sm">
                    {product.buyer.firstname} {product.buyer.lastname}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {product.buyer.email}
                  </Text>
                </Stack>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  {product.categories.map((cat) => (
                    <Badge key={cat.id} size="sm" variant="light">
                      {cat.name}
                    </Badge>
                  ))}
                </Group>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{product.viewCount}</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{formatDate(product.createdAt)}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}
