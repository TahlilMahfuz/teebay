import { Container, Title, Text } from '@mantine/core';

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <Container size="md" py={80}>
      <div className="text-center">
        <Title order={1} size={36} fw={700} mb="md">
          {title}
        </Title>
        <Text size="lg" c="dimmed">
          {description}
        </Text>
      </div>
    </Container>
  );
}
