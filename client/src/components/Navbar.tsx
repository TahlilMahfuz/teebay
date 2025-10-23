import { Link, useNavigate } from 'react-router-dom';
import { Button, Menu, Group, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Package, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <Container size="xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900 no-underline hover:text-gray-700 transition-colors">
            teebay
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" leftSection={<Package size={18} />}>
                  Products
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {isAuthenticated ? (
                  <>
                    <Menu.Item onClick={() => navigate('/products')}>All Products</Menu.Item>
                    <Menu.Item onClick={() => navigate('/bought')}>Bought</Menu.Item>
                    <Menu.Item onClick={() => navigate('/sold')}>Sold</Menu.Item>
                    <Menu.Item onClick={() => navigate('/rented')}>Rented</Menu.Item>
                    <Menu.Item onClick={() => navigate('/lent')}>Lent</Menu.Item>
                  </>
                ) : (
                  <Menu.Item onClick={() => navigate('/products')}>All Products</Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>

            {isAuthenticated ? (
              <Button
                variant="outline"
                leftSection={<LogOut size={18} />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Group gap="sm">
                <Button variant="subtle" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </Group>
            )}
          </div>

          <div className="md:hidden">
            <Burger opened={opened} onClick={toggle} size="sm" />
          </div>
        </div>

        {opened && (
          <div className="md:hidden pb-4 space-y-2">
            <Menu shadow="md" width="100%">
              <Menu.Target>
                <Button fullWidth variant="subtle" leftSection={<Package size={18} />}>
                  Products
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {isAuthenticated ? (
                  <>
                    <Menu.Item onClick={() => { navigate('/products'); toggle(); }}>
                      All Products
                    </Menu.Item>
                    <Menu.Item onClick={() => { navigate('/bought'); toggle(); }}>
                      Bought
                    </Menu.Item>
                    <Menu.Item onClick={() => { navigate('/sold'); toggle(); }}>
                      Sold
                    </Menu.Item>
                    <Menu.Item onClick={() => { navigate('/rented'); toggle(); }}>
                      Rented
                    </Menu.Item>
                    <Menu.Item onClick={() => { navigate('/lent'); toggle(); }}>
                      Lent
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item onClick={() => { navigate('/products'); toggle(); }}>
                    All Products
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>

            {isAuthenticated ? (
              <Button
                fullWidth
                variant="outline"
                leftSection={<LogOut size={18} />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <div className="space-y-2">
                <Button fullWidth variant="subtle" onClick={() => { navigate('/login'); toggle(); }}>
                  Login
                </Button>
                <Button fullWidth onClick={() => { navigate('/signup'); toggle(); }}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}
