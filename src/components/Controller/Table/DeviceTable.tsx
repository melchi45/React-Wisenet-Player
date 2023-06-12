import React, { Component } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     Paper,
// } from '@mui/material';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
// import {
//     DataGridPremium
// } from '@mui/x-data-grid-premium';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

export const DeviceTable: React.FC = ({ devices }) => {
    const columns: GridColDef[] = [
        // { field: "id", headerName: "ID", width: 40 },
        {
            field: "model",
            headerName: "Model",
            cellClassName: "name-column--cell",
            width: 200,
        },
        {
            field: "type",
            headerName: "Type",
        },
        {
            field: "ipaddress",
            headerName: "IP Address",
            width: 200
        },
        {
            field: "macaddress",
            headerName: "MAC Address",
        },
        {
            field: "port",
            headerName: "Port",
            width: 40
        },
        {
            field: "gateway",
            headerName: "Gateway",
        },
        {
            field: "subnetmask",
            headerName: "Subnet Mask",
        },
        {
            field: "supportsunapi",
            headerName: "Support SUNAPI",
        },
        {
            field: "url",
            headerName: "URL",
            width: 300
        }
    ];

    const rows = [
        {
            // id: 1,
            model: "PNM-7082RVD-WF",
            type: 1,
            ipaddress: "",
            macaddress: "",
            port: 80,
            gateway: "",
            subnetmask: "",
            supportsunapi: true,
            url: ""
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={devices}
                columns={columns}
                getRowId={(row: any) => row.macaddress + row.ipadress}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            // Hide columns status and traderName, the other columns will remain visible
                            macaddress: false,
                            gateway: false,
                            subnetmask: false,
                            supportsunapi: false,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                // disableRowSelectionOnClick
                slots={{
                    toolbar: GridToolbar,
                    loadingOverlay: LinearProgress,
                }}
            />
        </Box>
        // <Paper>
        //     <Table>
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell>Model</TableCell>
        //                 <TableCell>Type</TableCell>
        //                 <TableCell>IP Address</TableCell>
        //                 <TableCell>MAC Address</TableCell>
        //                 <TableCell>Port</TableCell>
        //                 <TableCell>Gateway</TableCell>
        //                 <TableCell>Subnet Mask</TableCell>
        //                 <TableCell>Support Sunapi</TableCell>
        //                 <TableCell>URL</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {devices.map(device => (
        //                 <TableRow key={device.id}>
        //                     <TableCell component="th" scope="row">
        //                         {device.DeviceName}
        //                     </TableCell>
        //                     <TableCell>{device.Model == 0 ? 'Camera' : 'NVR'}</TableCell>
        //                     <TableCell>{device.IPAddress}</TableCell>
        //                     <TableCell>{device.MACAddress}</TableCell>
        //                     <TableCell>{device.Port}</TableCell>
        //                     <TableCell>{device.Gateway}</TableCell>
        //                     <TableCell>{device.SubnetMask}</TableCell>
        //                     <TableCell>
        //                         {device.SupportSunapi == 1 ? 'Supported' : 'Not Supported'}
        //                     </TableCell>
        //                     <TableCell>{device.URL}</TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </Paper>
    );
}
