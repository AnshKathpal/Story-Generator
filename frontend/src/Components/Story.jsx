import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'


export const Story = () => {


    const [story,setStory] = useState("")


  return (

    <Box>

<Box>
    Story Generator
</Box>

<form>

<FormControl>

<FormLabel>
Write your Keyword
</FormLabel>
<Input />

<Box>



</Box>

</FormControl>

</form>

    </Box>

  )
}
