"use client"

import { useQuery } from "@apollo/client"
import { Container, Title, Text, Grid, Loader, Center, Alert } from "@mantine/core"
import { AlertCircle } from "lucide-react"
import ProductCard from "../components/productCard"
import { ALL_PRODUCTS } from "../services/query"

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  title: string
  description: string
  price: number
  rentPerDay: number
  viewCount: number
  createdAt: string
  updatedAt: string
  ownerId: string
  categories: Category[]
}

interface AllProductsData {
  allProducts: Product[]
}

export default function ProductsPage() {
  const { data, loading, error } = useQuery<AllProductsData>(ALL_PRODUCTS)

  return (
    <Container size="xl" py="xl">
      <div className="mb-8">
        <Title order={1} mb="xs">
          All Products
        </Title>
        <Text c="dimmed">Browse our collection of available products and rentals</Text>
      </div>

      {error && (
        <Alert icon={<AlertCircle size={16} />} color="red" mb="lg">
          Failed to load products. Please try again later.
        </Alert>
      )}

      {loading ? (
        <Center py="xl">
          <Loader />
        </Center>
      ) : data?.allProducts && data.allProducts.length > 0 ? (
        <Grid gutter="lg">
          {data.allProducts.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                rentPerDay={product.rentPerDay}
                viewCount={product.viewCount}
                createdAt={product.createdAt}
                ownerId={product.ownerId}
                categories={product.categories}
              />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Center py="xl">
          <Text c="dimmed">No products found</Text>
        </Center>
      )}
    </Container>
  )
}
