import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Alert, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AlertCircle } from 'lucide-react';
import { REGISTER_USER } from '../services/mutations';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      login(data.registerUser);
      navigate('/');
    },
    onError: (error) => {
      setError(error.message || 'Registration failed. Please try again.');
    },
  });

  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      firstname: (value) => (!value ? 'First name is required' : null),
      lastname: (value) => (!value ? 'Last name is required' : null),
      email: (value) => {
        if (!value) return 'Email is required';
        return /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email format';
      },
      phone: (value) => {
        if (!value) return 'Phone number is required';
        return /^\+\d{10,15}$/.test(value) ? null : 'Phone must start with + and contain 10-15 digits';
      },
      address: (value) => (!value ? 'Address is required' : null),
      password: (value) => {
        if (!value) return 'Password is required';
        return value.length >= 6 ? null : 'Password must be at least 6 characters';
      },
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    setError('');
    registerUser({
      variables: {
        data: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          phone: values.phone,
          address: values.address,
          password: values.password,
        },
      },
    });
  });

  return (
    <Container size={600} my={40}>
      <Title ta="center" style={{ fontWeight: 900 }}>
        Create an account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Sign up to get started
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert icon={<AlertCircle size={16} />} color="red" mb="md">
              {error}
            </Alert>
          )}

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="First Name"
                placeholder="John"
                required
                {...form.getInputProps('firstname')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Last Name"
                placeholder="Doe"
                required
                {...form.getInputProps('lastname')}
              />
            </Grid.Col>
          </Grid>

          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            mt="md"
            {...form.getInputProps('email')}
          />

          <TextInput
            label="Phone Number"
            placeholder="+1234567890"
            required
            mt="md"
            description="Include country code (e.g., +1 for USA)"
            {...form.getInputProps('phone')}
          />

          <TextInput
            label="Address"
            placeholder="123 Main Street, City, Country"
            required
            mt="md"
            {...form.getInputProps('address')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            mt="md"
            {...form.getInputProps('confirmPassword')}
          />

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign up
          </Button>
        </form>

        <Text ta="center" mt="md">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#228be6', textDecoration: 'none', fontWeight: 500 }}>
            Log in
          </Link>
        </Text>
      </Paper>
    </Container>
  );
}
