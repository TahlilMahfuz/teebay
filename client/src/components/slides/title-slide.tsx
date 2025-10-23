"use client"

import { TextInput, Stack, Text } from "@mantine/core"

interface TitleSlideProps {
  title: string
  onTitleChange: (title: string) => void
}

export default function TitleSlide({ title, onTitleChange }: TitleSlideProps) {
  return (
    <Stack gap="lg">
      <div>
        <Text fw={600} mb="sm">
          Product Title
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Enter a clear and descriptive title for your product
        </Text>
      </div>
      <TextInput
        placeholder="e.g., Gaming Laptop Pro 2025"
        label="Title"
        value={title}
        onChange={(e) => onTitleChange(e.currentTarget.value)}
        required
      />
    </Stack>
  )
}
