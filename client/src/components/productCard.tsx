"use client"

import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  MultiSelect,
  ActionIcon,
  Menu,
  Loader,
} from "@mantine/core"
import { Eye, Calendar, Trash2, Edit2, MoreVertical } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { useAuth } from "../contexts/AuthContext"
import { EDIT_PRODUCT, DELETE_PRODUCT } from "../services/mutations"
import { ALL_PRODUCTS } from "../services/query"

interface Category {
  id: string
  name: string
}

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number
  rentPerDay: number
  viewCount: number
  createdAt: string
  ownerId: string
  categories: Category[]
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  rentPerDay,
  viewCount,
  createdAt,
  ownerId,
  categories,
}: ProductCardProps) {
  const { user } = useAuth()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPrice, setEditPrice] = useState(price)
  const [editRentPerDay, setEditRentPerDay] = useState(rentPerDay)
  const [editCategories, setEditCategories] = useState<string[]>(categories.map((c) => c.name))

  const [editProduct, { loading: editLoading }] = useMutation(EDIT_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
    onCompleted: () => {
      setEditModalOpen(false)
    },
  })

  const [deleteProduct, { loading: deleteLoading }] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
  })

  const isOwner = user && user.id == ownerId
//   console.log("Owner ID:", ownerId)
//   console.log("User ID:", user?.id)
//   console.log("Is Owner:", isOwner)

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  const handleEdit = async () => {
    try {
      await editProduct({
        variables: {
          productId: Number.parseInt(id),
          data: {
            title: editTitle,
            description: editDescription,
            price: editPrice,
            rentPerDay: editRentPerDay,
            categories: editCategories,
          },
        },
      })
    } catch (error) {
      console.error("Error editing product:", error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct({
          variables: {
            productId: Number.parseInt(id),
          },
        })
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  return (
    <>
      <Card withBorder shadow="md" p="lg" radius="md" className="h-full flex flex-col">
        <Stack gap="md" className="flex-1">
          {/* Title */}
          <div>
            <Text fw={700} size="lg" className="line-clamp-2">
              {title}
            </Text>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <Text size="sm" c="dimmed" mb="xs">
                Categories:
              </Text>
              <Group gap="xs">
                {categories.map((category) => (
                  <Badge key={category.id} variant="light" size="sm">
                    {category.name}
                  </Badge>
                ))}
              </Group>
            </div>
          )}

          {/* Price and Rent */}
          <div>
            <Text size="sm" fw={600}>
              Price: ${price.toFixed(2)} | Rent: ${rentPerDay.toFixed(2)} daily
            </Text>
          </div>

          {/* Description */}
          <Text size="sm" c="dimmed" className="line-clamp-3 flex-1">
            {description}
          </Text>

          {/* Footer Info */}
          <Group justify="space-between" mt="auto">
            <Group gap="xs">
              <Calendar size={16} className="text-gray-500" />
              <Text size="xs" c="dimmed">
                {formattedDate}
              </Text>
            </Group>
            <Group gap="xs">
              <Eye size={16} className="text-gray-500" />
              <Text size="xs" c="dimmed">
                {viewCount} views
              </Text>
            </Group>
          </Group>
        </Stack>

        {/* Action Buttons */}
        <Group grow mt="md" gap="xs">
          <Button fullWidth variant="light">
            View Details
          </Button>
          
          {isOwner && (
            <Menu shadow="md" position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="light" color="gray">
                  <MoreVertical size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<Edit2 size={14} />} onClick={() => setEditModalOpen(true)}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<Trash2 size={14} />}
                  color="red"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? <Loader size={14} /> : "Delete"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Card>

      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Product" size="lg">
        <Stack gap="md">
          <TextInput
            label="Title"
            placeholder="Product title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.currentTarget.value)}
          />
          <Textarea
            label="Description"
            placeholder="Product description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.currentTarget.value)}
            minRows={3}
          />
          <NumberInput
            label="Price"
            placeholder="Product price"
            value={editPrice}
            onChange={(val) => setEditPrice(val as number)}
            min={0}
            step={0.01}
          />
          <NumberInput
            label="Rent Per Day"
            placeholder="Daily rental price"
            value={editRentPerDay}
            onChange={(val) => setEditRentPerDay(val as number)}
            min={0}
            step={0.01}
          />
          <MultiSelect
            label="Categories"
            placeholder="Select categories"
            data={["ELECTRONICS", "FURNITURE", "SPORTING_GOODS", "OUTDOOR", "OTHER"]}
            value={editCategories}
            onChange={setEditCategories}
            searchable
            clearable
          />
          <Group justify="flex-end" gap="xs">
            <Button variant="light" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} loading={editLoading}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
