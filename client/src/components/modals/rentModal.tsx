"use client"

import { Modal, Stack, Group, Button, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

interface RentDateModalProps {
  opened: boolean
  onClose: () => void
  onConfirm: (startDate: Date, endDate: Date) => void
  rentPerDay: number
}

export default function RentDateModal({ opened, onClose, onConfirm, rentPerDay }: RentDateModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleConfirm = () => {
    if (startDate && endDate) {
      if (endDate <= startDate) {
        notifications.show({
          message: "End date must be after start date",
          color: "red",
        });
        return
      }
      onConfirm(startDate, endDate)
      setStartDate(null)
      setEndDate(null)
    }
  }

  const calculateDays = () => {
    if (startDate && endDate) {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      return days > 0 ? days : 0
    }
    return 0
  }

  const totalCost = calculateDays() * rentPerDay

  return (
    <Modal opened={opened} onClose={onClose} title="Select Rental Dates" centered>
      <Stack gap="md">
        <DateInput
          label="Start Date"
          placeholder="Pick start date"
          value={startDate}
          onChange={setStartDate}
          minDate={new Date()}
        />

        <DateInput
          label="End Date"
          placeholder="Pick end date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate || new Date()}
        />

        {startDate && endDate && (
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Rental Summary
            </Text>
            <Text size="sm">
              Duration: {calculateDays()} day{calculateDays() !== 1 ? "s" : ""}
            </Text>
            <Text size="sm">Daily Rate: ${rentPerDay.toFixed(2)}</Text>
            <Text size="sm" fw={600} c="blue">
              Total Cost: ${totalCost.toFixed(2)}
            </Text>
          </Stack>
        )}

        <Group justify="flex-end" gap="sm">
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!startDate || !endDate}>
            Continue
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
