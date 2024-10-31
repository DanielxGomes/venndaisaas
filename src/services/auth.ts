interface User {
  id: number;
  nome: string;
  email: string;
}

const MOCK_USER: User = {
  id: 1,
  nome: 'Usuário Teste',
  email: 'teste@vennd.com.br'
};

const MOCK_CREDENTIALS = {
  email: 'teste@vennd.com.br',
  password: 'teste123'
};

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    return MOCK_USER;
  }
  
  return null;
}

export async function registerUser(name: string, email: string, password: string): Promise<User | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // In a real application, this would make an API call to create the user
  // For now, we'll just return a mock user
  return {
    id: Math.floor(Math.random() * 1000),
    nome: name,
    email: email
  };
}