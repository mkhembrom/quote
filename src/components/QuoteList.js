import {useParams, useNavigate} from 'react-router-dom'
import { CgArrowLongLeft } from 'react-icons/cg'
import { Flex,useColorMode, Text, Container, VStack, Button, Box, Heading } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getQuoteAuthors } from '../api/api'
import { HashLoader } from 'react-spinners';

export const QuoteList = () => {

  const { colorMode } = useColorMode();
  const navigation = useNavigate();

  
  const handleClick = () => {
    navigation("/");
  }

  const { quoteAuthor } = useParams();

  const { data, isLoading, isError, error } = useQuery(["authors", quoteAuthor], () => getQuoteAuthors(quoteAuthor));

  if (isLoading) return <Box h="100vh" w="100vw" d="flex" justifyContent="center" alignItems="center"><HashLoader color={colorMode === "light" ? "#000" : "#fff"}/></Box>;

  if(isError) return <p>errors { error }</p>;
 
	return (
		<Container maxW={["container.sm","container.md", "container.lg"]}>
      
      <VStack h="100vh">
      <Flex w="100%" alignItems="center" justifyContent="flex-end" py="1rem">
       <Button onClick={ handleClick } _focus={{border: "none"}} _active={{border: "none"}} _hover={{bg: "transparent",border: "none",boxShadow: "none"}} border="none" bg="transparent" varient="ghost" fontWeight="normal" leftIcon={<CgArrowLongLeft />}>
            <Text fontSize="sm" color="grey.200">back</Text>
       </Button>
      </Flex>
      <Flex w="100%" alignItems="center" justifyContent="center">
        <Container maxW={["90%%","75%","50%"]} mt="1rem" d="flex" alignItems="center" justifyContent="center">
         <Box width={["80%", "80%","500px"]} d="flex" flexDirection="column" alignItems="start" ml="-55px">
              <Heading fontSize="1.5rem" pl="55px" w="100%" mb="5rem">{ quoteAuthor }</Heading>
           {data.map(({ _id, quoteText }) => {
           	return (
           	<Text key={_id} mb="3rem" fontSize="1.35rem" textAlign="start" lineHeight="32px" borderLeft="5px solid #F7DE95" pl="50px">
           		{quoteText}
           	</Text>);
           })}
          </Box>
        </Container>
      </Flex>
      <footer className="footer">
        <Text as="sub">created by Manjesh Hembrom</Text>
      </footer>
      </VStack>
    </Container>
	);
} 
