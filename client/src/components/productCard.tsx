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
  Menu,
  Loader,
} from "@mantine/core"
import { Eye, Calendar, Trash2, Edit2 } from "lucide-react"
// import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { useAuth } from "../contexts/AuthContext"
import { EDIT_PRODUCT, DELETE_PRODUCT, UPDATE_VIEW_COUNT } from "../services/mutations"
import { ALL_PRODUCTS } from "../services/query"
import ProductDetailsModal from "../components/productDetailsModal"
import { notifications } from "@mantine/notifications"

interface Category {
  id: string
  name: string
}

interface Rentals{
  id: string
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
  categories: Category[],
  isSold?: boolean
  rentals?: Rentals[]
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
  isSold,
  rentals
}: ProductCardProps) {
  const { user } = useAuth()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPrice, setEditPrice] = useState(price)
  const [editRentPerDay, setEditRentPerDay] = useState(rentPerDay)
  const [editCategories, setEditCategories] = useState<Category[]>(
    categories?.filter(c => c.name)?.map(c => ({ id: c.id, name: c.name })) || [],
  );


  const [editProduct, { loading: editLoading }] = useMutation(EDIT_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setEditModalOpen(false)
    },
  })

  const [deleteProduct, { loading: deleteLoading }] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setDeleteConfirmOpen(false)
    },
  })

  const [updateViewCount] = useMutation(UPDATE_VIEW_COUNT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
  })

  const isOwner = user && user.id == ownerId


const handleEdit = async () => {
  try {
    const { data } = await editProduct({
      variables: {
        productId: Number(id),
        data: {
          title: editTitle,
          description: editDescription,
          price: editPrice,
          rentPerDay: editRentPerDay,
          categories: editCategories.map(c => c.name),
        },
      },
    });
    if (data?.editProduct) {
      setEditTitle(data.editProduct.title);
      setEditDescription(data.editProduct.description);
      setEditPrice(data.editProduct.price);
      setEditRentPerDay(data.editProduct.rentPerDay);
      setEditCategories(data.editProduct.categories.map((c: Category) => c.name));
    }

    notifications.show({
      message: `Product ${id} updated successfully!`,
      color: "green",
    });

  } catch (error) {
    console.error("Error editing product:", error);

    notifications.show({
      message: `Failed to edit product ${id}`,
      color: "red",
    });
  }
};

const handleDelete = async () => {
  try {
    await deleteProduct({
      variables: { deleteProductId: Number(id) },
    });

    notifications.show({
      message: `Product ${id} deleted successfully!`,
      color: "green",
    });

    console.log("Product deleted successfully", id);

  } catch (error) {
    console.error("Error deleting product:", error);

    notifications.show({
      message: `Failed to delete product ${id}`,
      color: "red",
    });
  }
};


  const handleViewDetails = async () => {
    try {
      // console.log("rentals",rentals)
      await updateViewCount({
        variables: {
          updateViewCountId: Number(id),
        },
      })
      setDetailsModalOpen(true)
    } catch (error) {
      console.error("Error updating view count:", error)
      setDetailsModalOpen(true)
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
                {createdAt ? new Date(createdAt).toDateString() : "No date"}
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
          <Menu shadow="md" position="bottom-end">
            <Menu.Target>
              <Button fullWidth variant="light">
                Actions
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<Eye size={14} />} onClick={handleViewDetails}>
                View Details
              </Menu.Item>
              {isOwner && (
                <>
                  <Menu.Divider />
                  <Menu.Item leftSection={<Edit2 size={14} />} onClick={() => setEditModalOpen(true)}>
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<Trash2 size={14} />}
                    color="red"
                    onClick={() => setDeleteConfirmOpen(true)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? <Loader size={14} /> : "Delete"}
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
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
            data={["ELECTRONICS", "FURNITURE", "SPORTING GOODS", "OUTDOOR", "TOYS", "HOME APPLIANCES"]}
            value={editCategories.map(c => c.name).filter(Boolean)}
            onChange={(values) => {
              const newCats = values
                .filter((v): v is string => !!v) // only non-empty strings
                .map((name, index) => ({ id: `${index}`, name }));
              setEditCategories(newCats);
            }}

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

      <Modal opened={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} title="Delete Product" size="sm">
        <Stack gap="md">
          <Text>Are you sure you want to delete this product? This action cannot be undone.</Text>
          <Group justify="flex-end" gap="xs">
            <Button variant="light" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} loading={deleteLoading}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>

      <ProductDetailsModal
        opened={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title={title}
        description={description}
        price={price}
        rentPerDay={rentPerDay}
        viewCount={viewCount}
        createdAt={createdAt}
        categories={categories}
        productId={Number(id)}
        ownerId={Number(ownerId)}
        isSold={isSold}
        rentals={rentals}
      />
    </>
  )
}
