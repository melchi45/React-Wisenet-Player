import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import { Switch } from '../../components/Sidebar/Switch';
import { SidebarHeader } from '../../components/Sidebar/SidebarHeader';
import { Diamond } from '../../components/Sidebar/icons/Diamond';
import { BarChart } from '../../components/Sidebar/icons/BarChart';
import { Global } from '../../components/Sidebar/icons/Global';
import { InkBottle } from '../../components/Sidebar/icons/InkBottle';
import { Book } from '../../components/Sidebar/icons/Book';
import { Calendar } from '../../components/Sidebar/icons/Calendar';
import { ShoppingCart } from '../../components/Sidebar/icons/ShoppingCart';
import { Service } from '../../components/Sidebar/icons/Service';
import { SidebarFooter } from '../../components/Sidebar/SidebarFooter';
import { Badge } from '../../components/Sidebar/Badge';
import { Typography } from '../../components/Sidebar/Typography';
import { PackageBadges } from '../../components/Sidebar/PackageBadges';
import { SinglePlayerPage } from './SinglePlayerPage';
import { MultiPlayerPage } from './MultiPlayerPage';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { DeviceTable } from '../../components/Controller/Table/DeviceTable';
import { RestClientConfig } from '../../components/ump-player/sunapi/RestClientConfig';
import { IDevice, ISearchDevice } from '../../components/ump-player/Constant/Constant';


type Theme = 'light' | 'dark';

const themes = {
    light: {
        sidebar: {
            backgroundColor: '#ffffff',
            color: '#607489',
        },
        menu: {
            menuContent: '#fbfcfd',
            icon: '#0098e5',
            hover: {
                backgroundColor: '#c5e4ff',
                color: '#44596e',
            },
            disabled: {
                color: '#9fb6cf',
            },
        },
    },
    dark: {
        sidebar: {
            backgroundColor: '#0b2948',
            color: '#8ba1b7',
        },
        menu: {
            menuContent: '#082440',
            icon: '#59d0ff',
            hover: {
                backgroundColor: '#00458b',
                color: '#b6c8d9',
            },
            disabled: {
                color: '#3e5e7e',
            },
        },
    },
};

