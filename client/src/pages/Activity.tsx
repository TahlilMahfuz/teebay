"use client"

import { Container, Title, Text, Tabs } from "@mantine/core"
import BoughtProductsTable from "../components/tables/buy-table"
import SoldProductsTable from "../components//tables/sold-table"
import RentedProductsTable from "../components//tables/rent-table"
import LentProductsTable from "../components//tables/lent-table"

export default function ActivityPage() {
  return (
    <Container size="xl" py="xl">
      <div className="mb-8">
        <Title order={1} mb="xs">
          My Activity
        </Title>
        <Text c="dimmed">View your bought, sold, rented, and lent products</Text>
      </div>

      <Tabs defaultValue="bought" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="bought">Bought</Tabs.Tab>
          <Tabs.Tab value="sold">Sold</Tabs.Tab>
          <Tabs.Tab value="rented">Rented</Tabs.Tab>
          <Tabs.Tab value="lent">Lent</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="bought">
          <BoughtProductsTable />
        </Tabs.Panel>

        <Tabs.Panel value="sold">
          <SoldProductsTable />
        </Tabs.Panel>

        <Tabs.Panel value="rented">
          <RentedProductsTable />
        </Tabs.Panel>

        <Tabs.Panel value="lent">
          <LentProductsTable />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
