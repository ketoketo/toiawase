import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Container, TextField } from '@mui/material';

type PersonInCharge = {
  member: Member,
  toiawase: Toiawase
}

type Member = {
  id: number,
  name: string
}

type Toiawase = {
  id: number,
  name: string
}

export default function Index() {
  const [personInCharge, setPersonInCharge] = useState<PersonInCharge[]>([])
  const [aikotoba, setAikotoba] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await setInitialData();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [])

  const setInitialData = async () => {
    const response = await fetch('/api/person_in_charge');
    setPersonInCharge(await response.json());
  }

  const onClickNext = async (toiawaseName: string) => {
    if (aikotoba === 'gsf') {
      setIsLoading(true)
      try {
        const response = await fetch('/api/kuji', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ toiawaseName: toiawaseName }),
        });
  
        if (response.ok) {
          // POSTが成功した場合の処理
          await setInitialData();
          console.log('データを送信しました');
        } else {
          // POSTが失敗した場合の処理
          console.log('データの送信に失敗しました');
        }
      } catch (error) {
        console.error('エラー:', error);
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Container>
      <Stack
        divider={<Divider flexItem />}
        spacing={2}
      >
        <div style={{ fontWeight: 'bold' }}>
          person in charge
          <TextField style={{ marginLeft: '2rem' }} id="outlined-basic" label="aikotoba" variant="outlined" onChange={(e) => setAikotoba(e.target.value)} />
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: 'green' }}>
              <TableRow>
                <TableCell>toiawase</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personInCharge.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.toiawase.name}
                  </TableCell>
                  <TableCell align="right">{row.member.name}</TableCell>
                  <TableCell align="right">{isLoading ? (
                    <LoadingButton loading variant="outlined">
                      Submit
                    </LoadingButton>
                  ) : (<Button variant="contained" onClick={() => onClickNext(row.toiawase.name)}>Next</Button>)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div style={{ fontWeight: 'bold' }}>
          members
          <TextField style={{ marginLeft: '2rem' }} id="outlined-basic" label="new member" variant="outlined" />
          <Button style={{ marginLeft: '1rem' }} variant="contained">Add Member</Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: 'green' }}>
              <TableRow>
                <TableCell component="th">name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personInCharge.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th">{row.member.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Stack>
    </Container>
  )
}
