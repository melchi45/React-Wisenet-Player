import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

export const DeviceTable: React.FC = ({ devices }) => {
    return (
        <Paper>
            <Table>
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
                    {devices.map(device => (
                        <TableRow key={device.id}>
                            <TableCell component="th" scope="row">
                                {device.DeviceName}
                            </TableCell>
                            <TableCell>{device.Model == 0 ? 'Camera' : 'NVR'}</TableCell>
                            <TableCell>{device.IPAddress}</TableCell>
                            <TableCell>{device.MACAddress}</TableCell>
                            <TableCell>{device.Port}</TableCell>
                            <TableCell>{device.Gateway}</TableCell>
                            <TableCell>{device.SubnetMask}</TableCell>
                            <TableCell>
                                {device.SupportSunapi == 1 ? 'Supported' : 'Not Supported'}
                            </TableCell>
                            <TableCell>{device.URL}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
