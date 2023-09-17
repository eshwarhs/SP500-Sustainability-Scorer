import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import { useTheme } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import Container from "@mui/material/Container";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" sx={{ fontWeight: "bold"}}>
          {row["Ticker"]}
        </TableCell>
        <TableCell>{row["Company"]}</TableCell>
        <TableCell>{row["ESG Risk score"]}</TableCell>
        <TableCell>{row["Environment Risk Score"]}</TableCell>
        <TableCell>{row["Social Risk Score"]}</TableCell>
        <TableCell>{row["Governance Risk Score"]}</TableCell>
        <TableCell>{row["Controversy Level"]}</TableCell>
        <TableCell>{row["CDP Score"]}</TableCell>
        <TableCell sx={{ fontWeight: "bold"}}>{row["Sustainability Score"]}</TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box> */}
            <Container>
              <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function SustainabilityTable({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const emptyRows =
    page > 0 ? Math.max(0, page * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold"}}>Ticker</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>Company</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>ESG Risk score</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>Environment Risk Score</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>Social Risk Score</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>Governance Risk Score</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>Controversy Level</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>CDC Score</TableCell>
            <TableCell sx={{ fontWeight: "bold"}}>Sustainability Score</TableCell>
            <TableCell />
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((row) => (
            <Row key={row["Ticker"]} row={row} />
          ))} */}
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            // <TableRow key={row.name}>
            //   <TableCell component="th" scope="row">
            //     {row.name}
            //   </TableCell>
            //   <TableCell style={{ width: 160 }} align="right">
            //     {row.calories}
            //   </TableCell>
            //   <TableCell style={{ width: 160 }} align="right">
            //     {row.fat}
            //   </TableCell>
            // </TableRow>
            <Row key={row["Ticker"]} row={row} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={10} />
            </TableRow>
          )}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            
          </TableRow>
        </TableFooter> */}
      </Table>
      <TablePagination
        rowsPerPageOptions={[25, 30, 50, { label: "All", value: -1 }]}
        component="div"
        colSpan={3}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </TableContainer>
  );
}
