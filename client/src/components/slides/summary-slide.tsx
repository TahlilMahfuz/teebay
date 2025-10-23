"use client"

import { Stack, Text, Card, Badge, Grid, Group } from "@mantine/core"

interface SummarySlideProps {
  title: string
  categories: string[]
  description: string
  price: number | string
  rentPerDay: number | string
}

export default function SummarySlide({ title, categories, description, price, rentPerDay }: SummarySlideProps) {
  return (
    <Stack gap="lg">
      <div>
        <Text fw={600} mb="sm">
          Review Your Product
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Please review all the information before submitting
        </Text>
      </div>

      <Card withBorder padding="lg" radius="md">
        <Stack gap="md">
          <div>
            <Text size="sm" c="dimmed" mb="xs">
              Title
            </Text>
            <Text fw={500}>{title || "Not provided"}</Text>
          </div>

          <div>
            <Text size="sm" c="dimmed" mb="xs">
              Categories
            </Text>
            <Group gap="xs">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Badge key={cat} variant="light">
                    {cat}
                  </Badge>
                ))
              ) : (
                <Text size="sm">No categories selected</Text>
              )}
            </Group>
          </div>

          <div>
            <Text size="sm" c="dimmed" mb="xs">
              Description
            </Text>
            <Text size="sm">{description || "Not provided"}</Text>
          </div>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <div>
                <Text size="sm" c="dimmed" mb="xs">
                  Price
                </Text>
                <Text fw={500}>${price || "0"}</Text>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <div>
                <Text size="sm" c="dimmed" mb="xs">
                  Rent Per Day
                </Text>
                <Text fw={500}>${rentPerDay || "0"}/day</Text>
              </div>
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>
    </Stack>
  )
}