const RESTCLIENT_CONFIG = RestClientConfig;
const discoveryApp = null;
const discoveryAppIds = RESTCLIENT_CONFIG.discoveryAppId;
const isSupportDiscoveryApp = false;

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Playground: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);
    const [rtl, setRtl] = useState(false);
    const [hasImage, setHasImage] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');
    const [searchDevices, addNewDevice] = useState<ISearchDevice[]>([]);
    const [selectedDevices, setSelectedDevices] = useState<IDevice[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<IDevice>();

    const fetchDevices = (newDevice: ISearchDevice) => {
        addNewDevice((searchDevices) => {
            const sameDevices = searchDevices.filter((device) => device.id === newDevice.id);
            // replace old value from DeviceTable
            if (sameDevices.length > 0) {
                newDevice.HttpType = sameDevices[0].HttpType;
                newDevice.HttpPort = sameDevices[0].HttpPort;
                newDevice.HttpsPort = sameDevices[0].HttpsPort;
            }
            const filteredDevices = searchDevices.filter((device) => device.id !== newDevice.id);
            return [...filteredDevices, newDevice];
        });
        // const filteredDevices = searchDevices.filter((device) => device.MACAddress === newDevice.MACAddress);
        // if (filteredDevices.length <= 0) {
        //     // return [...filteredDevices, newDevice];
        //     addNewDevice((searchDevices) => [...searchDevices, newDevice]);
        // }

        // if (!searchDevices.find((device) => device.id === newDevice.id)) {
        //     console.log(newDevice);
        //     addNewDevice((searchDevices) => [...searchDevices, newDevice]);
        // }
    };

    useEffect(() => {
        if (typeof chrome !== 'undefined') {
            if (chrome.storage) {
                //Set some content from background page
                // chrome.storage.local.set({ "identifier": "Some awesome Content" }, function () {
                //     console.log("Storage Succesful");
                // });
                //get all contents of chrome storage
                chrome.storage.local.get(null, function (obj) {
                    console.log("Read content data of chrome storage => " + JSON.stringify(obj));
                });
            }
            if (chrome.runtime && chrome.runtime.onMessageExternal) {
                try {
                    // discoveryApp = chrome.runtime.connect(discoveryAppIds);
                    // isSupportDiscoveryApp = true;
                    chrome.runtime.connect(discoveryAppIds);
                    if (chrome.runtime.onMessageExternal) {
                        chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
                            if (message.launch == true) {
                                console.log("sender" + JSON.stringify(sender));
                            } else {
                                // console.log("sender" + JSON.stringify(sender));
                                // console.log("message" + JSON.stringify(message));
                                // console.log("message" + devices.length);
                                const strMacAddress: string = message.chMac;
                                const strIpAddress: string = message.chIP;
                                const strModel: string = message.chDeviceNameNew !== '' ? message.chDeviceNameNew : message.chDeviceName;
                                const numType: number = message.modelType;
                                const numPort: number = message.nPort;
                                const numHttpType: boolean = (message.httpType != undefined) ? (message.httpType ? true : false) : false;
                                const numHttpPort: number = message.nHttpPort === 0 ? 80 : message.nHttpPort;
                                const numHttpsPort: number = message.nHttpsPort === 0 ? 443 : message.nHttpsPort;
                                const strGateway: string = message.chGateway;
                                const strSubnetMask: string = message.chSubnetMask;
                                const boolSunapiSupport: boolean = message.isSupportSunapi == 1 ? true : false;
                                const strDDNS: string = message.DDNSURL;
                                const separator: string = '_';
                                const strId: String = [strMacAddress, strIpAddress].join(separator);
                                const Id: number = searchDevices.length + 1;

                                const newDevice: ISearchDevice = {
                                    id: strId,
                                    Model: strModel,
                                    Type: numType,
                                    IPAddress: strIpAddress,
                                    MACAddress: strMacAddress,
                                    Port: numPort,
                                    HttpType: numHttpType,
                                    HttpPort: numHttpPort,
                                    HttpsPort: numHttpsPort,
                                    Gateway: strGateway,
                                    SubnetMask: strSubnetMask,
                                    SupportSunapi: boolSunapiSupport,
                                    URL: strDDNS
                                };
                                fetchDevices(newDevice);
                            }
                        });
                    }

                    if (chrome.management) {
                        chrome.management.get(discoveryAppIds, (info) => {
                            console.log("get App Info:\r\n" + JSON.stringify(info));
                            if (info && !info.enabled && info.id === discoveryAppIds) {
                                chrome.management.setEnabled(discoveryAppIds, false, function () {
                                    chrome.management.setEnabled(discoveryAppIds, true);
                                });
                            } else {
                                chrome.management.launchApp(discoveryAppIds, function () {
                                    if (chrome.runtime.lastError) {
                                        console.error(chrome.runtime.lastError);
                                    } else {
                                        console.log("Discovery App launched");
                                    }
                                });
                                chrome.runtime.sendMessage(discoveryAppIds, {
                                    window: false,
                                    discovery: true
                                });
                            }
                        });
                        chrome.management.onEnabled.addListener(function (info) {
                            console.log("App onEnabled:\r\n" + JSON.stringify(info));
                            if (info.id === discoveryAppIds) {
                                console.log("Discovery app is enabled!");
                            }
                        });
                        chrome.management.onDisabled.addListener(function (info) {
                            console.log("App onDisabled:\r\n" + JSON.stringify(info));
                        });
                    }

                } catch (error) {
                    console.error("Not support the discovery with chrome app:" + error);
                }
            }
        }
    }, []);

    // handle on RTL change event
    const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRtl(e.target.checked);
    };

    // handle on theme change event
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    // handle on image change event
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasImage(e.target.checked);
    };

    const navigate = useNavigate();

    const handleSecureModeChanged = (changedDevice: ISearchDevice) => {
        // fetchDevices(changedDevice);
        // console.log(JSON.stringify(changedDevice));
    }

    const handleSelectedDevices = (devices: ISearchDevice[]) => {
        if (devices.length > 1) {
            let newDevices: IDevice[] = [];
            devices.forEach((element: ISearchDevice, index: Number) => {
                const newDevice: IDevice = {
                    id: "ump-player-" + index,
                    hostname: element.IPAddress,
                    port: element.Port,
                    username: "admin",
                    profile: "H.264",
                    device: "camera",
                    password: "5tkatjd!",
                    autoplay: true,
                    statistics: true,
                    https: element.HttpType
                };
                newDevices.push(newDevice);
            });

            setSelectedDevices(newDevices);
            //Set some content from background page
            chrome.storage.local.set({ devices: selectedDevices }, function () {
                console.log("Storage Succesful");
            });
        } else if (devices.length == 1) {
            const newDevice: IDevice = {
                id: "ump-player-1",
                hostname: devices[0].IPAddress,
                port: devices[0].Port,
                username: "admin",
                profile: "H.264",
                device: "camera",
                password: "5tkatjd!",
                autoplay: true,
                statistics: true,
                https: devices[0].HttpType
            };
            // set device information
            setSelectedDevice(newDevice);
            navigate("singleplayer", { state: { device: newDevice } });
            //Set some content from background page
            chrome.storage.local.set({ device: newDevice }, function () {
                console.log("Storage Succesful");
            });
            //get all contents of chrome storage
            chrome.storage.local.get(null, function (obj) {
                console.log("Read content data of chrome storage => " + JSON.stringify(obj));
            });
        } else {
            navigate("app.html");
            // navigate("multiplayer", { state: { devices: null } });
        }
    };

    const menuItemStyles: MenuItemStyles = {
        root: {
            fontSize: '13px',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                    ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
                    : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };

    return (
        <div style={{ display: 'flex', height: '100%', direction: rtl ? 'rtl' : 'ltr', width: '100vw' }}>
            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
                rtl={rtl}
                breakPoint="md"
                backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
                rootStyles={{
                    color: themes[theme].sidebar.color,
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <SidebarHeader rtl={rtl} style={{ marginBottom: '24px', marginTop: '16px' }} />
                    <div style={{ flex: 1, marginBottom: '32px' }}>
                        <div style={{ padding: '0 24px', marginBottom: '8px' }}>
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                            >
                                General
                            </Typography>
                        </div>
                        <Menu menuItemStyles={menuItemStyles}>
                            <SubMenu
                                label="Player"
                                icon={<BarChart />}
                                suffix={
                                    <Badge variant="danger" shape="circle">
                                        6
                                    </Badge>
                                }
                            >
                                <MenuItem component={<Link to="app.html" className="link" />}> Main Page</MenuItem>
                                <MenuItem component={<Link to="singleplayer" className="link" />}> Single Player</MenuItem>
                                <MenuItem component={<Link to="multiplayer" className="link" />}> Multi Player</MenuItem>
                            </SubMenu>
                            <SubMenu
                                label="Charts"
                                icon={<BarChart />}
                                suffix={
                                    <Badge variant="danger" shape="circle">
                                        6
                                    </Badge>
                                }
                            >
                                <MenuItem> Pie charts</MenuItem>
                                <MenuItem> Line charts</MenuItem>
                                <MenuItem> Bar charts</MenuItem>
                            </SubMenu>
                            <SubMenu label="Maps" icon={<Global />}>
                                <MenuItem> Google maps</MenuItem>
                                <MenuItem> Open street maps</MenuItem>
                            </SubMenu>
                            <SubMenu label="Theme" icon={<InkBottle />}>
                                <MenuItem> Dark</MenuItem>
                                <MenuItem> Light</MenuItem>
                            </SubMenu>
                            <SubMenu label="Components" icon={<Diamond />}>
                                <MenuItem> Grid</MenuItem>
                                <MenuItem> Layout</MenuItem>
                                <SubMenu label="Forms">
                                    <MenuItem> Input</MenuItem>
                                    <MenuItem> Select</MenuItem>
                                    <SubMenu label="More">
                                        <MenuItem> CheckBox</MenuItem>
                                        <MenuItem> Radio</MenuItem>
                                    </SubMenu>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu label="E-commerce" icon={<ShoppingCart />}>
                                <MenuItem> Product</MenuItem>
                                <MenuItem> Orders</MenuItem>
                                <MenuItem> Credit card</MenuItem>
                            </SubMenu>
                        </Menu>

                        <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                            >
                                Extra
                            </Typography>
                        </div>

                        <Menu menuItemStyles={menuItemStyles}>
                            <MenuItem icon={<Calendar />} suffix={<Badge variant="success">New</Badge>}>
                                Calendar
                            </MenuItem>
                            <MenuItem icon={<Book />}>Documentation</MenuItem>
                            <MenuItem disabled icon={<Service />}>
                                Examples
                            </MenuItem>
                        </Menu>
                    </div>
                    <SidebarFooter collapsed={collapsed} />
                </div>
            </Sidebar>

            <main>
                {/* <div className="content" > */}
                <header>
                    <div style={{ marginBottom: '16px' }}>
                        {broken && (
                            <button className="sb-button" onClick={() => setToggled(!toggled)}>
                                Toggle
                            </button>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <Typography variant="h4" fontWeight={600}>
                            React Pro Sidebar
                        </Typography>
                        <Typography variant="body2">
                            React Pro Sidebar provides a set of components for creating high level and
                            customizable side navigation
                        </Typography>
                        <PackageBadges />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginBottom: 16 }}>
                            <Switch
                                id="collapse"
                                checked={collapsed}
                                onChange={() => setCollapsed(!collapsed)}
                                label="Collapse"
                            />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <Switch id="rtl" checked={rtl} onChange={handleRTLChange} label="RTL" />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <Switch
                                id="theme"
                                checked={theme === 'dark'}
                                onChange={handleThemeChange}
                                label="Dark theme"
                            />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <Switch id="image" checked={hasImage} onChange={handleImageChange} label="Image" />
                        </div>
                    </div>
                </header>
                <content>
                    <Routes>
                        <Route path="/app.html" element={<div>메인페이지임</div>} />
                        <Route path="singleplayer" element={<SinglePlayerPage device={selectedDevice} />} />
                        <Route path="multiplayer" element={<MultiPlayerPage devices={selectedDevices} />} />
                    </Routes>
                </content>
                <footer>
                    <DeviceTable devices={searchDevices}
                        handleSelectedDevice={handleSelectedDevices}
                        handleSecureModeChanged={handleSecureModeChanged} />
                </footer>
                {/* <pre style={{ fontSize: 10 }}>
                    {JSON.stringify(selectedDevice, null, 4)}
                </pre> */}

                {/* </div> */}
            </main >
        </div >
    );
};