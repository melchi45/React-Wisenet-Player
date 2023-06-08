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
import { SinglePage } from './SinglePage';
import { Main } from './Main';
import { Routes, Route, Link } from "react-router-dom";
import { DeviceTable } from '../../components/Controller/Table/DeviceTable';
import { RestClientConfig } from '../../components/ump-player/sunapi/RestClientConfig';


type Theme = 'light' | 'dark';

function createData(
    id,
    DeviceName,
    Model,
    IPAddress,
    MACAddress,
    Port,
    Gateway,
    SubnetMask,
    SupportSunapi,
    URL
) {
    return {
        id,
        DeviceName,
        Model,
        IPAddress,
        MACAddress,
        Port,
        Gateway,
        SubnetMask,
        SupportSunapi,
        URL,
    };
}

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

const deviceArray = [
    createData(
        1,
        'PNM-C32083RVQ',
        0,
        '192.168.212.34',
        '',
        80,
        '192.168.212.1',
        '255.255.255.0',
        true,
        'http://192.168.212.34/index.html'
    ),
];

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
    const [collapsed, setCollapsed] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [broken, setBroken] = React.useState(false);
    const [rtl, setRtl] = React.useState(false);
    const [hasImage, setHasImage] = React.useState(false);
    const [theme, setTheme] = React.useState<Theme>('light');
    const [devices, setDevice] = useState([]);

    React.useEffect(() => {
        if (typeof chrome !== 'undefined') {
            if (chrome.runtime && chrome.runtime.onMessageExternal) {
                try {
                    // discoveryApp = chrome.runtime.connect(discoveryAppIds);
                    // isSupportDiscoveryApp = true;
                    chrome.runtime.connect(discoveryAppIds);
                    if (chrome.runtime.onMessageExternal) {
                        chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
                            console.log("sender" + JSON.stringify(sender));
                            console.log("message" + JSON.stringify(message));
                            console.log("message" + devices.length);
                            let device = createData(
                                devices.length + 1,
                                message.chDeviceNameNew !== '' ? message.chDeviceNameNew : message.chDeviceName,
                                message.modelType,
                                message.chIP,
                                message.chMac,
                                message.nPort,
                                message.chGateway,
                                message.chSubnetMask,
                                message.isSupportSunapi == 1 ? true : false,
                                message.DDNSURL
                            );
                            setDevice((prevDevices) => [...prevDevices, device]);
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
                                chrome.runtime.sendMessage(discoveryAppIds, { discovery: true });
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
        <div style={{ display: 'flex', height: '100%', direction: rtl ? 'rtl' : 'ltr' }}>
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
                                <MenuItem component={<Link to="/" className="link" />}> Single Player</MenuItem>
                                <MenuItem component={<Link to="multiplayer" className="link" />}> Multi Player</MenuItem>
                                <MenuItem> Bar charts</MenuItem>
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
                <div style={{ padding: '16px 24px', color: '#44596e' }}>
                    <div style={{ marginBottom: '16px' }}>
                        {broken && (
                            <button className="sb-button" onClick={() => setToggled(!toggled)}>
                                Toggle
                            </button>
                        )}
                    </div>
                    <div style={{ marginBottom: '48px' }}>
                        <Typography variant="h4" fontWeight={600}>
                            React Pro Sidebar
                        </Typography>
                        <Typography variant="body2">
                            React Pro Sidebar provides a set of components for creating high level and
                            customizable side navigation
                        </Typography>
                        <PackageBadges />
                    </div>
                    <Routes>
                        <Route path="/" element={<SinglePage />} />
                        <Route path="multiplayer" element={<Main />} />
                    </Routes>
                    <DeviceTable devices={devices} />
                    <div style={{ padding: '0 8px' }}>
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
                </div>
            </main>
        </div>
    );
};