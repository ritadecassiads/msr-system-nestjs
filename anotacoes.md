## Explicacoes 
# DTO: 
-> Define e valida a estrutura dos dados de entrada (dados que chegam na API, como em um POST ou PUT). Usado para garantir que os dados recebidos pelo servidor são válidos antes de processá-los.

# Schema: 
-> Define a estrutura dos dados no banco de dados (como um documento no MongoDB). Usado para garantir a consistência dos dados armazenados e para definir as relações entre os dados.

# Pipes: 
-> são classes que podem transformar e validar os dados de entrada antes que eles cheguem ao manipulador de rota.
    - Eles são usados para garantir que os dados recebidos estejam no formato esperado e para aplicar transformações ou validações necessárias.
    - Ao usar ValidationPipe, o NestJS valida automaticamente os dados de entrada contra as regras definidas nos decoradores do DTO (por exemplo, @IsNotEmpty(), @IsString(), etc.)

# Funcionamento do ValidationPipe
1. Recepção de Dados: Quando um cliente faz uma requisição à API, os dados enviados no corpo da requisição são validados automaticamente pelo ValidationPipe antes de chegar ao controlador.
2. Erros de Validação: Se os dados não atenderem aos critérios de validação definidos nos DTOs (como tamanho máximo, formato de e-mail, etc.), o ValidationPipe capturará esses erros.
3. Exceção Personalizada: O ValidationPipe então usa a exceptionFactory para criar uma instância de ValidationException, passando os erros de validação.
4. Resposta HTTP: A ValidationException formatada é lançada e o NestJS automaticamente transforma essa exceção em uma resposta HTTP com código de status 400 Bad Request, retornando um corpo de resposta que contém a mensagem "Erro de validação" e uma lista dos erros formatados.

# Funcionamento Auth Login
1. Login (POST /auth/login):
    Cliente envia username e password.
    AuthController chama LocalAuthGuard.
    LocalAuthGuard chama LocalStrategy.
    LocalStrategy valida credenciais via AuthService.
    Se válido, AuthService gera token JWT e retorna ao cliente.

2. Acesso Protegido:
    Cliente envia requisição com token JWT no cabeçalho.
    JwtAuthGuard verifica token.
    JwtStrategy decodifica token e anexa informações do usuário à requisição.

# Strategy (lib Passport)
-> Passport é uma biblioteca robusta para autenticação em Node.js, e ela usa strategies para suportar diferentes métodos de autenticação de maneira padronizada
-> Strategies encapsulam a lógica de autenticação em módulos reutilizáveis
-> Suporte a Múltiplos Métodos de Autenticação
-> Segurança e Separação de Preocupações


# Comandos:
-> nest g resource nome
    - cria estrutura completa do CRUD

-> nest g module nome

-> nest g controller nome

-> nest g service nome


# Mapeamento relacionamentos
1. Client -> 1x1 Employee (createdByEmployee)
2. Product -> 1x1 Supplier (supplierId) + 1xn Category (categories)
3. Sale -> 1x1 Employee (sellerId) + 1x1 Client (clientId) + 1xn Products (products)
4. Invoice -> 1x1 Supplier (supplierId)


## Fazer
-> ver como fazer o gerenciamento dos acessos dos usuarios adms no back
-> Fazer testes unitarios

# Sale
-> Problema no findAll .populate não está retornando os registros do array de products - possivel problema no mongoose
