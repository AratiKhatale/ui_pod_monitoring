import { AppBar, Box, Chip, InputAdornment, InputBase, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgba(224, 224, 224, 1)',
        color: 'black',
        fontWieght: "700"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: "10px"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export const Index = () => {
    const [searchValue, setSearchValue] = useState('')
    const [tbodyData, setTbodyData] = useState([
        { id: '1', name: 'POD1', resources: 'CPU', pod_status: 'pending' },
        { id: '2', name: 'POD2', resources: 'memory', pod_status: 'failed' },
        { id: '3', name: 'POD3', resources: 'CPU', pod_status: 'failed' },
        { id: '4', name: 'POD4', resources: 'memory', pod_status: 'pending' },
        { id: '5', name: 'POD5', resources: 'memory', pod_status: 'running' },
        { id: '6', name: 'POD6', resources: 'CPU', pod_status: 'pending' },
    ])

    const [tbody, setTbody] = useState(tbodyData)
    const thead = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Name' },
        { id: 'resources', label: 'Resources Usage' },
        { id: 'pod_status', label: 'POD Status' }
    ]

    useEffect(() => {
        const filterData = (data) => {
            return data.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.resources.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.pod_status.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.id.toLowerCase().includes(searchValue.toLowerCase())
            );
        };
        searchValue.trim() === '' ? setTbody(tbodyData) : setTbody(filterData(tbodyData));


    }, [searchValue, tbody, tbodyData]);

    return (
        <div style={{display:"flex",    }}>
            <Box style={{ display: 'flex' }}>
                <AppBar style={{display:"flex"}}>
                    <TextField
                        variant="outlined"
                        id='search'
                        name='search'
                        onChange={(event) => setSearchValue(event.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </AppBar>
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: "90px", width: '100%', display:'flex' }}>
                <Table >
                    <TableHead>
                        <StyledTableRow >
                            {
                                thead.map((item, index) => {
                                    return (
                                        <StyledTableCell key={index} sx={{ fontWeight: '700' }}> {item.label} </StyledTableCell>
                                    )
                                })
                            }
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {tbody.length > 0 ?

                            tbody.map((data, index) => {
                                const status = data?.pod_status == 'running' ? <Chip width='45px' label='running' color='success' size='small' />
                                    : data?.pod_status == 'pending' ? <Chip width='45px' size='small' label='pending' color='secondary' />
                                        : <Chip label='failed' width='45px' color='error' size='small' />
                                return (
                                    <StyledTableRow key={index} hover

                                    >
                                        <StyledTableCell> {data.id}</StyledTableCell>
                                        <StyledTableCell> {data.name}</StyledTableCell>
                                        <StyledTableCell> {data.resources}</StyledTableCell>
                                        <StyledTableCell> {status}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                            :
                            <TableRow>
                                <TableCell>
                                    <Typography>No Data</Typography>
                                </TableCell>
                            </TableRow>

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}