import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AlertCircle } from 'lucide-react';
import { LOGIN_USER } from '../services/mutations';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      login(data.loginUser);
      navigate('/');
    },
    onError: (error) => {
      setError(error.message || 'Login failed. Please check your credentials.');
    },
  });

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => {
        if (!value) return 'Email is required';
        return /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email format';
      },
      password: (value) => {
        if (!value) return 'Password is required';
        return value.length >= 6 ? null : 'Password must be at least 6 characters';
      },
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    setError('');
    loginUser({
      variables: {
        data: {
          email: values.email,
          password: values.password,
        },
      },
    });
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={{ fontWeight: 900 }}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Log in to your account
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert icon={<AlertCircle size={16} />} color="red" mb="md">
              {error}
            </Alert>
          )}

          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#228be6', textDecoration: 'none', fontWeight: 500 }}>
            Sign up
          </Link>
        </Text>
      </Paper>
    </Container>
  );
}
