import {useState} from 'react'
import { Link } from 'react-router-dom'
import { FiRefreshCw } from 'react-icons/fi'
import { CgArrowLongRight } from 'react-icons/cg'
import { Flex, useColorMode, Text, Container, VStack, Button, Box, Image} from '@chakra-ui/react'
import {useQuery} from 'react-query'
import { getQuotes } from '../api/api';
import { HashLoader } from 'react-spinners';


export const Quote = () => {

  const [page, setPage] = useState(1);
  const [result, setResult] = useState(1);
  
  const randomGenerator = (limit) => {
    return Math.floor(Math.random()*limit);
  }
  const handleClick = () => {
    setPage(page => randomGenerator(7000));
    setResult(result => randomGenerator(10));
  }

  const { colorMode, toggleColorMode } = useColorMode();

  const { data, error, isLoading, isError } = useQuery(["quotes", page], () => getQuotes(page));

  if (isLoading) return <Box h="100vh" w="100vw" d="flex" justifyContent="center" alignItems="center"><HashLoader color={colorMode === "light" ? "#000" : "#fff"}/></Box>;

  if(isError) return <p>errors { error }</p>;
  

  return (
    <Container maxW={["container.sm","container.md", "container.lg"]}>
      <VStack h="100vh">
      <Flex w={["70%", "80%", "80%"]} alignItems="center" justifyContent="space-between" pt="2rem">
        <Image onClick={toggleColorMode} src={colorMode === "light" ? "/moon.svg" : "/sun.svg"} bg="transparent" w="40px" cursor="pointer" />
       <Button onClick={handleClick} _focus={{border: "none"}} _active={{border: "none"}} _hover={{bg: "transparent",border: "none",boxShadow: "none"}} border="none" bg="transparent" varient="ghost" fontWeight="normal" rightIcon={<FiRefreshCw />}>
          <Text fontSize="sm">random</Text>
       </Button>
      </Flex>
      <Flex w="100%" alignItems="center" justifyContent="center">
        <Container maxW={["90%%","75%","50%"]} mt="5rem" d="flex" alignItems="center" justifyContent="center">
         <Box width={["80%", "80%","500px"]} d="flex" flexDirection="column" alignItems="center" ml="-55px">
           <Text fontSize="1.35rem" lineHeight="32px" borderLeft="5px solid #F7DE95" pl="50px">{data[result].quoteText}</Text>
           <Box pl="37px" mt="5rem"  w="100%">
            <Link to={`/quote/${data[result].quoteAuthor}`}>
             <Flex px="16px" borderRadius="2px" py="2rem" alignItems="center" justifyContent="space-between" w="100%" _hover={{ bg: `${colorMode === 'light' ? `#333232` : `#F7DE95`}`, color: `${colorMode === "light" ? "#fff" : "#000"}`, textDecoration: "none",}} role="group">
               <Box d="flex" alignItems="start" justifyContent="start" flexDirection="column" _groupHover={{ color: 'grey.200' }} w={["100%", "100%"]}>
                 <Text fontWeight="blod" w={["100%", "200px", "300px"]} fontSize={["sm", "lg","xl"]} d="flex" justifyContent="start">{data[result].quoteAuthor}</Text>
                 <Text w={["100%", "200px", "300px"]} fontSize="xs" d="flex" justifyContent="start" color="grey">{data[result].quoteGenre}</Text>
               </Box>
               <Box><CgArrowLongRight /></Box>
             </Flex>
            </Link>
           </Box>
         </Box>
        </Container>
      </Flex>
      <footer className="footer">
         <Text as="sub">created by Manjesh Hembrom</Text>
      </footer>
      </VStack>
    </Container>
  );
};
