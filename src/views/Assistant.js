import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Heading, Input, Button, Text, Stack,Flex } from "@chakra-ui/react";
import Header from '../global/Header';
import TimeDisplay from '../global/TimeDisplay';

const Assistant = () => {
    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
        
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "https://mediafiles.botpress.cloud/d206594d-b69d-4b62-ae01-ddf2ddb16cce/webchat/v2.1/config.js";
        script2.async = true;
        document.body.appendChild(script2);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');


    const sendMessage = () => {
        if (input.trim() === '') return;

        const newMessage = { user: 'user', text: input };
        setMessages([...messages, newMessage]);

        // 현재는 보고서를 위해 저장된 데이터 출력
        const gptMessage = {
            user: 'gpt',
            text: '강아지의 눈 건강을 위해 추천되는 영양제는 다음과 같습니다:\n' +
                '\n' +
                '추천되는 제품들:\n' +
                '\n' +
                'VetriScience Canine Plus Senior:\n' +
                '\n' +
                '오메가-3 지방산, 비타민 A, 비타민 C, 비타민 E, 루테인, 제아잔틴 등 다양한 영양소를 포함하고 있습니다.\n' +
                'Zesty Paws Omega Bites:\n' +
                '\n' +
                '연어 오일 및 오메가-3 지방산을 포함하고 있어 눈 건강뿐만 아니라 피부와 코트 건강에도 도움이 됩니다.\n' +
                'Nutri-Vet Eye Health Supplement for Dogs:\n' +
                '\n' +
                '루테인, 베타카로틴, 비타민 C, 비타민 E 등을 포함한 눈 건강을 위한 종합 영양제입니다.\n' +
                'Ocu-GLO Rx:\n' +
                '\n' +
                '루테인, 제아잔틴, 오메가-3 지방산 등을 포함한 눈 건강 전문 영양제입니다.\n' +
                '이러한 영양제를 선택할 때는 강아지의 특정 필요와 현재 건강 상태를 고려하는 것이 중요합니다. 또한, 새로운 영양제를 시작하기 전에 수의사와 상담하여 안전성과 적절한 용량을 확인하는 것이 좋습니다'
        };
        setMessages([...messages, newMessage, gptMessage]);

        setInput('');
    };

    return (
        <Grid templateColumns="repeat(12, 1fr)" gap={4} p={4}>
            <GridItem colSpan={12}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Header title="Puppy Doc" />
                    <TimeDisplay />
                </Flex>
            </GridItem>

            <GridItem colSpan={12}>
                <Heading as='h4' size='md' p={4}>
                    AI 수의사
                </Heading>
            </GridItem>

            <GridItem colSpan={12}>
                <Box border="1px solid #ccc" borderRadius="md" p={4}>
                    <Box h="300px" overflowY="auto" p={4} border="1px solid #ccc" borderRadius="md">
                        {messages.map((msg, index) => (
                            <Stack key={index} direction={msg.user === 'user' ? 'row-reverse' : 'row'} spacing={4} mb={2}>
                                <Box
                                    bg={msg.user === 'user' ? 'teal.500' : 'gray.300'}
                                    color={msg.user === 'user' ? 'white' : 'black'}
                                    p={2}
                                    borderRadius="md"
                                >
                                    <Text>{msg.text}</Text>
                                </Box>
                            </Stack>
                        ))}
                    </Box>

                    <Grid templateColumns="repeat(12, 1fr)" gap={4} mt={4}>
                        <GridItem colSpan={10}>
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="메시지를 입력하세요..."
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Button onClick={sendMessage} colorScheme="teal" width="100%">전송</Button>
                        </GridItem>
                    </Grid>
                </Box>
            </GridItem>
        </Grid>
    );
}
export default Assistant;
// import React from 'react'
// import Chatbot from '../global/Chatbot'

// const Assistant = () => {
//   return (
//     <div>
//       <Chatbot />
//     </div>
//   )
// }

// export default Assistant;
