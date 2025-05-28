import React, { CSSProperties, useEffect, useRef } from 'react';
import { useBarcodeScanner } from '@react-barcode-scanner/hooks';

import './BarcodeScanner.css';

export type BarcodeScannerProps = {
    autoStart?: boolean;
    canvasHeight?: number;
    canvasWidth?: number;
    devices?: MediaDeviceInfo[];
    onDevices?: (devices: MediaDeviceInfo[]) => void;
    onScan: (code: string) => void;
    preferDeviceLabelMatch?: RegExp;
    settings?: Record<string, string | RegExp>;
    videoHeight?: number;
    videoWidth?: number;
    videoCropHeight?: number;
    videoCropWidth?: number;
    zoom?: number;
    blur?: number;
};

export const BarcodeScanner = (props: BarcodeScannerProps) => {
    const {
        autoStart = true,
        canvasHeight = 240,
        canvasWidth = 320,
        onDevices,
        onScan,
        settings = {},
        videoHeight = 480,
        videoWidth = 640,
        videoCropHeight = 300,
        videoCropWidth = 640,
        zoom = 1,
        blur = 0,
    } = props;

    const { scanLine, videoBorder } = settings;

    const webcamScannerPreviewStyle = {
        '--scanline': scanLine,
        '--video-border': videoBorder,
        '--video-width': `${videoWidth}px`,
        '--video-height': `${videoHeight}px`,
        '--canvas-element-width': `${canvasWidth}px`,
        '--canvas-element-height': `${canvasHeight}px`,
        '--video-crop-width': `${videoCropWidth}px`,
        '--video-crop-height': `${videoCropHeight}px`,
        '--zoom': zoom,
        '--video-blur': `${blur}px`,
    } as CSSProperties;

    const containerRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        Object.entries(webcamScannerPreviewStyle).forEach(([key, value]) => {
            containerRef.current?.style.setProperty(key, value);
        });
    }, [containerRef.current]);

    const { canvasRef, hasPermission, webcamVideoRef } = useBarcodeScanner({
        onDevices,
        onScan,
        shouldPlay: false,
        zoom,
    });


    return hasPermission ? (
        <div ref={containerRef} className="react-barcode-scanner-container">
            <video
                ref={webcamVideoRef}
                width={videoWidth}
                height={videoHeight}
                autoPlay={autoStart}
                playsInline={true}
            />
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            {scanLine && <div className={'scanline'}>-</div>}
        </div>
    ) : null;
};
