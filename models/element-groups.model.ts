export type ItemGroup = {
    name: string;
    path: string;
    icon: {
        viewBox: string;
        path: {
            d: string;
            fill_rule?: string;
        };
    };
    items: {
        name: string;
        path: string;
    }[];
};

export const ITEM_GROUPS = {
    ELEMENTS: {
        name: 'Elements',
        path: '/elements',
        icon: {
            viewBox: '0 0 448 512',
            path: {
                d: 'M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z',
            },
        },
        items: [
            {
                name: 'Text Box',
                path: '/text-box',
            },
            {
                name: 'Check Box',
                path: '/checkbox',
            },
            {
                name: 'Radio Button',
                path: '/radio-button',
            },
            {
                name: 'Web Tables',
                path: '/webtables',
            },
            {
                name: 'Buttons',
                path: '/buttons',
            },
            {
                name: 'Links',
                path: '/links',
            },
            {
                name: 'Broken Links - Images',
                path: '/broken',
            },
            {
                name: 'Upload and Download',
                path: '/upload-download',
            },
            {
                name: 'Dynamic Properties',
                path: '/dynamic-properties',
            },
        ],
    } as ItemGroup,
    FORMS: {
        name: 'Forms',
        path: '/forms',
        icon: {
            viewBox: '0 0 24 24',
            path: {
                d: 'M17 21h-10c-1.654 0-3-1.346-3-3v-12c0-1.654 1.346-3 3-3h10c1.654 0 3 1.346 3 3v12c0 1.654-1.346 3-3 3zm-10-16c-.551 0-1 .449-1 1v12c0 .551.449 1 1 1h10c.551 0 1-.449 1-1v-12c0-.551-.449-1-1-1h-10zM16 11h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5zM16 8h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5zM16 14h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5zM16 17h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z',
            },
        },
        items: [
            {
                name: 'Practice Form',
                path: '/automation-practice-form',
            },
        ],
    } as ItemGroup,
    ALERTS_FRAMES_WINDOWS: {
        name: 'Alerts, Frame & Windows',
        path: '/alertsWindows',
        icon: {
            viewBox: '0 0 14 16',
            path: {
                d: 'M5 3h1v1H5V3zM3 3h1v1H3V3zM1 3h1v1H1V3zm12 10H1V5h12v8zm0-9H7V3h6v1zm1-1c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3z',
                fill_rule: 'evenodd',
            },
        },
        items: [
            {
                name: 'Browser Windows',
                path: '/browser-windows',
            },
            {
                name: 'Alerts',
                path: '/alerts',
            },
            {
                name: 'Frames',
                path: '/frames',
            },
            {
                name: 'Nested Frames',
                path: '/nestedframes',
            },
            {
                name: 'Modal Dialogs',
                path: '/modal-dialogs',
            },
        ],
    } as ItemGroup,
    WIDGETS: {
        name: 'Widgets',
        path: '/widgets',
        icon: {
            viewBox: '0 0 24 24',
            path: {
                d: 'M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z',
            },
        },
        items: [
            {
                name: 'Accordian',
                path: '/accordian',
            },
            {
                name: 'Auto Complete',
                path: '/auto-complete',
            },
            {
                name: 'Date Picker',
                path: '/date-picker',
            },
            {
                name: 'Slider',
                path: '/slider',
            },
            {
                name: 'Progress Bar',
                path: '/progress-bar',
            },
            {
                name: 'Tabs',
                path: '/tabs',
            },
            {
                name: 'Tool Tips',
                path: '/tool-tips',
            },
            {
                name: 'Menu',
                path: '/menu',
            },
            {
                name: 'Select Menu',
                path: '/select-menu',
            },
        ],
    } as ItemGroup,
    INTERACTIONS: {
        name: 'Interactions',
        path: '/interactions',
        icon: {
            viewBox: '0 0 1024 1024',
            path: {
                d: 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM726 585.7c0 55.3-44.7 100.1-99.7 100.1H420.6v53.4c0 5.7-6.5 8.8-10.9 5.3l-109.1-85.7c-3.5-2.7-3.5-8 0-10.7l109.1-85.7c4.4-3.5 10.9-.3 10.9 5.3v53.4h205.7c19.6 0 35.5-16 35.5-35.6v-78.9c0-3.7 3-6.8 6.8-6.8h50.7c3.7 0 6.8 3 6.8 6.8v79.1zm-2.6-209.9l-109.1 85.7c-4.4 3.5-10.9.3-10.9-5.3v-53.4H397.7c-19.6 0-35.5 16-35.5 35.6v78.9c0 3.7-3 6.8-6.8 6.8h-50.7c-3.7 0-6.8-3-6.8-6.8v-78.9c0-55.3 44.7-100.1 99.7-100.1h205.7v-53.4c0-5.7 6.5-8.8 10.9-5.3l109.1 85.7c3.6 2.5 3.6 7.8.1 10.5z',
            },
        },
        items: [
            {
                name: 'Sortable',
                path: '/sortable',
            },
            {
                name: 'Selectable',
                path: '/selectable',
            },
            {
                name: 'Resizable',
                path: '/resizable',
            },
            {
                name: 'Droppable',
                path: '/droppable',
            },
            {
                name: 'Dragabble',
                path: '/dragabble',
            },
        ],
    } as ItemGroup,
};
