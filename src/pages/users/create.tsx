import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateUserFormData = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Senha mínima de 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas não batem')
})

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(createUserFormSchema) })
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <VStack>
                <Input name="name" label="Nome completo" {...register("name")} />
                {errors.name && (<Text fontSize='sm'>{errors.name.message}</Text>)}
              </VStack>
              <VStack>
                <Input name="email" label="E-mail" type="email" {...register("email")} />
                {errors.email && (<Text fontSize='sm'>{errors.email.message}</Text>)}
              </VStack>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <VStack>
                <Input name="password" type="password" label="Senha" {...register("password")} />
                {errors.password && (<Text fontSize='sm'>{errors.password.message}</Text>)}
              </VStack>
              <VStack>
                <Input name="password_confirmation" label="Confirmação da senha" type="password"  {...register("password_confirmation")} />
                {errors.password_confirmation && (<Text fontSize='sm'>{errors.password_confirmation.message}</Text>)}
              </VStack>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box >
  )
}

