import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center bg-gradient-to-br from-blue-50 to-gray-50">
      <Container size="md">
        <div className="text-center">
          <Title order={1} size={48} fw={900} mb="md">
            Welcome to Teebay
          </Title>

          {isAuthenticated && user ? (
            <>
              <Text size="xl" c="dimmed" mb="xl">
                Hello, {user.firstname}! Ready to explore products?
              </Text>
              <Group justify="center">
                <Button size="lg" onClick={() => navigate('/products')}>
                  Browse Products
                </Button>
              </Group>
            </>
          ) : (
            <>
              <Text size="xl" c="dimmed" mb="xl">
                Your marketplace for buying, selling, renting, and lending products
              </Text>
              <Group justify="center">
                <Button size="lg" onClick={() => navigate('/signup')}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  Log In
                </Button>
              </Group>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
