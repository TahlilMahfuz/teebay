"use client";

import {
  Table,
  Badge,
  Text,
  Group,
  Stack,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_USER_ACTIVITY } from "../../services/query";
import { formatDate } from "../../lib/utils";

interface Rental {
  id: string;
  productId: string;
  renterId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    rentPerDay: number;
    categories: Array<{
      id: string;
      name: string;
    }>;
  };
  renter: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

interface UserActivityData {
  getUserActivity: {
    lentProducts: Rental[];
  };
}

export default function LentProductsTable() {
  const { data, loading, error } =
    useQuery<UserActivityData>(GET_USER_ACTIVITY);

  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert icon={<AlertCircle size={16} />} color="red">
        Failed to load lent products. Please try again later.
      </Alert>
    );
  }

  const rentals = data?.getUserActivity?.lentProducts || [];

  if (rentals.length === 0) {
    return (
      <Center py="xl">
        <Text c="dimmed">No lent products yet</Text>
      </Center>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Product</Table.Th>
            <Table.Th>Renter</Table.Th>
            <Table.Th>Rent/Day</Table.Th>
            <Table.Th>Start Date</Table.Th>
            <Table.Th>End Date</Table.Th>
            <Table.Th>Categories</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rentals.map((rental) => (
            <Table.Tr key={rental.id}>
              <Table.Td>
                <Stack gap={0}>
                  <Text fw={500} size="sm">
                    {rental.product.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {rental.product.description.substring(0, 50)}...
                  </Text>
                </Stack>
              </Table.Td>
              <Table.Td>
                <Stack gap={0}>
                  <Text size="sm">
                    {rental.renter.firstname} {rental.renter.lastname}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {rental.renter.email}
                  </Text>
                </Stack>
              </Table.Td>
              <Table.Td>
                <Text fw={500}>${rental.product.rentPerDay}</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">
                  {rental.startDate
                    ? new Date(
                        isNaN(Number(rental.startDate))
                          ? rental.startDate
                          : Number(rental.startDate)
                      ).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Loading..."}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">
                  {rental.startDate
                    ? new Date(
                        isNaN(Number(rental.startDate))
                          ? rental.startDate
                          : Number(rental.startDate)
                      ).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Loading..."}
                </Text>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  {rental.product.categories.map((cat) => (
                    <Badge key={cat.id} size="sm" variant="light">
                      {cat.name}
                    </Badge>
                  ))}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
