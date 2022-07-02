import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean,
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Rodrigo Jacomeli</Text>
          <Text color="gray.300" fontSize="small">rodrigo.devvga@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Rodrigo Jacomeli" src="https://github.com/RodrigoJacomeli" />
    </Flex>

  )
}