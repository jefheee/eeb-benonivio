'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Check, Loader2, RefreshCw, X, Upload } from 'lucide-react';

interface ImageCropperProps {
  onUploadSuccess: (url: string) => void;
  aspectRatio?: number; // width / height, e.g. 16/9
  bucketName?: string;
  folderName?: string;
  label?: string;
}

export default function ImageCropper({
  onUploadSuccess,
  aspectRatio = 16 / 9,
  bucketName = 'escola_midias',
  folderName = 'banners',
  label = 'Adicionar Imagem'
}: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setZoom(1);
        setXOffset(0);
        setYOffset(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw image on canvas in real-time when inputs change
  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, zoom, xOffset, yOffset]);

  const draw = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set output canvas size (fixed 800 width, height proportional to aspect ratio)
    const targetWidth = 800;
    const targetHeight = targetWidth / aspectRatio;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.clearRect(0, 0, targetWidth, targetHeight);

    const imgWidth = img.width;
    const imgHeight = img.height;

    // Scale to cover the canvas
    const scaleX = targetWidth / imgWidth;
    const scaleY = targetHeight / imgHeight;
    const baseScale = Math.max(scaleX, scaleY);
    
    const finalScale = baseScale * zoom;

    const drawWidth = imgWidth * finalScale;
    const drawHeight = imgHeight * finalScale;

    // Center image + apply offsets (multiplied by zoom factor for finer control)
    const dx = (targetWidth - drawWidth) / 2 + xOffset * 3;
    const dy = (targetHeight - drawHeight) / 2 + yOffset * 3;

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
  };

  const handleClose = () => {
    setImageSrc(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Convert canvas to blob and upload to Supabase Storage
  const handleUpload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedFile) return;

    setIsUploading(true);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setIsUploading(false);
        alert('Erro ao processar imagem.');
        return;
      }

      try {
        const supabase = createClient();
        
        // Generate unique path
        const fileExt = selectedFile.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = folderName ? `${folderName}/${fileName}` : fileName;

        // Upload to storage
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, blob, {
            contentType: `image/${fileExt}`,
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          throw new Error(error.message);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);

        onUploadSuccess(publicUrl);
        handleClose();
      } catch (err: unknown) {
        console.error('Erro no upload da imagem:', err);
        const errMsg = err instanceof Error ? err.message : String(err);
        alert(`Falha no upload: ${errMsg}`);
      } finally {
        setIsUploading(false);
      }
    }, 'image/jpeg', 0.85); // Compress as JPEG at 85% quality
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      {/* Hidden native input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Primary Trigger Button */}
      <button
        type="button"
        onClick={triggerFileInput}
        className="flex items-center justify-center gap-2 border border-[#00185f] hover:bg-[#00185f]/5 text-[#00185f] text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-sm outline-none w-full sm:w-auto"
      >
        <Upload className="h-4 w-4 text-[#00185f]" />
        <span>{label}</span>
      </button>

      {/* Immediate Crop Modal */}
      {imageSrc && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 max-w-md w-full space-y-4 animate-scaleIn text-left">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="font-display font-extrabold text-[#00185f] text-sm">
                  Recortar e Ajustar Imagem
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Defina o enquadramento usando os controles abaixo.</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={isUploading}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-655 transition-colors disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Canvas Container */}
            <div className="relative border border-slate-200 bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto max-h-[220px] object-contain"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-white gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                  <span className="text-xs font-bold">Enviando imagem ao servidor...</span>
                </div>
              )}
            </div>

            {/* Position Sliders */}
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3">
              {/* Zoom */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-550">
                  <span>Aproximação (Zoom)</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.02"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  disabled={isUploading}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00185f] disabled:opacity-50"
                />
              </div>

              {/* Horizontal Offset */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-550">
                  <span>Ajuste Horizontal (X)</span>
                  <span>{xOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="1"
                  value={xOffset}
                  onChange={(e) => setXOffset(parseInt(e.target.value))}
                  disabled={isUploading}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00185f] disabled:opacity-50"
                />
              </div>

              {/* Vertical Offset */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-550">
                  <span>Ajuste Vertical (Y)</span>
                  <span>{yOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="1"
                  value={yOffset}
                  onChange={(e) => setYOffset(parseInt(e.target.value))}
                  disabled={isUploading}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00185f] disabled:opacity-50"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 justify-end pt-2 border-t border-slate-100">
              <label className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 cursor-pointer transition-colors flex items-center gap-1.5 outline-none select-none disabled:opacity-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                />
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Trocar</span>
              </label>

              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-[#00185f] hover:bg-[#001144] disabled:opacity-50 text-white text-xs font-bold px-5 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 outline-none"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Recortar & Upload</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
