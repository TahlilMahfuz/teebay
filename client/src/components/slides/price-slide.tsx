"use client"

import { NumberInput, Stack, Text, Grid } from "@mantine/core"

interface PriceSlideProps {
  price: number | string
  rentPerDay: number | string
  onPriceChange: (price: number | string) => void
  onRentPerDayChange: (rentPerDay: number | string) => void
}

export default function PriceSlide({ price, rentPerDay, onPriceChange, onRentPerDayChange }: PriceSlideProps) {
  return (
    <Stack gap="lg">
      <div>
        <Text fw={600} mb="sm">
          Pricing Information
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Set the price and daily rental rate for your product
        </Text>
      </div>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <NumberInput
            label="Price"
            placeholder="Enter price"
            value={price}
            onChange={onPriceChange}
            min={0}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <NumberInput
            label="Rent Per Day"
            placeholder="Enter daily rental rate"
            value={rentPerDay}
            onChange={onRentPerDayChange}
            min={0}
            required
          />
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
