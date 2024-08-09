## Explicacoes 
# DTO: 
-> Define e valida a estrutura dos dados de entrada (dados que chegam na API, como em um POST ou PUT). Usado para garantir que os dados recebidos pelo servidor são válidos antes de processá-los.

# Schema: 
-> Define a estrutura dos dados no banco de dados (como um documento no MongoDB). Usado para garantir a consistência dos dados armazenados e para definir as relações entre os dados.

# Pipes: 
-> são classes que podem transformar e validar os dados de entrada antes que eles cheguem ao manipulador de rota.
    - Eles são usados para garantir que os dados recebidos estejam no formato esperado e para aplicar transformações ou validações necessárias.
    - Ao usar ValidationPipe, o NestJS valida automaticamente os dados de entrada contra as regras definidas nos decoradores do DTO (por exemplo, @IsNotEmpty(), @IsString(), etc.)

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


## Fazer
-> ver quais chamadas devo proteger com JwtAuthGuard

-> lidar com a exceptions e as mensagens de retorno para update, delete
    - padronizar o response message de cada entidade - usar como exemplo o retorno de supplier

-> Continuar desenvolvimento:
    - invoice
    - categoria do produto
    - address employee e client

-> ver como fazer o gerenciamento dos acessos dos usuarios adms no back


-> Fazer testes unitarios

# User
-> Ocultar password do retorno User - findOne e findAll
-> Ajustar response para erro de criação de username igual
-> Ajustar response para findById de user que nao existe

# Product
-> Incluir relacionamento com fornecedor

# Client
-> Implementar Address
-> Ver como iniciar os campos de datas do SPC - null ?

# Sale
-> Problema no findAll .populate não está retornando os registros do array de products - possivel problema no mongoose
