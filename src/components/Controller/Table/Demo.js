import React, { Component } from 'react';
import PropTypes from 'prop-types';
// for React 18 remove styles
// import { withStyles } from '@mui/styles'; // <--- delete this ❌
import { styled } from '@mui/system'; // <--- Add this ✅
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export class SimpleTable extends Component {
  constructor(props) {
    super(props);
  }
  // function SimpleTable(props) {
  //   const { classes, devices } = props;

  render() {
    const { classes } = this.props;
    const { devices } = this.devices;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Model</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>MAC Address</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Gateway</TableCell>
              <TableCell>Subnet Mask</TableCell>
              <TableCell>Support Sunapi</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.DeviceName}
                </TableCell>
                <TableCell>{row.Model == 0 ? 'Camera' : 'NVR'}</TableCell>
                <TableCell>{row.IPAddress}</TableCell>
                <TableCell>{row.MACAddress}</TableCell>
                <TableCell>{row.Port}</TableCell>
                <TableCell>{row.Gateway}</TableCell>
                <TableCell>{row.SubnetMask}</TableCell>
                <TableCell>
                  {row.SupportSunapi == 1 ? 'Supported' : 'Not Supported'}
                </TableCell>
                <TableCell>{row.URL}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   devices: PropTypes.array.isRequired,
// };

// // export default withStyles(styles)(SimpleTable);

// export default styled(styles)(SimpleTable);
