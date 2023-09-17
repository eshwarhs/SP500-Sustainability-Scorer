import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { visuallyHidden } from "@mui/utils";
import { Link } from "@mui/material";
import { Container, List, ListItem } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "Ticker",
    numeric: false,
    // disablePadding: true,
    label: "Ticker",
  },
  {
    id: "Company",
    numeric: false,
    // disablePadding: false,
    label: "Company",
  },
  {
    id: "ESG Risk score",
    numeric: true,
    // disablePadding: false,
    label: "ESG Risk Score",
  },
  {
    id: "Environment Risk score",
    numeric: true,
    // disablePadding: false,
    label: "Environment Risk Score",
  },
  {
    id: "Social Risk Score",
    numeric: true,
    // disablePadding: false,
    label: "Social Risk Score",
  },
  {
    id: "Governance Risk Score",
    numeric: true,
    // disablePadding: false,
    label: "Governance Risk Score",
  },
  {
    id: "Controversy Level",
    numeric: true,
    // disablePadding: false,
    label: "Controversy Level",
  },
  {
    id: "CDP Score",
    numeric: true,
    disablePadding: false,
    label: "CDP Score",
  },
  {
    id: "Sustainability Score",
    numeric: true,
    // disablePadding: false,
    label: "Sustainability Score",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: "bold" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        tabIndex={-1}
        key={row["Ticker"]}

      >
        <TableCell sx={{ fontWeight: "bold" }}>{row["Ticker"]}</TableCell>
        <TableCell>{row["Company"]}</TableCell>
        <TableCell>{row["ESG Risk score"]}</TableCell>
        <TableCell>{row["Environment Risk Score"]}</TableCell>
        <TableCell>{row["Social Risk Score"]}</TableCell>
        <TableCell>{row["Governance Risk Score"]}</TableCell>
        <TableCell>{row["Controversy Level"]}</TableCell>
        <TableCell>{row["CDP Score"]}</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>{row["Sustainability Score"]}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* revenue,net_income,news1,news2 */}
            <Typography variant="h6" gutterBottom component="div">
              More Information
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableRow>
                <TableCell>
                  <List>
                    {row["website"] == '-' ? <></>: <ListItem><b>Website: </b> <Link sx={{ paddingLeft:"5px"}} href={row["website"]} target="_blank" rel="noopener">{row["website"]}</Link></ListItem>}
                    <ListItem><b>Current Price: </b> {row["current_price"]}</ListItem>
                    <ListItem><b>Day Range: </b> {row["day_range"]}</ListItem>
                    <ListItem><b>Year Range: </b> {row["year_range"]}</ListItem>
                    <ListItem><b>Market Cap: </b> {row["market_cap"]}</ListItem>
                    <ListItem><b>Net Income:</b> ${parseFloat(row["net_income"].match(/\d+(\.\d+)?/)) >=0 ? (<p style={{color:'green'}}>{row["net_income"]}</p>) : (<p style={{color:'red'}}>{row["net_income"]}</p>)}</ListItem>
                  </List>
                </TableCell>
                <TableCell>
                  <Typography variant="p"><b>Latest News</b></Typography>
                  {/* {row['news1'] == '-' && row['news2'] == '-' ? (<List><ListItem>No latest News</ListItem></List>) : (row['news1'] != '-' && row['news2'] != '-') ?
                    (<List >
                      <ListItem><a href={row["news1"]}>{row["news1"]}</a></ListItem>
                      <ListItem><a href={row["news2"]}>{row["news2"]}</a></ListItem>
                    </List>) :
                    (<List><ListItem><a href={row["news2"]}>{row["news2"]}</a></ListItem></List>)} */}

                    {row['news1'] == '-' ? (<List><ListItem>No latest News</ListItem></List>) : 
                      (<List >
                        <ListItem><a href={row["news1"]}>{row["news1"]}</a></ListItem>
                        {row['news2'] == '-' ? <></> : <ListItem><a href={row["news2"]}>{row["news2"]}</a></ListItem>}
                      </List>)
                    }
                </TableCell>
              </TableRow>
              {/* <TableCell align="left">
                Website: <a href={row["website"]}>{row["website"]}</a>
              </TableCell>
              <TableCell align="left">
                Current Price: {row["current_price"]}
              </TableCell>
                {row['news1']=='-' && row['news2']=='-' ? (<p>No latest News</p>) : (row['news1']!='-' && row['news2']!='-')? 
                  (<TableCell >
                    <p><b>Latest News</b></p>
                    <a href={row["news1"]}>{row["news1"]}</a><br/>
                    <a href={row["news2"]}>{row["news2"]}</a>
                  </TableCell>) : 
                  (<TableCell ><a href={row["news1"]}>{row["news1"]}</a></TableCell>)}           */}

              {/* <TableCell align="right">
                Links for news            
              </TableCell>
              <TableCell align="right">
                Links for news            
              </TableCell> */}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>

  );
}

export default function EnhancedTable({ data }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <Row row={row} />
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 30, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
