"use client"

import { Modal, Stack, Text, Badge, Group, Divider, Button } from "@mantine/core"
import { Eye } from "lucide-react"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PRODUCTS } from "../services/query"
import { PURCHASE_PRODUCT, RENT_PRODUCT} from "../services/mutations"
import RentDateModal from "./modals/rentModal"
import { useAuth } from "../contexts/AuthContext"
import { notifications } from "@mantine/notifications"
import { ApolloError } from "@apollo/client"

interface Category {
  id: string
  name: string
}

interface Rentals{
  id: string
  startDate: string 
  endDate: string
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
  isSold?: boolean
  rentals?: Rentals[]
  productId: number
  ownerId: number
}

export default function ProductDetailsModal({
  opened,
  onClose,
  title,
  description,
  price,
  rentPerDay,
  viewCount,
  categories,
  productId,
  ownerId,
  isSold,
  rentals
}: ProductDetailsModalProps) {
  const { user } = useAuth()
  const [rentDateModalOpened, setRentDateModalOpened] = useState(false)
  const [showBuyConfirm, setShowBuyConfirm] = useState(false)
  const [showRentConfirm, setShowRentConfirm] = useState(false)
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date
    endDate: Date
  } | null>(null)

  const [purchaseProduct, { loading: purchaseLoading }] = useMutation(PURCHASE_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
    awaitRefetchQueries: true,
  })

  const [rentProduct, { loading: rentLoading }] = useMutation(RENT_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
    awaitRefetchQueries: true,
  })

  const handleBuyClick = () => {
    setShowBuyConfirm(true)
  }

  const handleConfirmBuy = async () => {
    try {
      await purchaseProduct({
        variables: {
          productId,
        },
      })
      setShowBuyConfirm(false)
      onClose()
      notifications.show({
        message: "Product purchased successfully!",
        color: "green",
      });
    }
    catch (err) {
      const error = err as ApolloError;

      // Grab the first GraphQL error message if available
      const message =
      error.graphQLErrors?.[0]?.message || error.message || "Failed to purchase product";

      console.error("Purchase error:", message);

      notifications.show({
        message,
        color: "red",
      });
    }
  }

  const handleRentClick = () => {
    setRentDateModalOpened(true)
  }

  const handleRentDateConfirm = (startDate: Date, endDate: Date) => {
    setSelectedDates({ startDate, endDate })
    setRentDateModalOpened(false)
    setShowRentConfirm(true)
  }

  const handleConfirmRent = async () => {
    if (!selectedDates) return

    try {
      await rentProduct({
        variables: {
          data: {
            productId,
            startDate: selectedDates.startDate.toISOString(),
            endDate: selectedDates.endDate.toISOString(),
          },
        },
      })
      setShowRentConfirm(false)
      setSelectedDates(null)
      onClose()
      notifications.show({
        message: "Product rented successfully!",
        color: "green",
      });
    } catch (err) {
      const error = err as ApolloError;
      const message =
      error.graphQLErrors?.[0]?.message || error.message || "Failed to purchase product";
      console.error("Rental error:", error)
      notifications.show({
        message: `Failed to rent product: ${message}`,
        color: "red",
      });
    }
  }

  const isRented = rentals && rentals.length > 0
  const isOwner = Number(user?.id) === ownerId
  const canBuyOrRent = !isOwner && !isSold

  return (
    <>
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
            <Text>
              ID: {productId}
            </Text>
            <Text size="lg" fw={600} mb="xs">
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
            <Group gap="xs">
              <Eye size={16} className="text-gray-500" />
              <Text size="xs" c="dimmed">
                {viewCount} views
              </Text>
            </Group>
          </Group>

          <Group grow>
            {canBuyOrRent && (
              <>
                <Button onClick={handleBuyClick} loading={purchaseLoading} disabled={purchaseLoading || rentLoading}>
                  Buy Now
                </Button>
                <Button
                  onClick={handleRentClick}
                  variant="light"
                  loading={rentLoading}
                  disabled={purchaseLoading || rentLoading}
                >
                  Rent
                </Button>
              </>
            )}
            {isOwner && (
              <Text size="sm" c="dimmed" ta="center">
                You own this product
              </Text>
            )}
            {isSold && (
              <Text size="sm" c="red" ta="center">
                This product has been sold
              </Text>
            )}
            {/* {isRented && (
              <Text size="sm" c="orange" ta="center">
                This product is currently rented
              </Text>
            )} */}
            {isRented && rentals && rentals.length > 0 && (() => {
              const now = new Date();

              // Find the active rental where today is between start and end date
              const activeRental = rentals.find((rental) => {
                const start = new Date(rental.startDate);
                const end = new Date(rental.endDate);
                return now >= start && now <= end;
              });

              if (!activeRental) return null; // No currently active rental

              const start = new Date(activeRental.startDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const end = new Date(activeRental.endDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div style={{ marginTop: "8px" }}>
                  <Text size="sm" c="orange" ta="center" fw={500}>
                    This product is currently rented
                  </Text>
                  <Text size="sm" ta="center" c="dimmed">
                    From {start} to {end}
                  </Text>
                </div>
              );
            })()}

          </Group>

          {/* Close Button */}
          <Button fullWidth variant="light" onClick={onClose} mt="md">
            Close
          </Button>
        </Stack>
      </Modal>

      {/* Buy Confirmation Modal */}
      <Modal opened={showBuyConfirm} onClose={() => setShowBuyConfirm(false)} title="Confirm Purchase" centered>
        <Stack gap="md">
          <Text>
            Are you sure you want to purchase <strong>{title}</strong> for <strong>${price.toFixed(2)}</strong>?
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="light" onClick={() => setShowBuyConfirm(false)} disabled={purchaseLoading}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBuy} loading={purchaseLoading} color="green">
              Confirm Purchase
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Rent Date Selection Modal */}
      <RentDateModal
        opened={rentDateModalOpened}
        onClose={() => setRentDateModalOpened(false)}
        onConfirm={handleRentDateConfirm}
        rentPerDay={rentPerDay}
      />

      {/* Rent Confirmation Modal */}
      <Modal opened={showRentConfirm} onClose={() => setShowRentConfirm(false)} title="Confirm Rental" centered>
        <Stack gap="md">
          {selectedDates && (
            <>
              <Text>
                Are you sure you want to rent <strong>{title}</strong>?
              </Text>
              <Stack gap="xs">
                <Text size="sm">
                  <span className="font-semibold">Start Date:</span> {selectedDates.startDate.toLocaleDateString()}
                </Text>
                <Text size="sm">
                  <span className="font-semibold">End Date:</span> {selectedDates.endDate.toLocaleDateString()}
                </Text>
                <Text size="sm">
                  <span className="font-semibold">Duration:</span>{" "}
                  {Math.ceil(
                    (selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) / (1000 * 60 * 60 * 24),
                  )}{" "}
                  days
                </Text>
                <Text size="sm" fw={600} c="blue">
                  <span className="font-semibold">Total Cost:</span> $
                  {(
                    Math.ceil(
                      (selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) / (1000 * 60 * 60 * 24),
                    ) * rentPerDay
                  ).toFixed(2)}
                </Text>
              </Stack>
            </>
          )}
          <Group justify="flex-end" gap="sm">
            <Button
              variant="light"
              onClick={() => {
                setShowRentConfirm(false)
                setSelectedDates(null)
              }}
              disabled={rentLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmRent} loading={rentLoading} color="green">
              Confirm Rental
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
