import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef } from 'react';
import {
    BarcodeDetectorOptions,
    DeviceChoiceOptions,
    useBarcodeScanner
} from '@react-barcode-scanner/hooks';

import './BarcodeScanner.css';

export type BarcodeScannerProps = {
    animate?: boolean;
    autoStart?: boolean;
    blur?: number;
    canvasHeight?: number;
    canvasWidth?: number;
    className?: string;
    barcodeDetectorOptions?: BarcodeDetectorOptions;
    deviceChoiceOptions?: DeviceChoiceOptions;
    devices?: MediaDeviceInfo[];
    onDevices?: (devices: MediaDeviceInfo[]) => void;
    onScan: (code: string) => void;
    preferDeviceLabelMatch?: RegExp;
    settings?: Record<string, string | RegExp>;
    videoCropHeight?: number;
    videoCropWidth?: number;
    videoHeight?: number;
    videoWidth?: number;
    waitElement?: ReactNode,
    zoom?: number;
};

export const BarcodeScanner = (props: BarcodeScannerProps) => {
    const {
        animate = false,
        autoStart = true,
        blur = 0,
        canvasHeight = 480,
        canvasWidth = 640,
        className = '',
        barcodeDetectorOptions,
        deviceChoiceOptions,
        onDevices,
        onScan,
        settings = {},
        videoCropHeight = 300,
        videoCropWidth = 640,
        videoHeight = 480,
        videoWidth = 640,
        waitElement = null,
        zoom = 1,
    } = props;

    const { scanLine, videoBorder } = settings;

    const containerRef = useRef<HTMLDivElement>(null);

    const webcamScannerPreviewStyle = useMemo(() => ({
        '--scanline': scanLine,
        '--video-border': videoBorder,
        '--video-width': `${videoWidth}px`,
        '--video-height': `${videoHeight}px`,
        '--canvas-width': `${canvasWidth}px`,
        '--canvas-height': `${canvasHeight}px`,
        '--video-crop-width': `${videoCropWidth}px`,
        '--video-crop-height': `${videoCropHeight}px`,
        '--video-blur': `${blur}px`,
    } as CSSProperties),
    [
        containerRef.current,
        scanLine,
        videoBorder,
        videoWidth,
        videoHeight,
        canvasWidth,
        canvasHeight,
        videoCropWidth,
        videoCropHeight,
        blur,
    ]);

    const { canvasRef, hasPermission, webcamVideoRef } = useBarcodeScanner({
        onDevices,
        onScan,
        barcodeDetectorOptions,
        deviceChoiceOptions,
        shouldPlay: false,
        zoom,
    });

    useEffect(() => {
        if (!hasPermission || !containerRef.current) {
            return;
        }
        Object.entries(webcamScannerPreviewStyle).forEach(([key, value]) => {
            containerRef.current?.style.setProperty(key, value);
        });
        if (animate) {
            containerRef.current?.style.setProperty('animation-play-state', 'running');
        }
    }, [hasPermission, webcamScannerPreviewStyle, containerRef.current]);

    return <div ref={containerRef} className={`
            react-barcode-scanner-container
            ${animate ? 'animate' : ''}
            ${className}
        `}>
        {hasPermission ? (
            <>
                <video
                    ref={webcamVideoRef}
                    width={videoWidth}
                    height={videoHeight}
                    autoPlay={autoStart}
                    playsInline={true}
                />
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
                {scanLine && <div className={'scanline'}>-</div>}
            </>
        ) : waitElement}
    </div>;
};
