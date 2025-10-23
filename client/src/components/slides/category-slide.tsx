"use client"

import { MultiSelect, Stack, Text, Loader, Center } from "@mantine/core"
import { useQuery } from "@apollo/client"
import { ALL_CATEGORIES } from "../../services/query"

interface Category {
  id: string
  name: string
}

interface AllCategoriesData {
  allCategories: Category[]
}

interface CategorySlideProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
}

export default function CategorySlide({ selectedCategories, onCategoriesChange }: CategorySlideProps) {
  const { data, loading } = useQuery<AllCategoriesData>(ALL_CATEGORIES)

  const categoryOptions =
    data?.allCategories.map((cat) => ({
      value: cat.name,
      label: cat.name,
    })) || []

  return (
    <Stack gap="lg">
      <div>
        <Text fw={600} mb="sm">
          Select Categories
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Choose one or more categories for your product
        </Text>
      </div>
      {loading ? (
        <Center py="xl">
          <Loader size="sm" />
        </Center>
      ) : (
        <MultiSelect
          label="Categories"
          placeholder="Select categories"
          data={categoryOptions}
          value={selectedCategories}
          onChange={onCategoriesChange}
          searchable
          clearable
        />
      )}
    </Stack>
  )
}
