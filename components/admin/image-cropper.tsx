'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Image as ImageIcon, Sliders, Check, Loader2, RefreshCw } from 'lucide-react';

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
  label = 'Imagem do Comunicado'
}: ImageCropperProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadSuccess(false);

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

    // Set output canvas size (fixed 800x450 for 16:9 ratio)
    const targetWidth = 800;
    const targetHeight = targetWidth / aspectRatio;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.clearRect(0, 0, targetWidth, targetHeight);

    // Calculate dimensions to fit/cover
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Scale to cover the canvas
    const scaleX = targetWidth / imgWidth;
    const scaleY = targetHeight / imgHeight;
    const baseScale = Math.max(scaleX, scaleY);
    
    const finalScale = baseScale * zoom;

    const drawWidth = imgWidth * finalScale;
    const drawHeight = imgHeight * finalScale;

    // Center image + apply offsets
    const dx = (targetWidth - drawWidth) / 2 + xOffset * 3;
    const dy = (targetHeight - drawHeight) / 2 + yOffset * 3;

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
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

        setUploadSuccess(true);
        onUploadSuccess(publicUrl);
      } catch (err: unknown) {
        console.error('Erro no upload da imagem:', err);
        const errMsg = err instanceof Error ? err.message : String(err);
        alert(`Falha no upload: ${errMsg}`);
      } finally {
        setIsUploading(false);
      }
    }, 'image/jpeg', 0.85); // Compress as JPEG at 85% quality
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          {label}
        </span>
        {uploadSuccess && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <Check className="h-4 w-4" />
            Salvo
          </span>
        )}
      </div>

      {!imageSrc ? (
        // Dropzone / File Picker
        <label className="border-2 border-dashed border-slate-350 hover:border-[#00185f] rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-white group shadow-sm">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-[#00185f] rounded-full transition-colors">
            <ImageIcon className="h-6 w-6" />
          </div>
          <span className="text-sm font-semibold text-slate-600 group-hover:text-[#00185f] transition-colors">
            Selecionar Imagem do Computador
          </span>
          <span className="text-xs text-slate-400">Suporta JPG, PNG e WEBP</span>
        </label>
      ) : (
        // Cropper Controls and Canvas Preview
        <div className="space-y-4">
          {/* Preview Container */}
          <div className="relative border border-slate-200 bg-black rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto aspect-video object-contain"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
                <span className="text-sm font-bold">Enviando imagem...</span>
              </div>
            )}
          </div>

          {/* Adjustments Panel */}
          <div className="bg-white border border-slate-150 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00185f] uppercase tracking-wider border-b border-slate-100 pb-2">
              <Sliders className="h-4 w-4 text-slate-500" />
              <span>Ajustes de Enquadramento</span>
            </div>

            {/* Zoom Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[#00185f]"
              />
            </div>

            {/* Position X Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Posição Horizontal (X)</span>
                <span>{xOffset}px</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={xOffset}
                onChange={(e) => setXOffset(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[#00185f]"
              />
            </div>

            {/* Position Y Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Posição Vertical (Y)</span>
                <span>{yOffset}px</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={yOffset}
                onChange={(e) => setYOffset(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[#00185f]"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 justify-end">
            <label className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-650 cursor-pointer transition-colors flex items-center gap-1.5 outline-none select-none">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Trocar Imagem</span>
            </label>

            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-[#00185f] hover:bg-[#001144] disabled:opacity-50 text-white text-xs font-bold px-5 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 outline-none"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Confirmar & Recortar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
