import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useState } from 'react';
import { BarcodeScanner } from '../../components';
import { BarcodeScannerProps } from '../../components';

type ExtendedProps = BarcodeScannerProps & { scanLine?: string };

const BarcodeScannerStories = (props: ExtendedProps) => {
    const {
        animate = true,
        className,
        scanLine = 'none',
        canvasHeight = 480,
        canvasWidth = 640,
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
            animate={animate}
            className={className}
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
        animate: true,
        className: '',
        scanLine: 'solid 3px red',
        zoom: 2,
        blur: 0,
        canvasHeight: 240,
        canvasWidth: 320,
        videoHeight: 240,
        videoWidth: 320,
        videoCropHeight: 240,
        videoCropWidth: 320,
    },
};
