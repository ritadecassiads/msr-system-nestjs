## Explicacoes 
# DTO: 
-> Define e valida a estrutura dos dados de entrada (dados que chegam na API, como em um POST ou PUT). Usado para garantir que os dados recebidos pelo servidor são válidos antes de processá-los.

# Schema: 
-> Define a estrutura dos dados no banco de dados (como um documento no MongoDB). Usado para garantir a consistência dos dados armazenados e para definir as relações entre os dados.

# Pipes: 
-> são classes que podem transformar e validar os dados de entrada antes que eles cheguem ao manipulador de rota.
    - Eles são usados para garantir que os dados recebidos estejam no formato esperado e para aplicar transformações ou validações necessárias.
    - Ao usar ValidationPipe, o NestJS valida automaticamente os dados de entrada contra as regras definidas nos decoradores do DTO (por exemplo, @IsNotEmpty(), @IsString(), etc.)


## Feito 
-> OK User está incompleto


## Fazer 
-> Continuar desenvolvimento:
    - auth
    - cliente
    - vendedor
    - venda
# User
-> Ocultar password do retorno User - findOne e findAll
-> Ajustar json retorno da exception de User

# Product
-> Tem necessidade do ResponseProductDto ?