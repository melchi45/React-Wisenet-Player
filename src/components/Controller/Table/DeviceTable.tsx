import React, { useEffect } from 'react';
import { Checkbox } from "@mui/material";
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    GridToolbar,
    GridRowModel,
    GridFooter,
    useGridApiContext,
    useGridApiEventHandler,
    GridEventListener
} from '@mui/x-data-grid';
import Alert, { AlertProps } from '@mui/material/Alert';
import { ISearchDevice, SearchDevicesProps } from '../../ump-player/Constant/Constant';

interface PropsWithHandler extends SearchDevicesProps {
    handleSelectedDevice: (devices: ISearchDevice[]) => void;
    handleSecureModeChanged: (device: ISearchDevice) => void;
};

const deviceTypeOptions = [
    { value: 0, label: "Camera" },
    { value: 3, label: "NVR" },
    { value: 4, label: "IO Box" },
    { value: 8, label: "AI Box" }
];

const deviceHttpOptions = [
    { value: false, label: "http" },
    { value: true, label: "https" }
];

export const Footer: React.FC<SearchDevicesProps> = ({ devices }) => {
    const [message, setMessage] = React.useState('');
    const apiRef = useGridApiContext();

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        setMessage(`Device "${params.row.IPAddress}" clicked.`);
    };

    const handleCheckboxChange: GridEventListener<'rowSelectionCheckboxChange'> = (params) => {
        setMessage(`Device "${params.id}" selected.`);
        // const selectedIDs = new Set([params.id]);
        // const selectedRows = devices.filter((row: any) =>
        //     selectedIDs.has(row.id),
        // );
        // setMessage(`Device "${selectedRows[0].IPAddress}" selected.`);
    };

    useGridApiEventHandler(apiRef, 'rowClick', handleRowClick);
    useGridApiEventHandler(apiRef, 'rowSelectionCheckboxChange', handleCheckboxChange);

    return (
        <React.Fragment>
            <GridFooter />
            {message && <Alert severity="info">{message}</Alert>}
        </React.Fragment>
    );
}

const updateRowData = () => {
    return React.useCallback(
        (device: Partial<ISearchDevice>) =>
            new Promise<Partial<ISearchDevice>>((resolve, reject) => {
                // setTimeout(() => {
                if (device.HttpType === true) {
                    if (device.HttpsPort !== 0) {
                        resolve({ ...device, Port: device.HttpsPort });
                    }
                    else {
                        reject(new Error("Error while update port: this port can't use 0."));
                    }
                } else {
                    if (device.HttpPort !== 0) {
                        resolve({ ...device, Port: device.HttpPort });
                    } else {
                        reject(new Error("Error while update port: this port can't use 0."));
                    }
                }
                // }, 100);
            }),
        [],
    );
};

export const DeviceTable: React.FC<PropsWithHandler> = ({ devices, handleSelectedDevice, handleSecureModeChanged }) => {
    // set data to selectRows which selected items on data grid

    const [selectedDevices, setSelectedRows] = React.useState<ISearchDevice[]>([]);
    const columns: GridColDef[] = [
        {
            field: "Model",
            headerName: "Model",
            cellClassName: "name-column--cell",
            width: 200,
        },
        {
            field: "Type",
            headerName: "Type",
            type: 'singleSelect',
            valueOptions: deviceTypeOptions,
            valueFormatter: ({ id, value, field }) => {
                const option = deviceTypeOptions.find(
                    ({ value: optionValue }) => optionValue === value
                );

                return option!.label;
            }
        },
        {
            field: "IPAddress",
            headerName: "IP Address",
            width: 200
        },
        {
            field: "MACAddress",
            headerName: "MAC Address",
        },
        {
            field: "Port",
            headerName: "Port",
            width: 40
        },
        {
            field: "HttpPort",
            headerName: "Http Port",
            width: 40
        },
        {
            field: "HttpsPort",
            headerName: "Https Port",
            width: 40
        },
        {
            field: "HttpType",
            headerName: "Secure",
            // flex: 1,
            editable: true,
            type: 'singleSelect',
            valueOptions: deviceHttpOptions,
            valueFormatter: ({ id, value, field }) => {
                const option = deviceHttpOptions.find(
                    ({ value: optionValue }) => optionValue === value
                );

                const selectedIDs = new Set([id]);
                const selectedRows = devices.filter((row: any) =>
                    selectedIDs.has(row.id),
                );
                selectedRows[0].HttpType = value;
                if (value) {
                    selectedRows[0].Port = selectedRows[0].HttpsPort;
                } else {
                    selectedRows[0].Port = selectedRows[0].HttpPort;
                }
                handleSecureModeChanged(selectedRows[0]);

                return option!.label;
            },
        },
        {
            field: "Gateway",
            headerName: "Gateway",
        },
        {
            field: "SubnetMask",
            headerName: "Subnet Mask",
        },
        {
            field: "SupportSunapi",
            headerName: "Support SUNAPI",
        },
        {
            field: "URL",
            headerName: "URL",
            width: 300
        }
    ];
    const updateRow = updateRowData();
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);
    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            // Make the HTTP request to save in the backend
            const response = await updateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
        },
        [updateRow],
    );

    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);


    const onRowsSelectionHandler = (ids: any) => {
        const selectedIDs = new Set(ids);
        const selectedRows = devices.filter((row: any) =>
            selectedIDs.has(row.id),
        );
        setSelectedRows(selectedRows);
        handleSelectedDevice(selectedRows);
        // navigate('/', { state: JSON.stringify(selectedRows, null, 4) });
    };

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={devices}
                columns={columns}
                // rowHeight={30}
                // getRowId={(row: any) => row.MACAddress + '_' + row.IPAddress}
                getRowId={(row: any) => row.id}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            // Hide columns status and traderName, the other columns will remain visible
                            HttpPort: false,
                            HttpsPort: false,
                            MACAddress: false,
                            Gateway: false,
                            SubnetMask: false,
                            SupportSunapi: false,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
                // pageSizeOptions={[40]}
                checkboxSelection
                onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                disableRowSelectionOnClick
                slots={{
                    toolbar: GridToolbar,
                    loadingOverlay: LinearProgress,
                    footer: Footer
                }}
            />
            {/* <pre style={{ fontSize: 10 }}>
                {JSON.stringify(selectedRows, null, 4)}
            </pre> */}
        </Box>
    );
}
