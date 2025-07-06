import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { BarcodeDetectorOptions, useBarcodeScanner } from '@react-barcode-scanner/hooks';

import './BarcodeScanner.css';

export type BarcodeScannerProps = {
    animate?: boolean;
    autoStart?: boolean;
    blur?: number;
    canvasHeight?: number;
    canvasWidth?: number;
    className?: string;
    barcodeDetectorOptions?: BarcodeDetectorOptions;
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
        canvasHeight = 240,
        canvasWidth = 320,
        className = '',
        barcodeDetectorOptions,
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

    const containerRef = useRef<HTMLDivElement>(null);

    const { canvasRef, hasPermission, webcamVideoRef } = useBarcodeScanner({
        onDevices,
        onScan,
        barcodeDetectorOptions,
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
    }, [hasPermission, containerRef.current]);

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
