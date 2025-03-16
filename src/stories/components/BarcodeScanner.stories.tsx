import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useState } from 'react';
import { BarcodeScanner } from '../../components';
import { BarcodeScannerProps } from '../../components';

type ExtendedProps = BarcodeScannerProps & { scanLine?: boolean };

const BarcodeScannerStories = (props: ExtendedProps) => {
    const {
        scanLine = false,
        canvasHeight = 240,
        canvasWidth = 320,
        videoHeight = 480,
        videoWidth = 640,
        videoCropHeight,
        videoCropWidth,
        zoom = 1,
        blur = 0,
    } = props;

    const [codes, setCodes] = useState<string[]>([]);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

    const onScan = (code: string) => {
        setCodes(codes.concat(code));
    };
    // @ts-ignore IDE doesn't recognize the MediaDeviceInfo built-in type
    const onDevices = (devices: MediaDeviceInfo[]) => {
        setDevices(devices);
    };

    return (
        <BarcodeScanner
            devices={devices}
            onDevices={onDevices}
            onScan={onScan}
            settings={{
                scanLine,
            }}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            videoWidth={videoWidth}
            videoHeight={videoHeight}
            videoCropHeight={videoCropHeight}
            videoCropWidth={videoCropWidth}
            zoom={zoom}
            blur={blur}
        />
    );
};

const meta: Meta<typeof BarcodeScannerStories> = {
    component: BarcodeScannerStories,
    title: 'Components/BarcodeScanner',
};

export default meta;
type Story = StoryObj<typeof BarcodeScannerStories>;

export const Primary: Story = {
    args: {
        scanLine: false,
        zoom: 2,
        blur: 3,
        canvasHeight: 240,
        canvasWidth: 320,
        videoHeight: 480,
        videoWidth: 640,
        videoCropHeight: 300,
        videoCropWidth: 640,
    },
};
