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
        '--raw-video-width': `${videoWidth}px`,
        '--raw-video-height': `${videoHeight}px`,
        '--canvas-element-width': `${canvasWidth}px`,
        '--canvas-element-height': `${canvasHeight}px`,
        '--video-crop-width': `${videoCropWidth}px`,
        '--video-crop-height': `${videoCropHeight}px`,
        '--raw-zoom': zoom,
        '--video-blur': `${blur}px`,
    } as CSSProperties;

    const boxRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (!boxRef.current) {
            return;
        }
        Object.entries(webcamScannerPreviewStyle).forEach(([key, value]) => {
            boxRef.current?.style.setProperty(key, value);
        });
    }, [boxRef.current]);

    const { canvasRef, hasPermission, webcamVideoRef } = useBarcodeScanner({
        onDevices,
        onScan,
        shouldPlay: false,
        zoom,
    });


    return hasPermission ? (
        <>
            <div ref={boxRef} className="webcam-scanner-preview-box">
                <div className="webcam-scanner-preview">
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
            </div>
        </>
    ) : null;
};
