"use client"

import { Modal, Stack, Text, Badge, Group, Divider, Button } from "@mantine/core"
// import { Calendar, Eye } from "lucide-react"
import { Eye } from "lucide-react"
// import { formatDistanceToNow } from "date-fns"

interface Category {
  id: string
  name: string
}

interface ProductDetailsModalProps {
  opened: boolean
  onClose: () => void
  title: string
  description: string
  price: number
  rentPerDay: number
  viewCount: number
  createdAt: string
  categories: Category[]
}

export default function ProductDetailsModal({
  opened,
  onClose,
  title,
  description,
  price,
  rentPerDay,
  viewCount,
//   createdAt,
  categories,
}: ProductDetailsModalProps) {
//   const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <Modal opened={opened} onClose={onClose} title={title} size="lg" centered>
      <Stack gap="md">
        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <Text size="sm" fw={600} mb="xs">
              Categories
            </Text>
            <Group gap="xs">
              {categories.map((category) => (
                <Badge key={category.id} variant="filled" size="md">
                  {category.name}
                </Badge>
              ))}
            </Group>
          </div>
        )}

        <Divider />

        {/* Price and Rent Information */}
        <div>
          <Text size="sm" fw={600} mb="xs">
            Pricing
          </Text>
          <Stack gap="xs">
            <Text size="sm">
              <span className="font-semibold">Purchase Price:</span> ${price.toFixed(2)}
            </Text>
            <Text size="sm">
              <span className="font-semibold">Daily Rental:</span> ${rentPerDay.toFixed(2)}
            </Text>
          </Stack>
        </div>

        <Divider />

        {/* Description */}
        <div>
          <Text size="sm" fw={600} mb="xs">
            Description
          </Text>
          <Text size="sm" c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
            {description}
          </Text>
        </div>

        <Divider />

        {/* Footer Information */}
        <Group justify="space-between">
          {/* <Group gap="xs">
            <Calendar size={16} className="text-gray-500" />
            <Text size="xs" c="dimmed">
              Posted {formattedDate}
            </Text>
          </Group> */}
          <Group gap="xs">
            <Eye size={16} className="text-gray-500" />
            <Text size="xs" c="dimmed">
              {viewCount} views
            </Text>
          </Group>
        </Group>

        {/* Close Button */}
        <Button fullWidth variant="light" onClick={onClose} mt="md">
          Close
        </Button>
      </Stack>
    </Modal>
  )
}
