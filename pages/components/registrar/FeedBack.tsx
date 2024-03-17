import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Feed from "../../api/getFeed"


function App() {
  const [data , setData ] = React.useState([])

    const getDAta = async ()=>
    {
        try {
            const bisu = localStorage.getItem("token")
            const response = await Feed.get(bisu)

            if(response.status)
            {
              setData(response.response)
            }
            else
            {
                console.log("error")
            }
        } catch (error) {
            console.log("error")
            
        }
    }

    useEffect(()=>
    {
        getDAta();
    },[])


  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className=' font-bold'>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data : any  , index = 0) => (
            <TableRow
              key={index ++}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="center">{data.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;
