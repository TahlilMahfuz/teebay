"use client"

import { useState } from "react"
import { Modal, Button, Stack, Group, Text, Loader } from "@mantine/core"
import { useMutation } from "@apollo/client"
import { ADD_PRODUCT } from "../../services/mutations"
import { ALL_PRODUCTS } from "../../services/query"
import TitleSlide from "../slides/title-slide"
import CategorySlide from "../slides/category-slide"
import DescriptionSlide from "../slides/description-slide"
import PriceSlide from "../slides/price-slide"
import SummarySlide from "../slides/summary-slide"
import { notifications } from "@mantine/notifications"
import { useAuth } from "../../contexts/AuthContext"

interface AddProductModalProps {
  opened: boolean
  onClose: () => void
}

const SLIDES = ["title", "category", "description", "price", "summary"] as const

export default function AddProductModal({ opened, onClose }: AddProductModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [title, setTitle] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<number | string>("")
  const [rentPerDay, setRentPerDay] = useState<number | string>("")

  const [addProduct, { loading }] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCTS }],
    awaitRefetchQueries: true,
  })

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const { user } = useAuth();
  const handleSubmit = async () => {
  try {
    await addProduct({
      variables: {
        data: {
          title,
          description,
          price: Number(price),
          rentPerDay: Number(rentPerDay),
          categories, // array of strings
          ownerId: Number(user?.id),
        },
      },
    });

    // Reset form
    setTitle("");
    setCategories([]);
    setDescription("");
    setPrice("");
    setRentPerDay("");
    setCurrentSlide(0);
    onClose();

    notifications.show({
      message: "Product added successfully!",
      color: "green",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    notifications.show({
      message: "Failed to add product",
      color: "red",
    });
  }
};


  const isLastSlide = currentSlide === SLIDES.length - 1
  const isFirstSlide = currentSlide === 0

  const renderSlide = () => {
    switch (SLIDES[currentSlide]) {
      case "title":
        return <TitleSlide title={title} onTitleChange={setTitle} />
      case "category":
        return <CategorySlide selectedCategories={categories} onCategoriesChange={setCategories} />
      case "description":
        return <DescriptionSlide description={description} onDescriptionChange={setDescription} />
      case "price":
        return (
          <PriceSlide
            price={price}
            rentPerDay={rentPerDay}
            onPriceChange={setPrice}
            onRentPerDayChange={setRentPerDay}
          />
        )
      case "summary":
        return (
          <SummarySlide
            title={title}
            categories={categories}
            description={description}
            price={price}
            rentPerDay={rentPerDay}
          />
        )
      default:
        return null
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Add Product - Step ${currentSlide + 1} of ${SLIDES.length}`}
      size="lg"
      centered
    >
      <Stack gap="lg">
        {/* Slide Content */}
        <div style={{ minHeight: "300px" }}>{renderSlide()}</div>

        {/* Navigation Buttons */}
        <Group justify="space-between">
          <Button variant="default" onClick={handlePrevious} disabled={isFirstSlide}>
            Previous
          </Button>

          <Text size="sm" c="dimmed">
            Step {currentSlide + 1} of {SLIDES.length}
          </Text>

          {isLastSlide ? (
            <Button onClick={handleSubmit} loading={loading} color="green">
              {loading ? <Loader size="xs" color="white" /> : "Submit"}
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </Group>
      </Stack>
    </Modal>
  )
}
