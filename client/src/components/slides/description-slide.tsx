"use client"

import { Textarea, Stack, Text } from "@mantine/core"

interface DescriptionSlideProps {
  description: string
  onDescriptionChange: (description: string) => void
}

export default function DescriptionSlide({ description, onDescriptionChange }: DescriptionSlideProps) {
  return (
    <Stack gap="lg">
      <div>
        <Text fw={600} mb="sm">
          Product Description
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Provide detailed information about your product
        </Text>
      </div>
      <Textarea
        placeholder="Describe your product in detail..."
        label="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.currentTarget.value)}
        minRows={6}
        required
      />
    </Stack>
  )
}
